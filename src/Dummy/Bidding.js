const initBidProcess = async function isApprovedNFT(
  contractAddress,
  contractDecimal
) {
  var curErc20Balance = $("#erc20_balance").text();
  var ethBalance = await window.ethBalance();
  var totalAmt = $("#bid-total-amt-dp").attr("bidAmt");
  var symbol = $("#bid_currency :selected").text();
  if (isGreaterThanOrEqualTo(curErc20Balance, totalAmt)) {
    $(".convertEth").addClass("hide");
    initApproveBidProcess(contractAddress);
  } else if (
    symbol === "WETH" &&
    isGreaterThanOrEqualTo(ethBalance, totalAmt)
  ) {
    convertEthToWeth(totalAmt);
  } else {
    $("#biddingForm :input").prop("disabled", false);
    $.magnificPopup.close();
    return toastr.error("Not enough balance");
  }
};

function initApproveBidProcess(contractAddress, decimals = 18) {
  hideAll();
  $(".convertDone").removeClass("hide");
  $(".approvebidProgress").removeClass("hide");
  $(".signbidStart").removeClass("hide");
  $.magnificPopup.close();
  $.magnificPopup.open({
    closeOnBgClick: false,
    enableEscapeKey: false,
    items: {
      src: "#placeBid",
    },
    type: "inline",
    callbacks: {
      close: function () {
        $("#biddingForm :input").prop("disabled", false);
      },
    },
  });
  approveERC20(
    contractAddress,
    "erc20",
    $("#bid-total-amt-dp").attr("bidAmt"),
    decimals
  );
}

async function approveERC20(
  contractAddress,
  contractType,
  amount,
  decimals = 18,
  sendBackTo = "Bid"
) {
  try {
    console.log(
      "Enter approveERC20:" + contractAddress,
      contractType,
      gon.collection_data["contract_shared"]
    );
    amount = roundNumber(mulBy(amount, 10 ** decimals), 0);
    // await checkDepricatedStatus();
    const approveERC2 = await fetchContract(
      contractAddress,
      contractType,
      gon.collection_data["contract_shared"]
    );
    //var contract = await new window.web3.eth.Contract(abi, contractAddress);
    var approveAddress = gon.depricated_status
      ? deprecatedTransferProxyContractAddress
      : transferProxyContractAddress;
    var account = getCurrentAccount();
    const balance = await approveERC2.allowance(account, approveAddress);
    amount = BigInt(parseInt(balance) + parseInt(amount)).toString();
    var receipt = await approveERC2.approve(approveAddress, amount, {
      from: account,
    });
    receipt = await receipt.wait();
    if (sendBackTo == "Buy") {
      return window.buyApproveSuccess(receipt.transactionHash, contractAddress);
    } else {
      return window.bidApproveSuccess(receipt.transactionHash, contractAddress);
    }
  } catch (err) {
    console.error(err);
    if (sendBackTo == "Buy") {
      return buyApproveFailed(err["message"]);
    } else {
      return bidApproveFailed(err["message"]);
    }
  }
}

function roundNumber(num, roundNum = 4) {
  BigNumber.set({ DECIMAL_PLACES: roundNum, ROUNDING_MODE: 1 });
  var decVal = new BigNumber(num);
  return decVal.toFixed(roundNum);
}

function mulBy(one, two) {
  return BigNumber(one).multipliedBy(two);
}

async function checkDepricatedStatus() {
  try {
    var contractAddress = gon.collection_data["contract_address"];
    var type = gon.collection_data["contract_type"];
    var sharedCollection = gon.collection_data["contract_shared"];
    var account = gon.collection_data["owner_address"];
    const contract = await fetchContract(
      contractAddress,
      type,
      sharedCollection
    );
    var status = await contract.isApprovedForAll(
      account,
      deprecatedTransferProxyContractAddress
    );
    var status2 = await contract.isApprovedForAll(
      account,
      transferProxyContractAddress
    );
    gon.depricated_status = status && !status2;
    console.log(gon.depricated_status);
  } catch (err) {
    console.error(err.message);
  }
}

