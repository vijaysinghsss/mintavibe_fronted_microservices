import { ethers } from "ethers";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import Web3 from "web3";
import { allApi, API } from "../../apiwrapper";
import { ABI, nftType } from "../../constant/create-from";
import { SetBuyData, SetFollowrData } from "../reducer";
import apiURl, { NotificationMsg } from "./api-url";
import {
  ChainIDS,
  divBy,
  mulBy,
  roundNumber,
  stringify,
  toNum,
} from "./common-functions";

export const gasPrice = async () => {
  try {
    return await allApi({
      url: process.env.REACT_APP_GASSTATION_URL,
      method: "GET",
    }).then((data) => {
      // console.log('data', data, data.fastest * 10 ** 8);
      return data.fastest * 10 ** 8;
    });
  } catch (err) {
    console.error("data", err);
    return 400000000000;
  }
};

export const fileToDataUri = (file) =>
  new Promise((resolve, reject) => {
    const fileBlob = URL.createObjectURL(file);
    const [type, format] = file.type.split("/");
    console.log("fileBlob", fileBlob, file);
    resolve({ url: fileBlob, type, format });
  });

export const load721Contract = (contractAddress, provider, signer) => {
  let obj = new ethers.Contract(contractAddress, ABI.abi, provider);
  return obj.connect(signer);
};

export const solidity_sha3 = (
  contractAddress,
  current_user_address,
  metadataHash,
  provider,
  Royality,
  no_of_copies,
  nonce,
  type
) => {
  let web3 = new Web3(new Web3.providers.HttpProvider(provider));
  if (type == "nft1155") {
    return web3.utils.soliditySha3(
      { type: "address", value: contractAddress },
      { type: "address", value: current_user_address },
      { type: "string", value: metadataHash },
      { type: "uint256", value: no_of_copies },
      { type: "uint96", value: Royality },
      { type: "uint256", value: nonce }
    );
  } else {
    return web3.utils.soliditySha3(
      { type: "address", value: contractAddress },
      { type: "address", value: current_user_address },
      { type: "string", value: metadataHash },
      { type: "uint96", value: Royality },
      { type: "uint256", value: nonce }
    );
  }
};

export const splitSign = (sign, nonce) => {
  let sig = ethers.utils.splitSignature(sign);
  return [sig.v, sig.r, sig.s, nonce];
};

export const getContractABIAndBytecode = (
  contractAddress,
  type,
  shared = true
) => {
  try {
    return API({
      url: `/abi?type=${type}&shared=${shared}&contract_address=${contractAddress}`,
      method: "GET",
    }).then((data) => {
      return data.Data.abi;
    });
  } catch (error) {
    throw "Something Wrong";
  }
};

export const getContractSignNonce = (collectionId, type = "GET", body = {}) => {
  try {
    if (type) {
      return API({ url: `/contractnonce/${collectionId}`, method: type }).then(
        (data) => {
          return data.data.allnonce;
        }
      );
    } else {
      return API({
        url: `/contractnonce`,
        method: type,
        body: {
          ...body,
          id: collectionId,
        },
      }).then((data) => {
        return data.data.allnonce;
      });
    }
  } catch (error) {
    return null;
  }
};

export const fetchContract = async (
  contractAddress,
  type,
  provider,
  signer,
  shared = true
) => {
  let abi = await getContractABIAndBytecode(contractAddress, type, shared);
  let obj = new ethers.Contract(contractAddress, abi, provider);
  console.log({ signer });
  return obj.connect(signer);
};

export const signMeta = async (msg, privateKey, provider) => {
  let web3 = new Web3(new Web3.providers.HttpProvider(provider));
  return await web3.eth.accounts.sign(msg, privateKey);
};

export const approveNFT =
  (Mintingdata, contratDetails, userSignature, navigate) =>
  async (dispatch) => {
    const { provider, signer, address, chainId } = userSignature;
    const {
      contractType,
      contractAddress,
      sharedCollection,
      sendBackTo = "collection",
      existingToken = null,
    } = contratDetails;

    // upload: 1,
    //  mint: 0,
    //  fixed: 2,
    //  approve: 2,
    //  modal: true

    dispatch(
      SetFollowrData({
        upload: 1,
        approve: 0,
        mint: 2,
        fixed: 2,
        modal: true,
      })
    );

    try {
      const contractapp = await fetchContract(
        contractAddress,
        contractType,
        provider,
        signer,
        sharedCollection
      );
      // await load721Contract(contractAddress, provider, signer)
      let isApproved = await contractapp.isApprovedForAll(
        address,
        process.env.REACT_APP_TRANSFERPROXYCONTRACTADDRESS
      );

      if (!isApproved) {
        let receipt = await contractapp.setApprovalForAll(
          process.env.REACT_APP_TRANSFERPROXYCONTRACTADDRESS,
          true,
          { from: address }
        );
        await receipt.wait();
      }
      dispatch(
        SetFollowrData({
          upload: 1,
          approve: 1,
          mint: 0,
          fixed: 2,
          modal: true,
        })
      );

      return await dispatch(
        createCollectible721(
          { ...Mintingdata, provider, signer, address, chainId },
          contractAddress,
          sharedCollection,
          contractType,
          navigate
        )
      );
    } catch (err) {
      console.error(err);

      dispatch(
        SetFollowrData({
          upload: 1,
          approve: 5,
          mint: 2,
          fixed: 2,
          func: () => {
            dispatch(
              approveNFT(Mintingdata, contratDetails, userSignature, navigate)
            );
          },
          modal: true,
        })
      );
    }
  };

