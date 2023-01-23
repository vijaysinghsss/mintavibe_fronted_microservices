import React, { useEffect, useState } from "react";
import CreateItem from "./CreateItem";
import Upload from "./Upload";
import { useNavigate, useParams } from "react-router-dom";
import { useWeb3 } from "@3rdweb/hooks";
import { useDispatch, useSelector } from "react-redux";
import { allChainsIDS, approveNFT } from "../../store/actions/extra-function";
import { createFormValidation, nftType } from "../../constant/create-from";
import { toast } from "react-toastify";
import { API } from "../../apiwrapper";
import apiURl, { NotificationMsg } from "../../store/actions/api-url";
import { SetFollowrData } from "../../store/reducer";
import Follow from "../PopUp/Follow";
import moment from "moment";

export default function FormPage() {

  const { address, provider, chainId } = useWeb3();

  const { signer, _id, type } = useSelector((state) => state.User.data);

  const { userToken = false, walletAddress } = useSelector((state) => state.User.xumm);
  const { id: User_Id = false } = useSelector((state) => state.authUser.loginUserData);

  const { title } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [inputForm, setFormInput] = useState({
    nftname: "",
    categorydetails: [],
    creatorCategory: [],
    description: '',
    royality: '',
    price: '',
    is_eth_payment: true,
    put_on_sale: false,
    nft_type: nftType.fixed,
    image: null,
    coverImage: null,
    collection_type: (title == 'One' ? true : false),
    is_fiat: false,
    no_of_copies: '',
    Time_from: new Date(),
    Time_to: null,
    Properties: [],
    Is_burnable: false,
    mediaType: 'image'
  });

  const [Errors, setErrors] = useState({});

  const handleChange = (e, val = null, name = false) => {
    if (name) {
      console.log('name', name, val);
      setFormInput((prev) => ({ ...prev, [name]: val }))
      return;
    }

    if (['creatorCategory', 'categorydetails'].includes(e.target.name)) {
      setFormInput((prev) => ({ ...prev, [e.target.name]: val }))
      return;
    }

    if (e.target.name == 'minting') {
      setFormInput((prev) => ({ ...prev, [e.target.name]: !inputForm[e.target.name] }))
      return
    }

    setFormInput((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    // gasPrice();
  }

  const fileSelect = (object) => setFormInput((prev) => ({ ...prev, [object.name]: object.value }))

  const handleSubmit = async (e) => {

    e.preventDefault();

    let { Properties, ...rest } = inputForm;

    let forsubmitData = { ...rest };

    if (forsubmitData.collection_type) {
      forsubmitData.no_of_copies = 1;
    }

    if (forsubmitData.nft_type == nftType.openBid) {
      forsubmitData.price = 0.001;
    }

    try {
      createFormValidation(forsubmitData)
    } catch (error) {

      setErrors(error);
      // Object.values(error).map((item) => toast.error(item, { type: 'error' }))
      return;
    }

    let formSubmit = new FormData();

    // forsubmitData.Properties = inputForm.Properties.length ? JSON.stringify(inputForm.Properties) : [];
    // console.log('forsubmitData', forsubmitData, Array.isArray(forsubmitData.Properties));
    // return;

    for (let key in forsubmitData) {
      if (Array.isArray(inputForm[key])) {
        let DataKey = key;
        if (inputForm[key].length) {
          inputForm[key].forEach((value) => formSubmit.append(`${DataKey}[]`, value));
        } else {
          formSubmit.append(key, '')
        }
      } else {
        formSubmit.append(key, inputForm[key]);
      }
    }
    formSubmit.append('Properties', Properties.length ? JSON.stringify(Properties) : [])

    if (forsubmitData['coverImage']) {
    } else {
      formSubmit.append(`coverImage`, forsubmitData['image'])
    }

    // return;
    formSubmit.append('walletType', chainId || allChainsIDS["XUMM"]);

    formSubmit.append('owner_id', User_Id);

    if (chainId) {
      if (!['Multiple', 'One'].includes(title)) {
        toast(NotificationMsg.SelectNftType, { type: "error" });
        return;
      }
      formSubmit.append('wallet_id', address || false);
    } else {
      formSubmit.append('wallet_id', walletAddress || false);
      formSubmit.append('xumm_user_token', userToken);
    }

    try {

      dispatch(SetFollowrData({
        upload: 0,
        approve: 2,
        mint: 2,
        fixed: 2,
        modal: true
      }));

      await API({ url: '/pinatadata', formData: true, method: 'POST', body: formSubmit }).then(async (data) => {
        let dataResult = false
        if (data.success) {
          // toast(NotificationMsg.ipfs, { type: "success" });
          dispatch(SetFollowrData({
            upload: 1,
            approve: 2,
            mint: 0,
            fixed: 2,
            modal: true
          }));
          // console.log('data', data);
          // return;
          if (chainId) {
            dataResult = await dispatch(approveNFT(
              data.Data, // NFT Submit api
              {  // Contract Detail 
                contractType: (title == 'Multiple' ? `nft1155` : `nft721`),
                contractAddress: title == 'Multiple' ? process.env.REACT_APP_CONTRACT_ADDRESS_ERC1155 : process.env.REACT_APP_CONTRACT_ADDRESS_ERC721,
                sharedCollection: true
              },
              { signer, provider, address, chainId }, // user Signature
              navigate
            ))

          } else {
            console.log('data', data.Data);
            const { collection_type } = data.Data;
            if (collection_type) {
              dataResult = await xummWalletSign(data.Data);
            } else {
              dataResult = await xummSetMinter(data.Data);
            }
          }

          return { result: data.Data, success: dataResult };
        } else {
          toast(data.message, { type: "error" });
        }
      });



    } catch (error) {

      dispatch(SetFollowrData({
        upload: 5,
        approve: 2,
        mint: 2,
        fixed: 2,
        modal: true
      }));
      console.log('errorCheck', { ...error });
      toast(NotificationMsg.error, { type: "error" });

    }

  }


  useEffect(() => {


    return () => {
      dispatch(SetFollowrData({ upload: 0, mint: 0, fixed: 0, approve: 0, modal: false }));
    }
  }, [])

  const xummSetMinter = async (parms) => {
    const { randomValue, metadataCID, Properties, no_of_copies, Is_burnable, Royality } = parms;

    await API({ url: '/setMinter', method: 'POST', body: { xumm_user_token: userToken, wallet_id: walletAddress, } }).then(async (data) => {
      if (data.is_AccountSet) {
        dispatch(SetFollowrData({
          upload: 1,
          mint: 1,
          fixed: 0,
          approve: 2,
          modal: true
        }));

        await API({
          url: '/batchMint', method: 'POST', body: {
            xumm_user_token: userToken,
            wallet_id: walletAddress,
            ipfs_url: metadataCID,
            memo_details: JSON.stringify(Properties),
            nftokenCount: parseInt(no_of_copies),
            taxon: randomValue,
            Is_burnable: Is_burnable,
            transfer_fee: Royality
          }
        }).then((data) => {
          if (data.transcation) {
            dispatch(SetFollowrData({
              upload: 1,
              mint: 1,
              fixed: 0,
              approve: 2,
              modal: true
            }));

            // sellOffer(data.transcation, { token: '', transaction_hash: data.transcation, id: NFTid });
          }
        });

        // sellOffer(data.transcation, { token: '', transaction_hash: data.transcation, id: NFTid });
      }
    });

  }

  const xummWalletSign = async (parms) => {
    const { metadataCID, _id: NFTid, Royality } = parms;
    // metaData, NFTid, Royality
    if (!NFTid) {
      console.log('no record found');
    }
    try {

      await API({ url: '/xumm-sign', method: 'POST', body: { xumm_user_token: userToken, walletAddress: walletAddress, metaData: metadataCID, Royality } }).then((data) => {
        if (data.transcation) {
          dispatch(SetFollowrData({
            upload: 1,
            mint: 1,
            fixed: 0,
            approve: 2,
            modal: true
          }));

          sellOffer(data.transcation, { token: '', transaction_hash: data.transcation, id: NFTid });
        }
      });
    } catch (error) {
      dispatch(SetFollowrData({
        upload: 1,
        mint: 5,
        fixed: 0,
        approve: 2,
        func: () => {
          xummWalletSign(parms)
        },
        modal: true
      }));

    }
  }

  const nftUpdate = async (id, body) => {

    await API({ url: apiURl.Nft + `/${id}`, method: 'PUT', body }).then((data) => {
      dispatch(SetFollowrData({
        upload: 1,
        mint: 1,
        fixed: 1,
        approve: 1,
        modal: true
      }));
      // toast(NotificationMsg.mint, { type: "success" });
    });

    dispatch(SetFollowrData({
      upload: 1,
      mint: 1,
      fixed: 1,
      approve: 1,
      modal: false
    }));

    navigate(`/collections/${id}`);


  }

  const sellOffer = async (tx, nftDataUpdate) => {
    try {
      await API({ url: apiURl.SellBroker, method: 'POST', body: { transaction_hash: tx, wallet_id: walletAddress, xumm_user_token: userToken } }).then((data) => {

        dispatch(SetFollowrData({
          upload: 1,
          mint: 1,
          fixed: 1,
          approve: 0,
          modal: true
        }));

        nftUpdate(nftDataUpdate.id, { ...nftDataUpdate, sell_offer_index: data.sell_offer_index, NFTokenID: data.NFTokenID })
      });
    } catch (error) {
      dispatch(SetFollowrData({
        upload: 1,
        mint: 1,
        fixed: 5,
        approve: 2,
        func: () => {
          sellOffer(tx, nftDataUpdate)
        },
        modal: true
      }));
    }

  }

  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <Upload setData={fileSelect} Errors={Errors} />
          <CreateItem HandleSubmit={handleSubmit} fill={inputForm} tt={title} handleChange={handleChange} Errors={Errors} />
          <Follow />
        </div>
      </div>
    </>
  );
}