async function fetchContract(contractAddress, type, shared = true) {
  console.log(contractAddress, type, shared);
  var compiledContractDetails = getContractABIAndBytecode(
    contractAddress,
    type,
    shared
  );
  var abi = compiledContractDetails["compiled_contract_details"]["abi"];
  if (window.wallet == "walletConnect") {
    var obj = new ethers.Contract(contractAddress, abi, window.provider);
    var connection = obj.connect(window.signer); // "connect" not able to find the method
  } else {
    var obj = new ethers.Contract(contractAddress, abi, provider);
    var connection = obj.connect(signer);
  }
  return connection;
}

function getContractABIAndBytecode(contractAddress, type, shared = true) {
  var res;
  var request = $.ajax({
    async: false,
    url: "/contract_abi",
    type: "GET",
    data: { contract_address: contractAddress, type: type, shared: shared },
    dataType: "json",
  });

  request.done(function (msg) {
    res = msg;
  });

  request.fail(function (jqXHR, textStatus) {
    console.log(textStatus);
  });
  return res;
}
// def contract_abi
//     shared = ActiveModel::Type::Boolean.new.cast(params[:shared])
//     abi = if params[:contract_address].present? && params[:type] == 'erc20'
//             Utils::Abi.weth
//           # elsif params[:contract_address].present? && (params[:type] == 'erc20')
//             # { abi: Api::Etherscan.new.contract_abi(params[:contract_address]), bytecode: '' }
//           elsif params[:contract_address].present? && (params[:type] == 'trade')
//             Utils::Abi.trade
//           elsif params[:contract_address].present? && (params[:type] == 'trade_proxy')
//             Utils::Abi.trade_proxy
//           elsif(shared)
//             if params[:type] == 'nft721'
//               Utils::Abi.shared_nft721
//             elsif params[:type] == 'nft1155'
//               Utils::Abi.shared_nft1155
//             end
//           elsif(!shared)
//             if params[:type] == 'nft721'
//               Utils::Abi.nft721
//             elsif params[:type] == 'nft1155'
//               Utils::Abi.nft1155
//             end
//           else
//             {}
//           end
//     render json: {compiled_contract_details: abi}
//   end

function isGreaterThanOrEqualTo(one, two) {
  var numOne = BigNumber(one);
  return numOne.isGreaterThanOrEqualTo(BigNumber(two));
}

function getCurrentAccount() {
  if (window.wallet == "metamask" && window.ethereum.selectedAddress) {
    return window.ethereum.selectedAddress;
  }
  return window.currentAddress ?? sessionAddress;
}

function buyApproveSuccess(transactionHash, contractAddress) {
  console.log("buyApproveSuccess");
  console.log(contractAddress);
  $(".approvebuyProgress").addClass("hide");
  $(".approvebuyDone").removeClass("hide");
  initPurchaseProcess(contractAddress);
}

const initPurchaseProcess = function initPurchaseBuyProcess(
  contractAddress,
  isEthPayment = false
) {
  if (!isEthPayment) {
    hideAll();
    $(".convertDone").removeClass("hide");
    $(".approvebuyDone").removeClass("hide");
    $(".purchaseProgress").removeClass("hide");
    $(".purchaseAndMintProgress").removeClass("hide");
  }
  console.log("initPurchaseProcess");
  console.log(contractAddress);
  var paymentDetails = fetchCollectionDetails(null, contractAddress);
  if (isEthPayment) {
    paymentDetails["pay_token_address"] =
      "0x0000000000000000000000000000000000000000";
    paymentDetails["pay_token_decimal"] = 18;
  }
  console.log(
    paymentDetails["owner_address"],
    toNum(paymentDetails["asset_type"]),
    paymentDetails["asset_address"],
    paymentDetails["token_id"],
    toNum(paymentDetails["unit_price"]),
    toNum($("#buy_qty").val()),
    toNum($("#buy-total-amt-dp").attr("buyAmt")),
    paymentDetails["pay_token_address"],
    toNum(paymentDetails["pay_token_decimal"]),
    paymentDetails["seller_sign"],
    paymentDetails["collection_id"]
  );
  if ($("#is_collection_lazy_minted").val() == "true") {
    MintAndBuyAsset(
      paymentDetails["owner_address"],
      toNum(paymentDetails["asset_type"]),
      paymentDetails["asset_address"],
      paymentDetails["token_id"],
      toNum(paymentDetails["unit_price"]),
      toNum($("#buy_qty").val()),
      toNum($("#buy-total-amt-dp").attr("buyAmt")),
      paymentDetails["pay_token_address"],
      toNum(paymentDetails["pay_token_decimal"]),
      paymentDetails["seller_sign"],
      paymentDetails["collection_id"],
      paymentDetails["token_uri"],
      paymentDetails["royalty"],
      paymentDetails["shared"],
      paymentDetails["total"],
      isEthPayment
    );
  } else {
    buyAsset(
      paymentDetails["owner_address"],
      toNum(paymentDetails["asset_type"]),
      paymentDetails["asset_address"],
      paymentDetails["token_id"],
      toNum(paymentDetails["unit_price"]),
      toNum($("#buy_qty").val()),
      toNum($("#buy-total-amt-dp").attr("buyAmt")),
      paymentDetails["pay_token_address"],
      paymentDetails["pay_token_decimal"],
      paymentDetails["seller_sign"],
      paymentDetails["collection_id"],
      isEthPayment
    );
  }
};