export const createCollectible721 =
  (Mintingdata, contractAddress, sharedCollection, type, navigate) =>
  async (dispatch) => {
    const {
      address,
      chainId,
      provider,
      signer,
      metadataCID,
      Royality,
      _id,
      no_of_copies = false,
      sign_instant_sale_price,
      randomValue,
      nft_type,
    } = Mintingdata;

    const randomNonce = randomValue;

    try {
      dispatch(
        SetFollowrData({
          upload: 1,
          approve: 1,
          mint: 0,
          fixed: 2,
          modal: true,
        })
      );

      const contract = await fetchContract(
        contractAddress,
        type,
        provider,
        signer,
        sharedCollection
      );

      let gasPrices = await gasPrice();

      let txn, tokenId;

      if (sharedCollection) {
        let Hash = solidity_sha3(
          contractAddress,
          address,
          metadataCID,
          process.env.REACT_APP_ETHEREUM_PROVIDER,
          parseInt(Royality),
          parseInt(no_of_copies),
          randomNonce,
          type
        );

        let signValue = await signMeta(
          Hash,
          process.env.REACT_APP_SIGNER_PRIVATE_KEY,
          process.env.REACT_APP_ETHEREUM_PROVIDER
        );

        let signStruct = splitSign(signValue, randomNonce);

        if (type == "nft1155") {
          txn = await contract.createCollectible(
            metadataCID,
            parseInt(no_of_copies),
            parseInt(Royality),
            signStruct,
            {
              gasLimit: 516883,
              gasPrice: String(gasPrices),
            }
          );
        } else {
          txn = await contract.createCollectible(
            metadataCID,
            parseInt(Royality),
            signStruct,
            {
              gasLimit: 516883,
              gasPrice: String(gasPrices),
            }
          );
        }
      } else {
        if (type == "nft1155") {
          txn = await contract.createCollectible(
            metadataCID,
            Royality,
            no_of_copies,
            {
              gasLimit: 516883,
              gasPrice: String(gasPrices),
            }
          );
        } else {
          txn = await contract.createCollectible(metadataCID, Royality, {
            gasLimit: 516883,
            gasPrice: String(gasPrices),
          });
        }
      }
      let tx = await txn.wait();
      if (type == "nft1155") {
        tokenId = parseInt(tx.events[1].topics[tx.events[1].topics.length - 1]);
      } else {
        tokenId = parseInt(tx.events[0].topics[tx.events[0].topics.length - 1]);
      }

      await dispatch(
        submitTranscation(
          _id,
          { token: tokenId, transaction_hash: tx.transactionHash },
          false
        )
      );

      await dispatch(
        submitTranscation(_id, {
          token: tokenId,
          transaction_hash: tx.transactionHash,
        })
      );

      await dispatch(
        signSellOrder(
          sign_instant_sale_price,
          18,
          `0x0000000000000000000000000000000000000000`,
          tokenId,
          contractAddress,
          _id,
          "",
          signer,
          address,
          randomNonce,
          chainId,
          navigate,
          nft_type
        )
      );
    } catch (err) {
      console.log("err", err);
      dispatch(
        SetFollowrData({
          upload: 1,
          approve: 1,
          mint: 5,
          fixed: 2,
          func: () => {
            dispatch(
              createCollectible721(
                Mintingdata,
                contractAddress,
                sharedCollection,
                type,
                navigate
              )
            );
          },
          modal: true,
        })
      );

      // return window.collectionMintFailed(err['message'])
    }
  };

export const submitData = (body) => async (dispatch) => {
  return await API({
    url: apiURl.ContractNonce,
    method: "POST",
    body,
    headers: { "content-type": "application/json;charset-UTF-8" },
  }).then((data) => {
    console.log("nonce", data);
    return data;
  });
};

export const submitTranscation =
  (id, body, children = true) =>
  async (dispatch) => {
    return await API({
      url: `${children ? apiURl.Nft : apiURl.editMultinft}/${id}`,
      method: "PUT",
      body,
      headers: { "content-type": "application/json;charset-UTF-8" },
    }).then((data) => data);
  };

export const gup = (name, url) => {
  if (!url) url = document.location.href;
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  let regexS = "[\\?&]" + name + "=([^&#]*)";
  let regex = new RegExp(regexS);
  let results = regex.exec(url);
  return results == null ? null : results[1];
};

