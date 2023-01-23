function startContractDeploy(contractType) {
  var name = $("#nft_contract_name").val();
  var symbol = $("#nft_contract_symbol").val();
  var desc = $("#nft_contract_desc").val();
  var imageElement = document.getElementById("nft_contract_attachment").files;
  var image = null;
  var cover_imageElement = document.getElementById("nft_contract_cover").files;
  var cover_image = null;
  if (imageElement.length > 0) {
    image = imageElement[0];
  }
  if (cover_imageElement.length > 0) {
    cover_image = cover_imageElement[0];
  }
  var collectionId = $("#collection_id").val();
  if (!name || !symbol || !image || !desc) {
    toastr.info("Provide valid name, image, description and symbol");
    $.magnificPopup.close();
    $.magnificPopup.open({
      closeOnBgClick: false,
      enableEscapeKey: false,
      items: {
        src: "#createOwnErc721",
      },
      type: "inline",
    });
  } else {
    /** Contract type
     *  0 => ERC721
     *  1 => ERC1155
     */
    var compiled_details = getContractABIAndBytecode("", contractType, false); //shared=false  
    console.log(compiled_details);
    var abi = compiled_details["compiled_contract_details"]["abi_factory"];         // Contract factory( 721/1155)
    var bytecode = compiled_details["compiled_contract_details"]["bytecode"];       // Bytecode (721 / 1155)
    console.log(abi, bytecode, name, symbol, contractType, collectionId);
    contractDeployInit();
    deployContract(
      abi,
      bytecode,
      name,
      symbol,
      contractType,
      collectionId,
      image,
      desc,
      cover_image
    );
  }
}

function contractDeployInit() {
  $.magnificPopup.close();
  $.magnificPopup.open({
    closeOnBgClick: false,
    enableEscapeKey: false,
    items: {
      src: "#deployContract",
    },
    type: "inline",
  });
  $(".deployProgress").removeClass("hide");
  $(".deployDone").addClass("hide");
  $(".deployRetry").addClass("hide");
  $(".signStart").addClass("grey").removeClass("hide");
  $(".signProgress").addClass("hide");
  $(".signRetry").addClass("hide");
  $(".signDone").addClass("hide");
}

async function deployContract(
  abi,
  bytecode,
  name,
  symbol,
  contractType,
  collectionId,
  attachment,
  description,
  cover
) {
  //const contractDeploy = new ethers.Contract(abi,provider);
  let contractDeploy;
  var contractNFT;
  let contractAddress;
  try {
    console.log("enter deployContract");
    if (window.wallet == "walletConnect") {
      var sign = window.provider.getSigner();
    } else {
      var sign = provider.getSigner();
    }
    if (contractType == "nft721") {
      console.log(factoryContractAddressFor721, contractType);
      contractNFT = await new ethers.Contract(
        factoryContractAddressFor721,
        abi,
        provider
      );
    } else if (contractType == "nft1155") {
      contractNFT = await new ethers.Contract(
        factoryContractAddressFor1155,
        abi,
        provider
      );
    }

    contractDeploy = contractNFT.connect(sign);
    var account = await getCurrentAccount();
    var salt = getRandom(account);
    var contract = await contractDeploy.deploy(
      salt,
      name,
      symbol,
      tokenURIPrefix,
      transferProxyContractAddress
    );
    var receipt = await contract.wait();
    console.log("Contract was deployed at the following address:");
    contractAddress = receipt.events[2].args["contractAddress"];
    console.log(contractAddress);
    $("#nft_contract_address").val(contractAddress);
    let formData = new FormData();
    formData.append("file", attachment);
    formData.append("name", name);
    formData.append("symbol", symbol);
    formData.append("contract_address", contractAddress);
    formData.append("contract_type", contractType);
    formData.append("collection_id", collectionId);
    formData.append("description", description);
    formData.append("cover", cover);
    createContract(formData);
    window.contractDeploySuccess(contractAddress, contractType);
  } catch (err) {
    console.error(err);
    window.contractDeployFailed(err["message"]);
  }
};