function fetchCollectionDetails(bidId, erc20Address) {
  var resp = false;
  var erc20Address;
  $.ajax({
    url: "/collections/" + $("#collection_id").val() + "/fetch_details",
    type: "GET",
    async: false,
    data: { bid_id: bidId, erc20_address: erc20Address },
    success: function (respVal) {
      resp = respVal["data"];
    },
  });
  return resp;
}

//  def fetch_details
//     render json: {data: @collection.fetch_details(params[:bid_id], params[:erc20_address])}
//   end

// def fetch_details(bid_id, erc20_address)
//     unless is_eth_payment
//       pay_token = Erc20Token.where(address: erc20_address).first
//     end
//     bid_detail = bids.where(id: bid_id).first if bid_id.present?
//     details = { collection_id: self.address, owner_address: owner.address, token_id: token, unit_price: instant_sale_price,
//                 asset_type: nft_contract&.contract_asset_type, asset_address: nft_contract&.address, shared: shared?,
//                 seller_sign: sign_instant_sale_price, contract_type: contract_type, owned_tokens: owned_tokens, total: no_of_copies }
//     if is_lazy_minted?
//       details = details.merge(token_id: 0, type: collection_type, token_uri: metadata_hash, royalty: self.royalty_fee)
//     else 
//       details = details.merge(token_id: token)
//     end 
//     details = details.merge(pay_token_address: pay_token.address, pay_token_decimal: pay_token.decimals) if pay_token
//     details = details.merge(is_eth_payment: is_eth_payment)
//     details = details.merge(buyer_address: bid_detail.user.address, amount: bid_detail.amount, amount_with_fee: bid_detail.amount_with_fee,
//                             quantity: bid_detail.quantity, buyer_sign: bid_detail.sign, bid_id: bid_detail.id) if bid_detail
//     return details
//   end

function toNum(num) {
  return BigNumber(num).toNumber();


}