export const Erc20Balance = async (
  contractAddress,
  decimals,
  account,
  provider
) => {
  let abi = [
    {
      constant: true,
      inputs: [{ name: "_owner", type: "address" }],
      name: "balanceOf",
      outputs: [{ name: "balance", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
  ];

  const contract = new ethers.Contract(contractAddress, abi, provider);

  let balance = await contract.balanceOf(account);

  let bal = parseInt(balance);
  balance = roundNumber(divBy(bal, 10 ** decimals), 4);
  return balance;
};

export const signSellOrder =
  (
    amount,
    decimals,
    paymentAssetAddress,
    tokenId,
    assetAddress,
    collectionId,
    sendBackTo = "",
    signer,
    account,
    nonce_value,
    chainId,
    navigate,
    nft_type
  ) =>
  async (dispatch) => {
    try {
      if (nft_type === nftType.fixed) {
        dispatch(
          SetFollowrData({
            upload: 1,
            approve: 1,
            mint: 1,
            fixed: 0,
            modal: true,
          })
        );
      }

      amount = roundNumber(mulBy(amount, 10 ** decimals), 0);

      let messageHash, fixedPriceSignature;

      messageHash = ethers.utils.solidityKeccak256(
        ["address", "uint256", "address", "uint", "uint256"],
        [assetAddress, tokenId, paymentAssetAddress, amount, nonce_value]
      );

      messageHash = ethers.utils.arrayify(messageHash);

      fixedPriceSignature = await signer.signMessage(messageHash, account);

      await dispatch(
        submitData({
          contract_sign_address: fixedPriceSignature,
          contract_sign_nonce: nonce_value,
          network_id: chainId,
          user_address: account,
          id: collectionId,
        })
      );

      await dispatch(
        submitTranscation(collectionId, {
          buy_offer_index: fixedPriceSignature,
        })
      );

      await dispatch(
        SetFollowrData({
          upload: 1,
          approve: 1,
          mint: 1,
          fixed: nft_type === nftType.fixed ? 1 : 1,
          modal: false,
        })
      );

      // toast(NotificationMsg.mint, { type: "success" });
      setTimeout(() => {
        navigate(`/collections/${collectionId}`);
      }, 1200);
    } catch (err) {
      dispatch(
        SetFollowrData({
          upload: 1,
          approve: 1,
          mint: 1,
          fixed: 5,
          func: () => {
            dispatch(
              signSellOrder(
                amount,
                decimals,
                paymentAssetAddress,
                tokenId,
                assetAddress,
                collectionId,
                sendBackTo,
                signer,
                account,
                nonce_value,
                chainId,
                navigate
              )
            );
          },
          modal: true,
        })
      );
    }
  };

export const buyAsset =
  (
    Owner_address,
    Contrat_type,
    Contract_addres,
    tokenId,
    instant_sale_price,
    no_of_copies,
    sale_with_serviceFEE,
    paymentAssetAddress,
    decimals,
    collectionId,
    account,
    royaltyFee,
    provider,
    signer,
    tokenURI,
    UserID,
    isEthPayment = false,
    CollectionDetails,
    navigate
  ) =>
  async (dispatch) => {
    const { available_copies } = CollectionDetails;
    let recentListing = [...(CollectionDetails?.Listing || [])];

    dispatch(
      SetFollowrData({
        upload: 1,
        mint: 0,
        fixed: 2,
        approve: 2,
        ModalType: "Buy",
        modal: true,
      })
    );

    try {
      let isErc20Payment = false;

      if (isEthPayment) {
        paymentAssetAddress = "0x0000000000000000000000000000000000000000";
        sale_with_serviceFEE = roundNumber(
          mulBy(sale_with_serviceFEE, 10 ** 18),
          0
        );
        instant_sale_price = roundNumber(
          mulBy(instant_sale_price, 10 ** 18),
          0
        );
      } else {
        sale_with_serviceFEE = roundNumber(
          mulBy(sale_with_serviceFEE, 10 ** decimals),
          0
        );
        instant_sale_price = roundNumber(
          mulBy(instant_sale_price, 10 ** decimals),
          0
        );
      }

      let contract = await fetchContract(
        process.env.REACT_APP_TRADECONTRACTADDRESS,
        "trade",
        provider,
        signer
      );

      let { Contract_sign_nonce, Contract_sign_address } =
        await getContractSignNonce(collectionId);

      let supply = 1;

      let depricated_status = false;
      let orderStruct = [
        Owner_address,
        account,
        paymentAssetAddress,
        Contract_addres,
        toNum(Contrat_type),
        toNum(instant_sale_price),
        toNum(sale_with_serviceFEE),
        toNum(tokenId),
        toNum(supply),
        tokenURI,
        toNum(0),
        toNum(no_of_copies),
        depricated_status,
        false,
        isErc20Payment,
      ];

      const gasPrices = await gasPrice();

      let receipt;

      const SignData = splitSign(Contract_sign_address, Contract_sign_nonce);

      if (!isEthPayment) {
        receipt = await contract.buyAsset(orderStruct, SignData, {
          from: account,
          gasLimit: 516883,
          gasPrice: String(gasPrices),
        });
      } else {
        receipt = await contract.buyAsset(orderStruct, SignData, {
          from: account,
          gasLimit: 516883,
          gasPrice: String(gasPrices),
          value: sale_with_serviceFEE,
        });
      }
      receipt = await receipt.wait();

      dispatch(
        SetFollowrData({
          upload: 1,
          mint: 1,
          fixed: 0,
          approve: 2,
          ModalType: "Buy",
          modal: true,
        })
      );

      try {
        if (
          no_of_copies <= available_copies ||
          no_of_copies > available_copies
        ) {
          let i = 0;
          let quantity = no_of_copies;
          let loop = recentListing.length;

          while (loop) {
            if (i >= loop) {
              break;
            }

            let existingQty = parseInt(recentListing[i].AvailableQuantity);

            if (quantity > existingQty) {
              quantity = existingQty - quantity;
              if (Math.sign(quantity) == -1) {
                recentListing[i].AvailableQuantity = 0;
                recentListing[i].Status = false;
                quantity = Math.abs(quantity);
              } else {
                recentListing[i].AvailableQuantity = Math.abs(quantity);
              }
              if (quantity == 0) {
                recentListing[i].Status = false;
              }
            } else if (quantity <= existingQty) {
              quantity = existingQty - quantity;
              if (Math.sign(quantity) == -1) {
                recentListing[i].AvailableQuantity = 0;
                recentListing[i].Status = false;
                quantity = Math.abs(quantity);
              } else {
                recentListing[i].AvailableQuantity = Math.abs(quantity);
                quantity = 0;
                if (quantity == 0) {
                  recentListing[i].Status = false;
                }
                break;
              }
            } else {
              break;
            }
            i++;
          }
        }
        let contract1155 = {};
        if (!Contrat_type) {
          contract1155 = await fetchContract(
            process.env.REACT_APP_CONTRACT_ADDRESS_ERC1155,
            "nft1155",
            provider,
            signer
          );
        }
        await API({
          url: `${apiURl.NftMulti}`,
          method: "POST",
          body: {
            no_of_copies: parseInt(no_of_copies),
            owner_id: UserID,
            owner_address: account,
            transaction_hash: receipt?.transactionHash || "",
            buy_offer_index: 0,
          },
          headers: { "content-type": "application/json;charset-UTF-8" },
        }).then((data) => data);

        let count = recentListing.reduce(
          (value, item) =>
            value + (item.Status ? parseInt(item.AvailableQuantity) : 0),
          0
        );
        let nftObject = {
          transaction_hash: receipt.transactionHash,
          buy_offer_index: 0,
          Listing: recentListing,
          available_copies: count,
        };

        if (!count) {
          nftObject["put_on_sale"] = false;
          nftObject["instant_sale_enabled"] = false;
        }

        if (Contrat_type) {
          nftObject["owner_id"] = UserID;
          nftObject["owner_wallet_address"] = account;
          nftObject["Listing"] = recentListing.map((data) => ({
            ...data,
            Status: false,
          }));
          nftObject["available_copies"] = 0;
          nftObject["own_copies"] = no_of_copies;
        } else {
          await API({
            url: `${apiURl.newCollwction}/${collectionId}`,
            method: "POST",
            body: {
              no_of_copies: parseInt(
                await contract1155.balanceOf(account, tokenId)
              ),
              owner_id: UserID,
              owner_address: account,
              transaction_hash: receipt?.transactionHash || "",
              buy_offer_index: 0,
            },
            headers: { "content-type": "application/json;charset-UTF-8" },
          }).then((data) => data);
        }

        await dispatch(submitTranscation(collectionId, nftObject));

        // await API({ url: `${apiURl.Bid}/${collectionId}`, method: 'POST', body: {} });

        await dispatch(
          SetFollowrData({
            upload: 1,
            mint: 1,
            fixed: 1,
            approve: 2,
            ModalType: "Buy",
            modal: false,
          })
        );

        // toast(NotificationMsg.BuySuccess, { type: "success" });
        setTimeout(() => {
          navigate(`/collections/${collectionId}`);
        }, 200);
        navigate("/");
      } catch (error) {
        dispatch(
          SetFollowrData({
            upload: 1,
            mint: 1,
            fixed: 5,
            approve: 2,
            func: async () => {
              await dispatch(
                submitTranscation(collectionId, {
                  no_of_copies,
                  owner_id: account,
                  transaction_hash: receipt.transactionHash,
                  buy_offer_index: 0,
                })
              );
              dispatch(
                SetFollowrData({
                  upload: 1,
                  mint: 1,
                  fixed: 1,
                  approve: 2,
                  ModalType: "Buy",
                  modal: true,
                })
              );
              setTimeout(() => {
                navigate(`/collections/${collectionId}`);
              }, 200);
              navigate("/");
              // toast(NotificationMsg.BuySuccess, { type: "success" });
            },
            ModalType: "Buy",
            modal: true,
          })
        );
      }

      // await updateCollectionBuy(
      //     collectionId,
      //     buyingAssetQty,
      //     receipt.transactionHash
      // );
      // return window.buyPurchaseSuccess(collectionId);
    } catch (err) {
      console.log(err);
      dispatch(
        SetFollowrData({
          upload: 1,
          mint: 5,
          fixed: 2,
          approve: 2,
          ModalType: "Buy",
          func: () => {
            dispatch(
              buyAsset(
                Owner_address,
                Contrat_type,
                Contract_addres,
                tokenId,
                instant_sale_price,
                no_of_copies,
                sale_with_serviceFEE,
                paymentAssetAddress,
                decimals,
                collectionId,
                account,
                royaltyFee,
                provider,
                signer,
                tokenURI,
                UserID,
                (isEthPayment = false),
                CollectionDetails,
                navigate
              )
            );
          },
          modal: true,
        })
      );
      // if (!isEthPayment) {
      //     return window.buyPurchaseFailed(err["message"]);
      // } else {
      //     return window.buyWithEthPurchaseFailed(err["message"]);
      // }
    }
  };

export const FiatbuyAsset =
  (
    Owner_address,
    Contrat_type,
    Contract_addres,
    tokenId,
    instant_sale_price,
    no_of_copies,
    sale_with_serviceFEE,
    paymentAssetAddress,
    decimals,
    collectionId,
    account,
    royaltyFee,
    provider,
    signer,
    tokenURI,
    UserID,
    isEthPayment = false,
    CollectionDetails,
    navigate
  ) =>
  async (dispatch) => {
    const { available_copies } = CollectionDetails;
    let recentListing = [...(CollectionDetails?.Listing || [])];

    try {
      let isErc20Payment = false;

      if (isEthPayment) {
        paymentAssetAddress = "0x0000000000000000000000000000000000000000";
        sale_with_serviceFEE = roundNumber(
          mulBy(sale_with_serviceFEE, 10 ** 18),
          0
        );
        instant_sale_price = roundNumber(
          mulBy(instant_sale_price, 10 ** 18),
          0
        );
      } else {
        sale_with_serviceFEE = roundNumber(
          mulBy(sale_with_serviceFEE, 10 ** decimals),
          0
        );
        instant_sale_price = roundNumber(
          mulBy(instant_sale_price, 10 ** decimals),
          0
        );
      }
      let web3 = new Web3(
        new Web3.providers.HttpProvider(process.env.REACT_APP_ETHEREUM_PROVIDER)
      );
      let account1 = web3.eth.accounts.privateKeyToAccount(
        process.env.REACT_APP_TRE_WALLET
      );
      let abi = await getContractABIAndBytecode(
        process.env.REACT_APP_TRADECONTRACTADDRESS,
        "trade",
        true
      );

      let contract = new web3.eth.Contract(
        abi,
        process.env.REACT_APP_TRADECONTRACTADDRESS
      );

      // let contract = await fetchContract(process.env.REACT_APP_TRADECONTRACTADDRESS, "trade", provider, signer);

      let { Contract_sign_nonce, Contract_sign_address } =
        await getContractSignNonce(collectionId);

      let supply = 1;

      let depricated_status = false;

      let orderStruct = [
        Owner_address,
        account,
        paymentAssetAddress,
        Contract_addres,
        toNum(Contrat_type),
        toNum(instant_sale_price),
        toNum(sale_with_serviceFEE),
        toNum(tokenId),
        toNum(supply),
        tokenURI,
        toNum(0),
        toNum(no_of_copies),
        depricated_status,
        true,
        isErc20Payment,
      ];

      const gasPrices = await gasPrice();

      let receipt;

      const SignData = splitSign(Contract_sign_address, Contract_sign_nonce);

      console.log("========>", { account1, Contract_sign_address });
      receipt = await contract.methods.buyAsset(orderStruct, SignData);

      let receipt_encode = await receipt.encodeABI();
      const txData = {
        from: account1.address,
        to: process.env.REACT_APP_TRADECONTRACTADDRESS,
        data: receipt_encode,
        gas: 516883,
        value: sale_with_serviceFEE,
        gasPrice: String(gasPrices),
      };
      /** signTransaction */
      let signed_tx = await web3.eth.accounts.signTransaction(
        txData,
        account1.privateKey
      );

      receipt = await web3.eth.sendSignedTransaction(signed_tx.rawTransaction);

      if (no_of_copies <= available_copies || no_of_copies > available_copies) {
        let i = 0;
        let quantity = no_of_copies;
        let loop = recentListing.length;

        while (loop) {
          if (i >= loop) {
            break;
          }

          let existingQty = parseInt(recentListing[i].AvailableQuantity);

          if (quantity > existingQty) {
            quantity = existingQty - quantity;
            if (Math.sign(quantity) == -1) {
              recentListing[i].AvailableQuantity = 0;
              recentListing[i].Status = false;
              quantity = Math.abs(quantity);
            } else {
              recentListing[i].AvailableQuantity = Math.abs(quantity);
            }
          } else if (quantity <= existingQty) {
            quantity = existingQty - quantity;
            if (Math.sign(quantity) == -1) {
              recentListing[i].AvailableQuantity = 0;
              recentListing[i].Status = false;
              quantity = Math.abs(quantity);
            } else {
              recentListing[i].AvailableQuantity = Math.abs(quantity);
              quantity = 0;
              break;
            }
          } else {
          }
          i++;
        }
      }

      await API({
        url: `${apiURl.NftMulti}`,
        method: "POST",
        body: {
          no_of_copies,
          owner_id: UserID,
          owner_address: account,
          transaction_hash: receipt?.transactionHash || "",
          buy_offer_index: 0,
        },
        headers: { "content-type": "application/json;charset-UTF-8" },
      }).then((data) => data);

      let count = recentListing.reduce(
        (value, item) =>
          value + (item.Status ? parseInt(item.AvailableQuantity) : 0),
        0
      );

      let nftObject = {
        transaction_hash: receipt.transactionHash,
        buy_offer_index: 0,
        Listing: recentListing,
        available_copies: count,
      };

      if (!count) {
        nftObject["put_on_sale"] = false;
        nftObject["instant_sale_enabled"] = false;
      }

      if (Contrat_type) {
        nftObject["owner_id"] = UserID;
        nftObject["owner_wallet_address"] = account;
        nftObject["Listing"] = recentListing.map((data) => ({
          ...data,
          Status: false,
        }));
        nftObject["available_copies"] = 0;
      } else {
        await API({
          url: `${apiURl.newCollwction}/${collectionId}`,
          method: "POST",
          body: {
            no_of_copies,
            owner_id: UserID,
            owner_address: account,
            transaction_hash: receipt?.transactionHash || "",
            available_copies: 0,
            buy_offer_index: 0,
          },
          headers: { "content-type": "application/json;charset-UTF-8" },
        }).then((data) => data);
      }

      await dispatch(submitTranscation(collectionId, nftObject));

      dispatch(
        SetFollowrData({
          upload: false,
          mint: 1,
          fixed: 1,
          approve: false,
          ModalType: "stripe",
          modal: false,
          func: () => {},
        })
      );

      setTimeout(() => {
        navigate(`/collections/${CollectionDetails?._id}`);
      }, 200);
      dispatch(
        SetFollowrData({
          upload: false,
          mint: false,
          fixed: false,
          approve: false,
          ModalType: "stripe",
          modal: false,
          func: () => {},
        })
      );

      navigate(`/`);

      // await updateCollectionBuy(
      //     collectionId,
      //     buyingAssetQty,
      //     receipt.transactionHash
      // );
      // return window.buyPurchaseSuccess(collectionId);
    } catch (err) {
      let errObject = {
        message: err.message,
        type: "METAMASK",
        typeFunc: "Buy-Function-(FiatbuyAsset)",
        params: {
          creatorWallet: Owner_address,
          collactionType: Contrat_type,
          collectionContractType: Contract_addres,
          uri: tokenId,
          price: instant_sale_price,
          qty: no_of_copies,
          totalPrice: sale_with_serviceFEE,
          wethAddresss: paymentAssetAddress,
          decimals: decimals,
          collectionID: collectionId,
          userAddress: account,
          royality: royaltyFee,
          // privide: provider,
          // signer,
          tokenURI: tokenURI,
          userId: UserID,
          isEthPayment: isEthPayment,
        },
      };
      dispatch(
        SetFollowrData({
          upload: false,
          mint: 1,
          fixed: 5,
          approve: false,
          ModalType: "stripe",
          modal: true,
          func: () => {
            dispatch(
              SetFollowrData({
                upload: false,
                mint: 1,
                fixed: 0,
                approve: false,
                ModalType: "stripe",
                modal: true,
                func: () => {},
              })
            );

            dispatch(
              FiatbuyAsset(
                Owner_address,
                Contrat_type,
                Contract_addres,
                tokenId,
                instant_sale_price,
                no_of_copies,
                sale_with_serviceFEE,
                paymentAssetAddress,
                decimals,
                collectionId,
                account,
                royaltyFee,
                provider,
                signer,
                tokenURI,
                UserID,
                isEthPayment,
                CollectionDetails
              )
            );
          },
          help: stringify(errObject),
        })
      );

      await API({
        url: apiURl.ErrorData,
        method: "POST",
        body: { errordata: stringify(errObject) },
      });
    }
  };

export const CopyText = (value) => {
  navigator.clipboard.writeText(value);
  // toast(NotificationMsg.copyText, { type: 'success', toastId: '1234' });
};

// export const MultiBuyXRP =
//   (qty, Data, walletAddress, userToken, _id, id) => async (dispatch) => {
//     const forLoop = async () => {
//       for (let index = 1; index <= qty; index++) {
//         try {
//           dispatch(
//             SetBuyData({
//               modal: false,
//               checkout: false,
//               buyModal: false,
//               stripe: false,
//             })
//           );
//           dispatch(
//             SetFollowrData({
//               upload: 0,
//               mint: 2,
//               fixed: 2,
//               approve: 2,
//               ModalType: "MulBuy",
//               modal: true,
//               MulBuyXRP: { qty: qty, remainig: index },
//             })
//           );
//           // const balanceCheck = await new Promise((resolve, reject) => {
//           //   try {
//           //     setTimeout(() => {
//           //       if (
//           //         parseFloat(Balance) >
//           //         parseFloat(parseFloat(Data.sign_instant_sale_price) + 1)
//           //       ) {
//           //         resolve(true);
//           //       } else {
//           //         reject(false);
//           //       }
//           //     }, 1500);
//           //   } catch (error) {
//           //     reject(false);
//           //   }
//           // })
//           //   .then((data) => {
//           //     return data;
//           //   })
//           //   .catch((err) => {
//           //     dispatch(
//           //       SetFollowrData({
//           //         upload: 5,
//           //         mint: 2,
//           //         fixed: 2,
//           //         approve: 2,
//           //         ModalType: "MulBuy",
//           //         func: async () => {
//           //           await XummMulBuyXrp(qty, index);
//           //         },
//           //         modal: true,
//           //         MulBuyXRP: { qty: qty, remainig: index },
//           //       })
//           //     );
//           //     return err;
//           //   });

//           // if (!balanceCheck) {
//           //   break;
//           // }
//           const data = {
//             wallet_id: walletAddress,
//             Price: Data.sign_instant_sale_price,
//             UserId: _id,
//             id,
//             xumm_user_token: userToken,
//           };
//           dispatch(
//             SetFollowrData({
//               upload: 1,
//               mint: 0,
//               fixed: 2,
//               approve: 2,
//               ModalType: "MulBuy",
//               modal: true,
//               MulBuyXRP: { qty: qty, remainig: index },
//             })
//           );
//           try {
//             const brokerRes = await API({
//               url: apiURl.testxummbuy,
//               method: "POST",
//               body: data,
//             });
//             dispatch(
//               SetFollowrData({
//                 upload: 1,
//                 mint: 1,
//                 fixed: 0,
//                 approve: 2,
//                 ModalType: "MulBuy",
//                 modal: true,
//                 MulBuyXRP: { qty: qty, remainig: index },
//               })
//             );

//             try {
//               const res = await API({
//                 url: apiURl.xummTransfer,
//                 method: "POST",
//                 body: {
//                   id,
//                   wallet_id: walletAddress,
//                   Price: Data.sign_instant_sale_price,
//                   UserId: _id,
//                   active_trade_id: brokerRes?.active_trade_id,
//                 },
//               });

//               dispatch(
//                 SetFollowrData({
//                   upload: 1,
//                   mint: 1,
//                   fixed: 1,
//                   approve: 2,
//                   ModalType: "MulBuy",
//                   modal: true,
//                   MulBuyXRP: { qty: qty, remainig: index },
//                 })
//               );

//               await new Promise((resolve, reject) => {
//                 try {
//                   setTimeout(() => {
//                     resolve(true);
//                   }, 1000);
//                 } catch (error) {
//                   reject(false);
//                 }
//               })
//                 .then((data) => {
//                   dispatch(
//                     SetFollowrData({
//                       upload: 1,
//                       mint: 1,
//                       fixed: 1,
//                       approve: 2,
//                       ModalType: null,
//                       modal: false,
//                       MulBuyXRP: { qty: qty, remainig: index },
//                     })
//                   );

//                   if (index === qty) {
//                     setTimeout(() => {
//                       window.location.reload();
//                     }, 1000);
//                   }
//                   return data;
//                 })
//                 .catch((err) => {
//                   dispatch(
//                     SetFollowrData({
//                       upload: 2,
//                       mint: 2,
//                       fixed: 2,
//                       approve: 2,
//                       ModalType: null,
//                       modal: false,
//                       MulBuyXRP: {},
//                     })
//                   );
//                 });
//             } catch (error) {
//               dispatch(
//                 SetFollowrData({
//                   upload: 1,
//                   mint: 1,
//                   fixed: 5,
//                   approve: 2,
//                   ModalType: "MulBuy",
//                   func: async () => {
//                     // await buyMultiXRP(id);
//                   },
//                   modal: true,
//                   MulBuyXRP: { qty: qty, remainig: index },
//                 })
//               );
//               break;
//             }
//           } catch (error) {
//             dispatch(
//               SetFollowrData({
//                 upload: 1,
//                 mint: 5,
//                 fixed: 2,
//                 approve: 2,
//                 ModalType: "MulBuy",
//                 func: async () => {
//                   // await BuyMulXrp(data, qty, index);
//                 },
//                 modal: true,
//                 MulBuyXRP: { qty: qty, remainig: index },
//               })
//             );
//             break;
//           }
//         } catch (error) {
//           break;
//         }
//       }
//     };
//     forLoop();
//   };

// const XummMulBuyXrp = async (qty, i) => {
//   // const balanceCheck = await new Promise((resolve, reject) => {
//   //   try {
//   //     setTimeout(() => {
//   //       if (
//   //         parseFloat(Balance) >
//   //         parseFloat(parseFloat(Data.sign_instant_sale_price) + 1)
//   //       ) {
//   //         resolve(true);
//   //       } else {
//   //         reject(false);
//   //       }
//   //     }, 1500);
//   //   } catch (error) {
//   //     reject(false);
//   //   }
//   // })
//   //   .then((data) => {
//   //     return data;
//   //   })
//   //   .catch((err) => {
//   //     dispatch(
//   //       SetFollowrData({
//   //         upload: 5,
//   //         mint: 2,
//   //         fixed: 2,
//   //         approve: 2,
//   //         ModalType: "MulBuy",
//   //         func: async () => {
//   //           await XummMulBuyXrp(qty, i);
//   //         },
//   //         modal: true,
//   //         MulBuyXRP: { qty: qty, remainig: i },
//   //       })
//   //     );
//   //     return err;
//   //   });

//   // if (!balanceCheck) {
//   //   return;
//   // }
//   const data = {
//     wallet_id: walletAddress,
//     Price: Data.sign_instant_sale_price,
//     UserId: _id,
//     id,
//     xumm_user_token: userToken,
//   };
//   await BuyMulXrp(data, qty, i);
// };

// const BuyMulXrp = async (value, qty, i) => {
//   dispatch(
//     SetFollowrData({
//       upload: 1,
//       mint: 0,
//       fixed: 2,
//       approve: 2,
//       ModalType: "MulBuy",
//       modal: true,
//       MulBuyXRP: { qty: qty, remainig: i },
//     })
//   );
//   try {
//     const resp = await API({
//       url: apiURl.testxummbuy,
//       method: "POST",
//       body: value,
//     });

//     await buyMultiXRP(id, value, resp, qty, i);
//   } catch (error) {
//     dispatch(
//       SetFollowrData({
//         upload: 1,
//         mint: 5,
//         fixed: 2,
//         approve: 2,
//         ModalType: "MulBuy",
//         func: async () => {
//           await BuyMulXrp(value, qty, i);
//         },
//         modal: true,
//         MulBuyXRP: { qty: qty, remainig: i },
//       })
//     );
//     return false;
//   }
// };
// const buyMultiXRP = async (id, value, resp, qty, i) => {
//   dispatch(
//     SetFollowrData({
//       upload: 1,
//       mint: 1,
//       fixed: 0,
//       approve: 2,
//       ModalType: "MulBuy",
//       modal: true,
//       MulBuyXRP: { qty: qty, remainig: i },
//     })
//   );

//   try {
//     await API({
//       url: apiURl.xummTransfer,
//       method: "POST",
//       body: {
//         id,
//         wallet_id: value.walletAddress,
//         Price: value.sign_instant_sale_price,
//         UserId: _id,
//         active_trade_id: resp?.active_trade_id,
//       },
//     });

//     dispatch(
//       SetFollowrData({
//         upload: 1,
//         mint: 1,
//         fixed: 1,
//         approve: 2,
//         ModalType: "MulBuy",
//         modal: true,
//         MulBuyXRP: { qty: qty, remainig: i },
//       })
//     );

//     await new Promise((resolve, reject) => {
//       try {
//         setTimeout(() => {
//           resolve(true);
//         }, 1000);
//       } catch (error) {
//         reject(false);
//       }
//     })
//       .then((data) => {
//         dispatch(
//           SetFollowrData({
//             upload: 1,
//             mint: 1,
//             fixed: 1,
//             approve: 2,
//             ModalType: null,
//             modal: false,
//             MulBuyXRP: { qty: qty, remainig: i },
//           })
//         );

//         setTimeout(() => {
//           window.location.reload();
//         }, 1000);

//         return data;
//       })
//       .catch((err) => {
//         dispatch(
//           SetFollowrData({
//             upload: 2,
//             mint: 2,
//             fixed: 2,
//             approve: 2,
//             ModalType: null,
//             modal: false,
//             MulBuyXRP: {},
//           })
//         );
//       });
//   } catch (error) {
//     dispatch(
//       SetFollowrData({
//         upload: 1,
//         mint: 1,
//         fixed: 5,
//         approve: 2,
//         ModalType: "MulBuy",
//         func: async () => {
//           await buyMultiXRP(id, value, resp, qty, i);
//         },
//         modal: true,
//         MulBuyXRP: { qty: qty, remainig: i },
//       })
//     );
//     return false;
//   }
// };

export const offerSign =
  (
    assetAddress,
    tokenId,
    qty = 1,
    amount,
    payingTokenAddress,
    decimals = 18,
    collectionId,
    bidPayAmt,
    account,
    signer,
    user_id
  ) =>
  async (dispatch) => {
    const amountInDec = roundNumber(mulBy(amount, 10 ** decimals), 0);

    // var nonce_value = await getNonceValue(collectionId);

    const nonce_value = await API({
      url: `${apiURl.ContractNonce}/${collectionId}`,
      method: "GET",
    }).then((data) => data.data);

    const NonceValue = nonce_value.allnonce.Contract_sign_nonce;

    if (payingTokenAddress === null || payingTokenAddress === undefined) {
      payingTokenAddress =
        process.env.REACT_APP_CONTRACT_ADDRESS_WETH_ADDRESS || "";
    }
    if (decimals === null || decimals === undefined) {
      decimals = 18;
    }

    let messageHash = ethers.utils.solidityKeccak256(
      ["address", "uint256", "address", "uint256", "uint256", "uint256"],
      [assetAddress, tokenId, payingTokenAddress, amountInDec, qty, NonceValue]
    );

    messageHash = ethers.utils.arrayify(messageHash);

    const signature = await signer.signMessage(messageHash);

    // user_id,
    //     collection_id,
    //     owner_id,
    //     amount,
    //     erc20_token_id,
    //     sign,
    //     amount_with_fee,
    //     quantity,

    return await placeBid({
      user_id: user_id,
      sign: signature,
      collection_id: collectionId,
      asset_address: assetAddress,
      token_id: tokenId,
      quantity: qty,
      amount: bidPayAmt,
      amount_with_fee: amount,
      payment_token_address: payingTokenAddress,
      payment_token_decimals: decimals,
    });
    // await save_NonceValue(collectionId, signature, nonce_value)
    // return window.bidSignSuccess(collectionId)
  };

export const placeBid = async (body) => {
  return await API({ url: apiURl.Bid, body: body, method: "POST" }).then(
    (data) => data
  );
};

export const converToWeth =
  (
    amount,
    offerAmmount,
    account,
    provider,
    signer,
    assetAddress,
    token,
    collectionId,
    User_id,
    qty,
    decimals = 18
  ) =>
  async (dispatch) => {
    try {
      dispatch(
        SetFollowrData({
          upload: 0,
          mint: 2,
          fixed: 2,
          approve: false,
          ModalType: "OFFER",
          modal: true,
        })
      );
      const web3 = new Web3(provider);

      let newAmount = roundNumber(mulBy(amount, 10 ** decimals), 0);

      let contract = await fetchContract(
        process.env.REACT_APP_CONTRACT_ADDRESS_WETH_ADDRESS,
        "erc20",
        provider,
        signer
      );

      let receipt = await contract.deposit({ from: account, value: newAmount });

      receipt = await receipt.wait();
      dispatch(
        SetFollowrData({
          upload: 1,
          mint: 0,
          fixed: 2,
          approve: false,
          ModalType: "OFFER",
          modal: true,
        })
      );
      const balance = await contract.allowance(
        account,
        process.env.REACT_APP_TRANSFERPROXYCONTRACTADDRESS
      );

      newAmount = (parseInt(balance) + parseInt(newAmount)).toString();

      receipt = await contract.approve(
        process.env.REACT_APP_TRANSFERPROXYCONTRACTADDRESS,
        newAmount,
        {
          from: account,
        }
      );

      receipt = await receipt.wait();

      dispatch(
        SetFollowrData({
          upload: 1,
          mint: 1,
          fixed: 0,
          approve: false,
          ModalType: "OFFER",
          modal: true,
        })
      );

      let amountInDec = roundNumber(mulBy(amount, 10 ** decimals), 0);

      const nonce_value = await API({
        url: `${apiURl.ContractNonce}/${collectionId}`,
        method: "GET",
      }).then((data) => data.data);

      const NonceValue = nonce_value.allnonce.Contract_sign_nonce;

      let messageHash = web3.utils.soliditySha3(
        { type: "address", value: assetAddress }, // Contract Address
        { type: "uint256", value: token }, // TokenID
        {
          type: "address",
          value: process.env.REACT_APP_CONTRACT_ADDRESS_WETH_ADDRESS,
        }, // Payment address (WETH)
        { type: "uint", value: amountInDec }, //amount
        { type: "uint", value: qty }, // qty
        { type: "uint256", value: NonceValue } // Nonce
      );

      messageHash = ethers.utils.arrayify(messageHash);

      let signature = await signer.signMessage(messageHash);
      dispatch(
        SetFollowrData({
          upload: 1,
          mint: 1,
          fixed: 1,
          approve: false,
          ModalType: "OFFER",
          modal: true,
        })
      );
      // return;
      await placeBid({
        user_id: User_id,
        sign: signature,
        collection_id: collectionId,
        asset_address: assetAddress,
        token_id: receipt.transaction_id,
        quantity: qty,
        buyer_address: account,
        amount: offerAmmount,
        amount_with_fee: amount,
        payment_token_address: "",
        payment_token_decimals: "",
      });
      dispatch(
        SetFollowrData({
          upload: 1,
          mint: 1,
          fixed: 1,
          approve: false,
          ModalType: "OFFER",
          modal: false,
        })
      );
      return;
    } catch (error) {}
  };

export const allChainsIDS = { ...ChainIDS, XUMM: 999999999 };