function getRandom(address) {
  let value = Date.now() + Math.floor(Math.random() * 10 ** 10 + 1);
  var hex = value.toString(16);
  hex = hex + address.slice(2);
  return `0x${"0".repeat(64 - hex.length)}${hex}`;
}

function contractDeploySuccess(contractAddress, contractType) {
  console.log("Contract Address: " + contractAddress);
  $(".deployProgress").addClass("hide");
  $(".deployProgress").addClass("hide");
  $(".deployDone").addClass("disabledLink").removeClass("hide");

  //  OPEN SIGN METHOD
  // $('.signDone').addClass('hide')
  // $('.signStart').addClass('hide')
  // $('.signProgress').removeClass('hide')
  var mintType = $("input[name=is_lazy_mint]");
  if ($(mintType).is(":checked")) {
    initLazyMint();
  } else {
    initCollectionCreate(contractAddress, contractType);
  }
}

function initCollectionCreate(contractAddress, contractType) {
  var existingToken = $("#collection_token").val();
  collectionCreateInit(false, existingToken);
  var sharedCollection =
    $("input[name=chooseCollection]").filter(":checked").val() === "nft";
  approveNFT(
    contractType,
    contractAddress,
    sharedCollection,
    "collection",
    existingToken
  );
}

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

async function approveNFT(
  contractType,
  contractAddress,
  sharedCollection,
  sendBackTo = "collection",
  existingToken = null
) {
  try {
    console.log("Enter approveNFT");
    console.log(contractAddress, contractType, sharedCollection);
    var account = getCurrentAccount();
    const contractapp = await fetchContract(
      contractAddress,
      contractType,
      sharedCollection
    );
    await checkDepricatedStatus();
    var isApproved = await contractapp.isApprovedForAll(
      account,
      transferProxyContractAddress
    );
    if (!isApproved) {
      var receipt = await contractapp.setApprovalForAll(
        transferProxyContractAddress,
        true,
        { from: account }
      );
      receipt = await receipt.wait();
    }
    console.log("--step-1");
    if (sendBackTo == "executeBid") {
      console.log("--step-2");

      return window.approveBidSuccess();
    } else {
      console.log("--step-3");
      return window.collectionApproveSuccess(contractType, existingToken);
    }
  } catch (err) {
    console.error(err);
    if (sendBackTo == "executeBid") {
      return window.approveBidFailed(err["message"]);
    } else {
      return window.collectionApproveFailed(err["message"]);
    }
  }
};

function collectionApproveSuccess(contractType, existingToken = null) {
  mintCollectionCreate(contractType, existingToken);
}

function mintCollectionCreate(contractType, existingToken = null) {
  $(".allProgress").addClass("hide");
  $(".allDone").addClass("hide");
  $(".allRetry").addClass("hide");
  $(".allStart").addClass("hide").addClass("grey");
  $(".approveDone")
    .removeClass("hide")
    .removeClass("grey")
    .addClass("disabledLink");
  $(".mintProgress").removeClass("hide");
  $(".signFixPriceStart").removeClass("hide").addClass("grey");
  if (existingToken) {
    if ($("#collection_instant_sale_enabled").is(":checked")) {
      initsignFixedPriceProcess();
    } else {
      toastr.success("Collection created succcessfully.");
      window.location.href = "/collections/" + $("#collection_id").val();
    }
  } else {
    // TODO: WHILE CHANGE NFT TO SHARED/OWNER THS HAS TO BE CHANGED
    var sharedCollection = $("input[name=chooseCrossTowerCollection]").is(
      ":checked"
    );
    if (contractType === "nft721") {
      createCollectible721(
        $("#collection_contract_address").val(),
        $("#collection_token_uri").val(),
        $("#collection_royalty_fee").val(),
        $("#collection_id").val(),
        sharedCollection
      );
    } else if (contractType === "nft1155") {
      createCollectible1155(
        $("#collection_contract_address").val(),
        $("#collection_supply").val(),
        $("#collection_token_uri").val(),
        $("#collection_royalty_fee").val(),
        $("#collection_id").val(),
        sharedCollection
      );
    }
  }
}