async function MintAndBuyAsset(
  assetOwner,
  buyingAssetType,
  buyingAssetAddress,
  tokenId,
  unitPrice,
  buyingAssetQty,
  paymentAmt,
  paymentAssetAddress,
  decimals,
  sellerSign,
  collectionId,
  tokenURI,
  royaltyFee,
  sharedCollection,
  supply,
  isEthPayment = false
) {
  try {
    console.log("Enter MintAndBuyAsset");
    isEthPayment = isEthPayment === true;
    var isErc20Payment = isEthPayment === false;
    if (isEthPayment) {
      paymentAssetAddress = "0x0000000000000000000000000000000000000000";
      paymentAmt = roundNumber(mulBy(paymentAmt, 10 ** 18), 0);
      unitPrice = roundNumber(mulBy(unitPrice, 10 ** 18), 0);
    } else {
      paymentAmt = roundNumber(mulBy(paymentAmt, 10 ** decimals), 0);
      unitPrice = roundNumber(mulBy(unitPrice, 10 ** decimals), 0);
    }
    var buyingAssetType = buyingAssetType + 2; // BuyAssetType -> 3: Lazy721 , 2: Lazy1155, 1:721, 0: 1155
    var contract = await fetchContract(tradeContractAddress, "trade");
    var nonce_value = await getContractSignNonce(collectionId, sellerSign);
    var account = getCurrentAccount();
    var orderStruct = [
      assetOwner,
      account,
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
      isErc20Payment,
    ];
    // ownerSign -> selleraddress & URI
    var gasPrices = await gasPrice();
    var ownerSign = await sign_metadata_with_creator(
      assetOwner,
      tokenURI,
      collectionId
    );
    console.log("ownerSign" + ownerSign);
    console.log("orderStruct" + orderStruct);
    if (!isEthPayment) {
      var receipt = await contract.mintAndBuyAsset(
        orderStruct,
        splitSign(ownerSign["signature"], ownerSign["nonce"]),
        splitSign(sellerSign, nonce_value),
        sharedCollection,
        { gasLimit: 616883, gasPrice: String(gasPrices) }
      );
    } else {
      var receipt = await contract.mintAndBuyAssetWithEth(
        orderStruct,
        splitSign(ownerSign["signature"], ownerSign["nonce"]),
        splitSign(sellerSign, nonce_value),
        sharedCollection,
        { gasLimit: 616883, gasPrice: String(gasPrices), value: paymentAmt }
      );
    }
    receipt = await receipt.wait();
    console.log("--------step -1-----");
    var responseToken;
    if (buyingAssetType == 3) {
      responseToken = receipt.logs[3].topics[3];
    } else {
      responseToken = receipt.events[0].data.slice(0, 66);
    }
    var tokenId = parseInt(responseToken);
    console.log("--------step -2-----tokenId " + tokenId);
    await updateCollectionBuy(
      collectionId,
      buyingAssetQty,
      receipt.transactionHash,
      tokenId
    );
    console.log("--------step -3-----");
    return window.buyPurchaseSuccess(collectionId);
  } catch (err) {
    console.log(err);
    if (!isEthPayment) {
      return window.buyPurchaseFailed(err["message"]);
    } else {
      return window.buyWithEthPurchaseFailed(err["message"]);
    }
  }
};

async function buyAsset(
  assetOwner,
  buyingAssetType,
  buyingAssetAddress,
  tokenId,
  unitPrice,
  buyingAssetQty,
  paymentAmt,
  paymentAssetAddress,
  decimals,
  sellerSign,
  collectionId,
  isEthPayment = false
) {
  try {
    isEthPayment = isEthPayment === true;
    var isErc20Payment = isEthPayment === false;
    if (isEthPayment) {
      paymentAssetAddress = "0x0000000000000000000000000000000000000000";
      paymentAmt = roundNumber(mulBy(paymentAmt, 10 ** 18), 0);
      unitPrice = roundNumber(mulBy(unitPrice, 10 ** 18), 0);
    } else {
      paymentAmt = roundNumber(mulBy(paymentAmt, 10 ** decimals), 0);
      unitPrice = roundNumber(mulBy(unitPrice, 10 ** decimals), 0);
    }
    var contract = await fetchContract(tradeContractAddress, "trade");
    var nonce_value = await getContractSignNonce(collectionId, sellerSign);
    var account = getCurrentAccount();
    var supply = 0;
    var tokenURI = "abcde";
    var royaltyFee = 0;
    var orderStruct = [
      assetOwner,
      account,
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
      isErc20Payment,
    ];
    var gasPrices = await gasPrice();
    if (!isEthPayment) {
      var receipt = await contract.buyAsset(
        orderStruct,
        gon.collection_data["imported"],
        splitSign(sellerSign, nonce_value),
        { from: account, gasLimit: 516883, gasPrice: String(gasPrices) }
      );
    } else {
      var receipt = await contract.buyAssetWithEth(
        orderStruct,
        gon.collection_data["imported"],
        splitSign(sellerSign, nonce_value),
        {
          from: account,
          gasLimit: 516883,
          gasPrice: String(gasPrices),
          value: paymentAmt,
        }
      );
    }
    receipt = await receipt.wait();
    await updateCollectionBuy(
      collectionId,
      buyingAssetQty,
      receipt.transactionHash
    );
    return window.buyPurchaseSuccess(collectionId);
  } catch (err) {
    console.log(err);
    if (!isEthPayment) {
      return window.buyPurchaseFailed(err["message"]);
    } else {
      return window.buyWithEthPurchaseFailed(err["message"]);
    }
  }
};

