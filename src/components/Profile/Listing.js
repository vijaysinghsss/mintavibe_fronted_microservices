import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { submitTranscation } from "../../store/actions/extra-function";

const Listing = ({ data = [], owner, FetchData }) => {
  const { id } = useParams();
  const { _id = "", type } = useSelector((state) => state.User.data);

  const dispatch = useDispatch();

  const CancelSaleListing = async (Listing_id) => {
    const Listing = data.map((item) => {
      if (item._id == Listing_id) {
        item.Status = false;
      }

      return item;
    });
    const count = Listing.reduce((value, item) => {
      return value + (item.Status ? parseInt(item.AvailableQuantity) : 0);
    }, 0);

    await dispatch(
      submitTranscation(id, {
        Listing,
        available_copies: count,
        put_on_sale: count < 1 ? false : true,
      })
    );

    await FetchData();
  };
  console.log(owner, "owner");
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <table>
              <thead>
                <tr>
                  {/* <th>Unit Price</th>
                        <th>$ Unit Price</th> */}
                  <th>Quantity</th>
                  <th>Avl. Qty</th>
                  {/* <th>Expiration</th> */}
                  <th>From</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data
                  .filter((item) => item.Status)
                  .map((item) => {
                    return (
                      <tr key={item._id}>
                        {/* <td>{item.UnitPrice}</td>
                            <td>{item.UnitPrice}</td> */}
                        <td>{item.Quantity}</td>
                        <td>{item.AvailableQuantity || 0}</td>
                        {/* <td>{item.Expire_time}</td> */}
                        <td className="small" title={item.From_owner_id || ""}>
                          {owner?._id === item?.From_owner_id
                            ? owner?.Name
                            : (item.From_owner_id || "").slice(0, 4) +
                                "..." +
                                (item.From_owner_id || "").slice(-4) || ""}
                        </td>
                        <td>
                          {owner._id == _id ? (
                            <button
                              className="btn btn-sm btn-dark"
                              onClick={(e) => {
                                e.preventDefault();
                                CancelSaleListing(item._id);
                              }}
                            >
                              Cancel
                            </button>
                          ) : null}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listing;
