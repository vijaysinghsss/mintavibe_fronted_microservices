import { useWeb3 } from "@3rdweb/hooks";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { API } from "../../apiwrapper";
import { apiURl } from "../../store/actions";
import { NotificationMsg } from "../../store/actions/api-url";
import { gasPrice } from "../../store/actions/extra-function";

function Bids({ data, FetchData, Owner, AcceptOffer }) {
  const { _id = '', type } = useSelector((state) => state.User.data);
  const { address } = useWeb3();

  const CancelSaleListing = async (Bidding_id) => {

    try {
      const result = await API({ url: `${apiURl.Bid}/${Bidding_id}`, method: 'PUT', body: { Is_active: false } }).then(data => data);
      // toast(NotificationMsg.offerCancel, { type: "success" })
      console.log('result', result);
    } catch (error) {
      toast(error, { type: "error" })
      console.log('error', error);
    }

    await FetchData()
  }

  return (
    <div className="top-profile">
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-sm-12'>
            <table>
              <thead>
                <tr>
                  <th>Unit Price</th>
                  <th>Qty.</th>
                  <th>From</th>
                  <th>Time</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.filter((item) => item.Is_active).sort().map((item) => {
                  return (
                    <tr key={item._id}>
                      <td className="small">{parseFloat(item.Amount).toFixed(5)} <span style={{ fontSize: '9px' }}><small>Approx</small></span></td>
                      <td className="small">{item.Quantity}</td>
                      <td className="small" title={item.buyer_address}>{(item.buyer_address?.slice(0, 4) + '...' + item.buyer_address?.slice(-4)) || ''}</td>
                      <td className="small">{moment(item.UpdatedAt).fromNow()}</td>
                      <td className="small">
                        {(item?.User_Id?._id || '') == _id ? <button className='btn btn-sm btn-dark' onClick={(e) => { e.preventDefault(); CancelSaleListing(item._id); }}>Cancel</button> : null}
                        {
                          Owner && Owner._id == _id
                            ?
                            <button className='btn btn-sm btn-dark' onClick={(e) => { e.preventDefault(); AcceptOffer(item); }}>
                              Accept
                            </button>
                            :
                            null
                        }
                      </td>

                      {/* <td>{item.Expire_time}</td> */}

                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bids;