function getContractSignNonce(collectionId, sign) {
  var nonce;
  var request = $.ajax({
    url: `/collections/${collectionId}/get_contract_sign_nonce`,
    type: "POST",
    async: false,
    data: { sign: sign },
    dataType: "json",
  });
  request.done(function (data) {
    nonce = data["nonce"];
  });
  request.fail(function (jqXHR, textStatus) {
    console.log("Nonce failed. Please contact support");
  });
  return nonce;
}
// def get_contract_sign_nonce
//     contract_nonce = ContractNonceVerify.find_by(contract_sign_address: params[:sign])
//     nonce = contract_nonce.present? ? {nonce: contract_nonce.contract_sign_nonce.to_i} : {}
//     render json: nonce
//   end

function gasPrice() {
  var init_gasPrice = "400000000000";
  try {
    var request = $.ajax({
      url: `/gas_price`,
      async: false,
      type: "GET",
    });
    request.done(function (msg) {
      console.log(msg);
      console.log("Get Fastest Value from the API");
      if (msg["gas_price"] != "") {
        init_gasPrice = msg["gas_price"]["fastest"] * 10 ** 8;
      }
    });
    request.fail(function (jqXHR, textStatus) {
      console.log("Failed to get fastest value");
    });
  } catch (err) {
    console.error(err);
  }
  console.log(init_gasPrice);
  return init_gasPrice;
}
// def gas_price
//     gas_price = Api::Gasprice.gas_price
//     render json: {gas_price: gas_price}
//   end
//  class Gasprice
//         def self.gas_price
//           begin
//             uri = URI.parse(Rails.application.credentials.config[:gasstation_url])
//             request = Net::HTTP::Get.new(uri)
//             request.content_type = "application/json"
//             req_options = {
//               use_ssl: uri.scheme == "https",
//               open_timeout: 5,
//               read_timeout: 5,
//             }
//             response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
//               http.request(request)
//             end
//             response.code == '200' ? JSON.parse(response.body) : ''
//           rescue Exception => e
//             Rails.logger.warn "################## Exception while Fetching Gas Price ##################"
//             Rails.logger.warn "ERROR: #{e.message}"
//             Rails.logger.warn $!.backtrace[0..20].join("\n")
//             ''
//           end
//         end
//     end

function updateCollectionBuy(
  collectionId,
  quantity,
  transactionHash,
  tokenId = 0
) {
  var request = $.ajax({
    url: "/collections/" + collectionId + "/buy",
    type: "POST",
    async: false,
    data: { quantity: quantity, transaction_hash: transactionHash, tokenId },
    dataType: "script",
    success: function (respVal) {
      console.trace("updateCollectionBuy" + respVal);
      return respVal;
    },
  });
}
// def buy
//     begin
//       ActiveRecord::Base.transaction do
//         lazy_minted = lazy_mint_token_update
//         @redirect_address = @collection.direct_buy(current_user, params[:quantity].to_i, params[:transaction_hash], lazy_minted)
//       end

// def direct_buy(buyer, quantity, transaction_hash, lazy_minted)
//     hash = {seller_id: self.owner_id, buyer_id: buyer.id, currency: self.instant_sale_price,
//       currency_type: instant_currency_symbol, channel: :direct}
//     redirect_address = self.hand_over_to_owner(buyer.id, transaction_hash, quantity, lazy_minted)
//     self.add_transaction(hash)
//     return redirect_address
//   end

