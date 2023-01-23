const { ethers } = require("ethers");

function initLazyMint() {
  approveCollection($("#collection_id").val());
  if ($("#collection_instant_sale_enabled").is(":checked")) {
    collectionCreateInit(true);
    console.log("Signing using metamask");
    initsignFixedPriceProcess(true);
  } else {
    toastr.success("Collection created succcessfully.");
    window.location.href = "/collections/" + $("#collection_id").val();
  }
}

function approveCollection(collectionId) {
  $.ajax({
    url: `/collections/${collectionId}/approve`,
    type: "POST",
    async: false,
    dataType: "script",
  })
    .done(function (msg) {
      console.log("Collection updated.");
    })
    .fail(function (jqXHR, textStatus) {
      console.log("Collection update failed. Please contact support");
    });
};
//  def approve
//     collection = current_user.collections.unscoped.where(address: params[:id]).take
//     if collection.metadata_hash.present?
//       collection.approve! if collection.pending?
//     end
//   end

function collectionCreateInit(lazy_minting = false, existingToken = null) {
  if ($("#collection_instant_sale_enabled").is(":checked")) {
    $(".signFixedPrice").removeClass("hide");
  } else {
    $(".signFixedPrice").addClass("hide");
  }
  show_modal("#collectionStepModal");
  if (existingToken) {
    $(".mintFlow").addClass("hide");
  }
  if (lazy_minting) {
    $(".mintFlow").addClass("hide");
    $(".approveFlow").addClass("hide");
  }
  $("#deployContract").modal("hide");
  $("#collectionStepModal").modal("show");

  $(".allProgress").addClass("hide");
  $(".allDone").addClass("hide");
  $(".allRetry").addClass("hide");
  $(".allStart").removeClass("hide").addClass("grey");
  $(".approveProgress").removeClass("hide");
}

function initsignFixedPriceProcess(is_lazy_minting = false) {
  hideAll()
  $('.convertDone').removeClass('hide')
  $('.approveDone').removeClass('hide')
  $('.mintDone').removeClass('hide')
  $('.signFixPriceProgress').removeClass('hide')
  var pay_token_address = $('#collection_erc20_token_id option:selected, this').attr('address')
  var details = fetchCollectionDetails(null, pay_token_address)
  if (details) {
    // tokenID is 0 for Lazy-minting blocks
    const tokenId = is_lazy_minting ? 0 : details['token_id']
    if (details['is_eth_payment']) {
      var paymentCoin = "0x0000000000000000000000000000000000000000";
      var ethDecimals = 18;
      signSellOrder(details['unit_price'], ethDecimals, paymentCoin,
        tokenId, details['asset_address'], details['collection_id'],
      )
    } else {
      signSellOrder(details['unit_price'], details['pay_token_decimal'], details['pay_token_address'],
        tokenId, details['asset_address'], details['collection_id'])
    }
  } else {
    bidSignFixedFailed('Unable to fetch tokan details. Please try again later')
  }
}
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
// def fetch_details
//     render json: {data: @collection.fetch_details(params[:bid_id], params[:erc20_address])}
//   end



async function signSellOrder(
  amount,
  decimals,
  paymentAssetAddress,
  tokenId,
  assetAddress,
  collectionId,
  sendBackTo = ""
) {
  try {
    amount = roundNumber(mulBy(amount, 10 ** decimals), 0);
    var nonce_value = await getNonceValue(collectionId);
    var messageHash;
    messageHash = ethers.utils.solidityKeccak256(
      ["address", "uint256", "address", "uint256", "uint256"],
      [assetAddress, tokenId, paymentAssetAddress, amount, nonce_value]
    );
    messageHash = ethers.utils.arrayify(messageHash);
    var account = getCurrentAccount();
    if (window.wallet == "walletConnect") {
      const signer = window.provider.getSigner();
      var fixedPriceSignature = await signer.signMessage(messageHash, account);
    } else {
      var fixedPriceSignature = await signer.signMessage(messageHash, account);
    }
    await updateSignature(collectionId, fixedPriceSignature);
    await save_NonceValue(collectionId, fixedPriceSignature, nonce_value);
    if (sendBackTo == "update") {
      return updateSignFixedSuccess(collectionId);
    } else {
      return bidSignFixedSuccess(collectionId);
    }
  } catch (err) {
    console.error(err);
    if (sendBackTo == "update") {
      return window.updateSignFixedFailed(err["message"]);
    } else {
      return window.bidSignFixedFailed(err["message"], collectionId);
    }
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

function getCurrentAccount() {
  if (window.wallet == "metamask" && window.ethereum.selectedAddress) {
    return window.ethereum.selectedAddress;
  }
  return window.currentAddress ?? sessionAddress;
}

function updateSignature(collectionId, sign) {
  var request = $.ajax({
    url: `/collections/${collectionId}/sign_fixed_price`,
    type: "POST",
    async: false,
    data: { sign: sign },
    dataType: "script",
  });
  request.done(function (msg) {
    console.log("Signature updated.");
  });
  request.fail(function (jqXHR, textStatus) {
    console.log("Signature update failed. Please contact support");
  });
}
// def sign_fixed_price
//     collection = current_user.collections.unscoped.where(address: params[:id]).take
//     collection.approve! if collection.pending?
//     collection.update(sign_instant_sale_price: params[:sign])
//   end

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

function updateSignFixedSuccess(collectionId) {
  $("#submitPriceChange").click();
}

function bidSignFixedSuccess(collectionId) {
  toastr.success("Collection created succcessfully.");
  window.location.href = "/collections/" + collectionId;
};

function bidSignFailed(errorMsg, collectionId = "") {
  toastr.error(errorMsg);
  hideAll();
  $(".convertDone").removeClass("hide");
  $(".approveDone").removeClass("hide");
  $(".mintDone").removeClass("hide");
  $(".signFixPriceRetry").removeClass("hide");
  if (collectionId != "") {
    updateOwnContractCollection(collectionId);
  }
}