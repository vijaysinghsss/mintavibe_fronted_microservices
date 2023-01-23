function initApproveExecBidProcess() {
  var contractType = $("#contractType").text();
  var contractAddress = $("#contractAddress").text();
  approveNFT(
    contractType,
    contractAddress,
    gon.collection_data["contract_shared"],
    "executeBid"
  );
}

function approveBidSuccess() {
  hideAll();
  $(".approveExecbidDone").removeClass("hide");
  $(".acceptBidProgress").removeClass("hide");
  initAcceptBidProcess();
}

function initAcceptBidProcess() {
  var contractAddress = $("#erc20ContractAddress").text();
  var paymentDetails = fetchCollectionDetails(
    $("#bidId").val(),
    contractAddress
  );
  console.log(
    paymentDetails["buyer_address"],
    toNum(paymentDetails["asset_type"]),
    paymentDetails["asset_address"],
    paymentDetails["token_id"],
    toNum(paymentDetails["amount"]),
    toNum(paymentDetails["quantity"]),
    paymentDetails["pay_token_address"],
    toNum(paymentDetails["pay_token_decimal"]),
    paymentDetails["buyer_sign"],
    paymentDetails["collection_id"]
  );
  var lazyMint = $("#is_collection_lazy_minted").val();
  if (lazyMint == "true") {
    $(".MintAndacceptBidProgress").removeClass("hide");
    MintAndAcceptBid(
      paymentDetails["buyer_address"],
      toNum(paymentDetails["asset_type"]),
      paymentDetails["asset_address"],
      paymentDetails["token_id"],
      toNum(paymentDetails["amount_with_fee"]),
      toNum(paymentDetails["quantity"]),
      paymentDetails["pay_token_address"],
      toNum(paymentDetails["pay_token_decimal"]),
      paymentDetails["buyer_sign"],
      paymentDetails["collection_id"],
      paymentDetails["bid_id"],
      paymentDetails["token_uri"],
      paymentDetails["royalty"],
      paymentDetails["shared"],
      paymentDetails["total"]
    );
  } else {
    executeBid(
      paymentDetails["buyer_address"],
      toNum(paymentDetails["asset_type"]),
      paymentDetails["asset_address"],
      paymentDetails["token_id"],
      toNum(paymentDetails["amount_with_fee"]),
      toNum(paymentDetails["quantity"]),
      paymentDetails["pay_token_address"],
      toNum(paymentDetails["pay_token_decimal"]),
      paymentDetails["buyer_sign"],
      paymentDetails["collection_id"],
      paymentDetails["bid_id"]
    );
  }
}

async function MintAndAcceptBid(
  buyer,
  buyingAssetType,
  buyingAssetAddress,
  tokenId,
  paymentAmt,
  buyingAssetQty,
  paymentAssetAddress,
  decimals,
  buyerSign,
  collectionId,
  bidId,
  tokenURI,
  royaltyFee,
  sharedCollection,
  supply
) {
  try {
    console.log("Enter MintAndAcceptBid");
    console.log(tokenURI, royaltyFee, sharedCollection);
    if (paymentAssetAddress === undefined || paymentAssetAddress === null) {
      paymentAssetAddress = wethAddress;
      decimals = 18;
    }
    paymentAmt = roundNumber(mulBy(paymentAmt, 10 ** decimals), 0);
    var unitPrice = 1;
    var buyingAssetType = buyingAssetType + 2; // BuyAssetType -> 3: Lazy721 , 2: Lazy1155, 1:721, 0: 1155
    const contract = await fetchContract(tradeContractAddress, "trade");
    var nonce_value = await getContractSignNonce(collectionId, buyerSign);
    var account = getCurrentAccount();
    //token ID calculating
    window.contract721 = await getContract(
      buyingAssetAddress,
      "nft721",
      sharedCollection
    );
    var orderStruct = [
      account,
      buyer,
      paymentAssetAddress,
      buyingAssetAddress,
      buyingAssetType,
      unitPrice,
      paymentAmt,
      tokenId,
      supply,
      tokenURI,
      royaltyFee,
      buyingAssetQty,
      gon.depricated_status,
      true,
    ];
    var gasPrices = await gasPrice();
    // ownerSign -> selleraddress & URI
    var ownerSign = await sign_metadata_with_creator(
      account,
      tokenURI,
      collectionId
    );
    await saveContractNonceValue(collectionId, ownerSign);
    console.log(ownerSign);
    var receipt = await contract.mintAndExecuteBid(
      orderStruct,
      splitSign(ownerSign["signature"], ownerSign["nonce"]),
      splitSign(buyerSign, nonce_value),
      sharedCollection,
      { from: account, gasLimit: 616883, gasPrice: String(gasPrices) }
    );
    var tx = await receipt.wait();
    var tokenId = parseInt(tx.logs[0].topics[3]);
    await updateCollectionSell(
      collectionId,
      buyer,
      bidId,
      receipt.transactionHash,
      tokenId
    );
    return window.acceptBidSuccess(collectionId);
  } catch (err) {
    console.error(err);
    return window.acceptBidFailed(err["message"]);
  }
};