// def hand_over_to_owner(new_owner_id, transaction_hash, quantity=1, lazy_minted = nil, burn_transfer=false)
//     redirect_address = address
//     if multiple? && owned_tokens > 1
//       final_qty = owned_tokens - quantity
//       if final_qty == 0
//         self.update({owner_id: new_owner_id, put_on_sale: false, instant_sale_price: nil, instant_sale_enabled: false})
//       elsif final_qty > 0
//         collection = Collection.where(owner_id: new_owner_id, nft_contract_id: nft_contract_id, token: token).first
//         if collection && !burn_transfer
//           collection.assign_attributes({owned_tokens: (collection.owned_tokens + quantity)})
//         else
//           collection = self.dup.tap do |destination_package|
//             destination_package.attachment.attach(self.attachment.blob)
//             destination_package.cover.attach(self.cover.blob) if self.cover.present?
//           end
//           collection.assign_attributes({owner_id: new_owner_id, 
//             address: self.class.generate_uniq_token, 
//             put_on_sale: false, 
//             owned_tokens: quantity,
//             instant_sale_price: nil, 
//             instant_sale_enabled: false, 
//             no_of_copies: quantity, 
//             transaction_hash: transaction_hash})
//         end
//         collection.save
//         quantity_remains = {
//           owned_tokens: final_qty, 
//           put_on_sale: true, 
//           instant_sale_price: instant_sale_price, 
//           instant_sale_enabled: true,
//           transaction_hash: transaction_hash
//         }
//         quantity_remains.merge!({no_of_copies: no_of_copies - quantity}) if burn_transfer
//         self.update(quantity_remains)
//         redirect_address = collection.address
//         Notification.notify_nft_sold(self, self.owner_id)
//       end
//     else
//       self.update({owner_id: new_owner_id, put_on_sale: false, instant_sale_price: nil, instant_sale_enabled: false, transaction_hash: transaction_hash })
//     end
//     self.cancel_bids
//     return redirect_address
//   end

function buyPurchaseSuccess(collectionId) {
  $('.convertDone').removeClass('hide')
  $('.approvebuyDone').removeClass('hide')
  $('.purchaseProgress').addClass('hide')
  $('.purchaseMintAndProgress').addClass('hide')
  $('.purchaseDone').removeClass('hide')
  $('.purchaseAndMintDone').removeClass('hide')
  toastr.success('Purchase succces.')
  window.location.href = '/collections/' + collectionId
}

function buyPurchaseFailed(errorMsg) {
  toastr.error(errorMsg);
  hideAll();
  $(".convertDone").removeClass("hide");
  $(".approvebuyDone").removeClass("hide");
  $(".purchaseRetry").removeClass("hide");
};

function buyWithEthPurchaseFailed(errorMsg) {
  toastr.error(errorMsg);
  $(".allProgress").addClass("hide");
  $(".purchaseRetry").removeClass("hide");
  $(".purchaseRetry").show();
};

function bidApproveSuccess(transactionHash, contractAddress) {
  $(".approvebidProgress").addClass("hide");
  $(".approvebidDone").removeClass("hide");
  var contractAddress = $("#bid_currency option:selected, this").attr(
    "address"
  );
  initSignBidProcess(contractAddress);
}

function initSignBidProcess(contractAddress) {
  hideAll();
  $(".convertDone").removeClass("hide");
  $(".approvebidDone").removeClass("hide");
  $(".signbidProgress").removeClass("hide");
  var details = fetchCollectionDetails(null, contractAddress);
  if (details) {
    bidAsset(
      details["asset_address"],
      details["token_id"],
      $("#bid_qty").val(),
      $("#bid-total-amt-dp").attr("bidAmt"),
      details["pay_token_address"],
      details["pay_token_decimal"],
      details["collection_id"],
      $("#bid-total-amt-dp").attr("bidPayAmt")
    );
  } else {
    bidSignFailed("Unable to fetch tokan details. Please try again later");
  }
}

