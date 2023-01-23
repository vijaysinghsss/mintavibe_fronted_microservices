async function createCollectible1155(
  contractAddress,
  supply,
  tokenURI,
  royaltyFee,
  collectionId,
  sharedCollection
) {
  try {
    console.log("enter createCollectible1155");
    var account = getCurrentAccount();
    console.log(account, contractAddress, "nft1155", sharedCollection);
    const contract1155 = await fetchContract(
      contractAddress,
      "nft1155",
      sharedCollection
    );
    var gasPrices = await gasPrice();
    var txn;
    if (sharedCollection) {
      var sign = await signMetadataHash(collectionId, contractAddress);
      await saveContractNonceValue(collectionId, sign);
      var signStruct = splitSign(sign["sign"], sign["nonce"]);
      txn = await contract1155.mint(tokenURI, supply, royaltyFee, signStruct, {
        gasLimit: 516883,
        gasPrice: String(gasPrices),
      });
    } else {
      txn = await contract1155.mint(tokenURI, royaltyFee, supply, {
        gasLimit: 516883,
        gasPrice: String(gasPrices),
      });
    }
    console.log(txn);
    var tx = await txn.wait();
    var tokenId = parseInt(tx.events[0].data.slice(0, 66));
    await dispatch(
      submitTranscation(_id, {
        token: tokenId,
        transaction_hash: tx.transactionHash,
      })
    );

    dispatch(
      SetFollowrData({
        ipfs: 1,
        approve: 1,
        mint: 1,
        modal: true,
      })
    );

    toast(NotificationMsg.mint, { type: "success" });
  } catch (err) {
    dispatch(
      SetFollowrData({
        ipfs: 1,
        approve: 1,
        mint: 2,
        modal: true,
      })
    );

    console.log("sign", err["message"]);
    // return window.collectionMintFailed(err['message'])
  }
}