// def sign_metadata_with_creator
//     sign = if params[:address].present?
//         account = User.where(address: params[:address]).first
//         if params[:tokenURI] == "abcde"
//           find_collection = account.collections.where(address: params[:collectionId]).exists?
//         else
//           find_collection = account.collections.where(metadata_hash: params[:tokenURI]).exists?
//         end
        
//         if(find_collection)
//           obj = Utils::Web3.new
//           nonce = DateTime.now.strftime('%Q').to_i
//           obj.sign_metadata_hash(Settings.tradeContractAddress, account.address, params[:tokenURI], nonce)
//         else 
//           ""
//         end
//     else
//       ""
//     end
//     render json: sign.present? ? sign.merge("nonce" => nonce) : {}
//   end

function acceptBidSuccess(collectionId) {
  hideAll();
  $(".allDone").removeClass("hide");
  toastr.success("Bid accept succces.");
  window.location.href = "/collections/" + collectionId;
}

function acceptBidFailed(errorMsg) {
  toastr.error(errorMsg);
  hideAll();
  $(".approveExecbidDone").removeClass("hide");
  $(".acceptBidRetry").removeClass("hide");
}

async function executeBid(
  buyer,
  buyingAssetType,
  buyingAssetAddress,
  tokenId,
  paymentAmt,
  buyingAssetQty,
  paymentAssetAddress,
  decimals,
  buyerSign,
  collectionId,
  bidId
) {
  try {
    var unitPrice = 1;
    if (paymentAssetAddress === undefined || paymentAssetAddress === null) {
      paymentAssetAddress = wethAddress;
      decimals = 18;
    }
    paymentAmt = roundNumber(mulBy(paymentAmt, 10 ** decimals), 0);
    const contract = await fetchContract(tradeContractAddress, "trade");
    var nonce_value = await getContractSignNonce(collectionId, buyerSign);
    var account = getCurrentAccount();
    var gasPrices = await gasPrice();
    // supply, tokenURI, royalty needs to be passed but WILL NOT be used by the Contract
    var supply = 0;
    var tokenURI = "abcde";
    var royaltyFee = 0;
    var orderStruct = [
      account,
      buyer,
      paymentAssetAddress,
      buyingAssetAddress,
      buyingAssetType,
      unitPrice,
      paymentAmt,
      tokenId,
      supply,
      tokenURI,
      royaltyFee,
      buyingAssetQty,
      gon.depricated_status,
      true,
    ];
    console.log(orderStruct, nonce_value);
    var receipt = await contract.executeBid(
      orderStruct,
      gon.collection_data["imported"],
      splitSign(buyerSign, nonce_value),
      { from: account, gasLimit: 516883, gasPrice: String(gasPrices) }
    );
    receipt = await receipt.wait();
    await updateCollectionSell(
      collectionId,
      buyer,
      bidId,
      receipt.transactionHash
    );
    return window.acceptBidSuccess(collectionId);
  } catch (err) {
    console.error(err);
    return window.acceptBidFailed(err["message"]);
  }
};