async function bidAsset(
  assetAddress,
  tokenId,
  qty = 1,
  amount,
  payingTokenAddress,
  decimals = 18,
  collectionId,
  bidPayAmt
) {
  try {
    console.log("enter bidAsset");
    var amountInDec = roundNumber(mulBy(amount, 10 ** decimals), 0);
    console.log(amountInDec);
    var nonce_value = await getNonceValue(collectionId);
    if (payingTokenAddress === null || payingTokenAddress === undefined) {
      payingTokenAddress = wethAddress;
    }
    if (decimals === null || decimals === undefined) {
      decimals = 18;
    }
    //var messageHash = window.web3.utils.soliditySha3(assetAddress, tokenId, payingTokenAddress, amountInDec, qty, nonce_value);
    var messageHash = ethers.utils.solidityKeccak256(
      ["address", "uint256", "address", "uint256", "uint256", "uint256"],
      [assetAddress, tokenId, payingTokenAddress, amountInDec, qty, nonce_value]
    );
    var account = getCurrentAccount();
    messageHash = ethers.utils.arrayify(messageHash);
    if (window.wallet == "walletConnect") {
      const signer = window.provider.getSigner();
      // print the signer
      var signature = await signer.signMessage(messageHash);
    } else {
      var signature = await signer.signMessage(messageHash);
    }
    //const signature = await window.web3.eth.personal.sign(messageHash, account);
    await placeBid(collectionId, signature, qty, {
      asset_address: assetAddress,
      token_id: tokenId,
      quantity: qty,
      amount: bidPayAmt,
      amount_with_fee: amount,
      payment_token_address: payingTokenAddress,
      payment_token_decimals: decimals,
    });
    await save_NonceValue(collectionId, signature, nonce_value);
    return bidSignSuccess(collectionId);
  } catch (err) {
    console.error(err);
    return bidSignFailed(err["message"]);
  }
};

function getNonceValue(collectionId) {
  var nonce;
  var request = $.ajax({
    url: `/collections/${collectionId}/get_nonce_value`,
    type: "POST",
    async: false,
    data: {},
    dataType: "json",
  });
  request.done(function (data) {
    nonce = data["nonce"];
  });
  request.fail(function (jqXHR, textStatus) {
    console.log("Nonce failed. Please contact support");
  });
  return nonce;
}
// def get_nonce_value
//        render json: {nonce: DateTime.now.strftime('%Q').to_i}
//   end

function placeBid(collectionId, sign, quantity, bidDetails) {
  var request = $.ajax({
    url: `/collections/${collectionId}/bid`,
    type: "POST",
    async: false,
    data: { sign: sign, quantity: quantity, details: bidDetails },
    dataType: "script",
  });
  request.done(function (msg) {
    console.log("Bidding success.");
  });
  request.fail(function (jqXHR, textStatus) {
    console.log("Bidding failed. Please contact support");
  });
}
// def bid
//     begin
//       @collection.place_bid(bid_params)
//     rescue Exception => e
//       Rails.logger.warn "################## Exception while creating BID ##################"
//       Rails.logger.warn "ERROR: #{e.message}, PARAMS: #{params.inspect}"
//       Rails.logger.warn $!.backtrace[0..20].join("\n")
//       @errors = e.message
//     end
//   end

// def place_bid(bidding_params)
//     details = bidding_params[:details]
//     erc20_token = Erc20Token.where(address: details[:payment_token_address]).first
//     self.bids.create(sign: bidding_params[:sign], amount: details[:amount], amount_with_fee: details[:amount_with_fee], state: :pending, owner_id: self.owner_id,
//                      user_id: bidding_params[:user_id], erc20_token_id: erc20_token&.id, quantity: details[:quantity])
//   end

// class Erc20Token < ApplicationRecord

//   def self.select_options(collection=nil)
//     #all.map { |token| [token.symbol.upcase, token.id, {address: token.address, decimals: token.decimals}] }
//     if collection.nil?
//       all
//     else
//       all.where(id=collection.erc20_token_id) unless collection.erc20_token_id.nil?
//     end
//   end

//   def currency_symbol
//     symbol.upcase
//   end

// end

function save_NonceValue(collectionId, sign, nonce) {
  var request = $.ajax({
    url: `/collections/${collectionId}/save_nonce_value`,
    type: "POST",
    async: false,
    data: { sign: sign, nonce: nonce },
    dataType: "script",
  });
  request.done(function (msg) {
    console.log("Nonce updated.");
  });
  request.fail(function (jqXHR, textStatus) {
    console.log("Nonce update failed. Please contact support");
  });
}
// def save_nonce_value
//      if params[:sign].present?
//       contract_nonce = ContractNonceVerify.create(contract_sign_address: params[:sign], contract_sign_nonce: params[:nonce], user_address: current_user.address)
//      end
//   end

function bidSignSuccess(collectionId) {
  toastr.success("Bidding succces.");
  window.location.href = "/collections/" + collectionId;
}

function bidSignFailed(errorMsg) {
  toastr.error(errorMsg);
  hideAll();
  $(".convertDone").removeClass("hide");
  $(".approvebidDone").removeClass("hide");
  $(".signbidRetry").removeClass("hide");
}

function buyApproveFailed(errorMsg) {
  toastr.error(errorMsg);
  hideAll();
  $(".convertDone").removeClass("hide");
  $(".approvebuyRetry").removeClass("hide");
  $(".purchaseStart").removeClass("hide");
  $(".purchaseAndMintStart").removeClass("hide");
}

function bidApproveFailed(errorMsg) {
  toastr.error(errorMsg);
  hideAll();
  $(".convertDone").removeClass("hide");
  $(".approvebidRetry").removeClass("hide");
  $(".signbidStart").removeClass("hide");
}

function convertEthToWeth(totalAmt, callBackType = "Bid") {
  $(".allRetry").addClass("hide");
  $(".convertProgress").removeClass("hide");
  // $("#" + callBackType + "-modal").modal("hide")
  // $("#place" + callBackType).modal("show")
  $.magnificPopup.close();
  $.magnificPopup.open({
    closeOnBgClick: false,
    enableEscapeKey: false,
    items: {
      src: "#place" + callBackType,
    },
    type: "inline",
  });
  convertWETH(totalAmt, callBackType);
}

async function convertWETH(
  amount,
  sendBackTo = "Bid",
  decimals = 18
) {
  console.log("Enter convertWETH");
  try {
    amount = roundNumber(mulBy(amount, 10 ** decimals), 0);
    var contract = await fetchContract(wethAddress, "erc20");
    var account = getCurrentAccount();
    var receipt = await contract.deposit({ from: account, value: amount });
    receipt = await receipt.wait();
    if (sendBackTo == "Buy") {
      return buyConvertSuccess(receipt.transactionHash);
    } else {
      return bidConvertSuccess(receipt.transactionHash);
    }
  } catch (err) {
    console.error(err);
    if (sendBackTo == "Buy") {
      return bidConvertFailed(err["message"]);
    } else {
      return bidConvertFailed(err["message"]);
    }
  }
};

function buyConvertSuccess(transactionHash) {
  $(".convertProgress").addClass("hide");
  $(".convertDone").removeClass("hide");
  initApproveBuyProcess(
    $("#buyContractAddress").val(),
    $("#buyContractDecimals").val()
  );
};

function initApproveBuyProcess(contractAddress, contractDecimals) {
  hideAll();
  $(".convertDone").removeClass("hide");
  $(".approvebuyProgress").removeClass("hide");
  $(".purchaseStart").removeClass("hide");
  $.magnificPopup.close();
  $.magnificPopup.open({
    closeOnBgClick: false,
    enableEscapeKey: false,
    items: {
      src: "#placeBuy",
    },
    type: "inline",
    callbacks: {
      close: function () {
        $("#buyForm :input").prop("disabled", false);
      },
    },
  });
  $(".purchaseAndMintStart").removeClass("hide");
  $("#Buy-modal").modal("hide");
  $("#placeBuy").modal("show");
  approveERC20(
    contractAddress,
    "erc20",
    $("#buy-total-amt-dp").attr("buyAmt"),
    contractDecimals,
    "Buy"
  );
}

function bidConvertSuccess(transactionHash) {
  $(".convertProgress").addClass("hide");
  $(".convertDone").removeClass("hide");
  var contractAddress = $("#bid_currency option:selected, this").attr(
    "address"
  );
  initApproveBidProcess(contractAddress);
}

function bidConvertFailed(errorMsg) {
  toastr.error(errorMsg);
  hideAll();
  $(".allStart").removeClass("hide").addClass("grey");
  $(".convertRetry").removeClass("hide");
}