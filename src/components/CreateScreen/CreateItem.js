import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { nftType, royality } from "../../constant/create-from.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Select, { components } from "react-select";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useWeb3 } from "@3rdweb/hooks";
import {
  Accordion,
  Button,
  Card,
  Form,
  InputGroup,
  Modal,
} from "react-bootstrap";

const propertiesValues = { type: "", name: "" };

const InputOption = ({
  getStyles,
  Icon,
  isDisabled,
  isFocused,
  isSelected,
  children,
  innerProps,
  ...rest
}) => {
  const [isActive, setIsActive] = useState(false);
  const onMouseDown = () => setIsActive(true);
  const onMouseUp = () => setIsActive(false);
  const onMouseLeave = () => setIsActive(false);

  // styles
  let bg = "transparent";
  if (isFocused) bg = "#eee";
  if (isActive) bg = "#B2D4FF";

  const style = {
    alignItems: "center",
    backgroundColor: bg,
    color: "inherit",
    display: "flex ",
  };

  // prop assignment
  const props = {
    ...innerProps,
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    style,
  };

  return (
    <components.Option
      {...rest}
      isDisabled={isDisabled}
      isFocused={isFocused}
      isSelected={isSelected}
      getStyles={getStyles}
      innerProps={props}
    >
      <span className="p-1">
        <input type="checkbox" checked={isSelected} /> {children}
      </span>
    </components.Option>
  );
};

export default function CreateItem({
  handleChange,
  fill,
  tt,
  HandleSubmit,
  Errors,
  ...prop
}) {
  const { title } = useParams();

  const { Category, CreatorCategory } = useSelector((state) => state.Slider);
  const { address } = useWeb3();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const [Properties, setProperties] = useState([propertiesValues]);

  const AddrowProp = () => {
    setProperties((prev) => [...prev, propertiesValues]);
  };
  console.log(fill, "fill");
  const deleteRow = (e) => (index) => {
    e.preventDefault();
    let DummyProperties = [...Properties];
    if (DummyProperties.length > 1) {
      DummyProperties.splice(index, 1);
      setProperties(DummyProperties);
    }
  };

  const handleShow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShow(true);
  };

  const handleChangeMulti = (val) => {
    handleChange(
      { target: { name: "categorydetails" } },
      val.map((item) => item.value)
    );
  };

  const propertiesSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let formProperties = [];
    formData.forEach((value, name) => {
      let keyValue = name.split("-");

      formProperties[+(keyValue[0] || "0")] = {
        ...(formProperties[+(keyValue[0] || "0")] || {}),
      };
      formProperties[+(keyValue[0] || "0")][keyValue[1]] = value;
    });

    handleChange(
      null,
      formProperties.filter((item) => item.trait_type && item.value),
      "Properties"
    );
    setProperties(
      formProperties.filter((item) => item.trait_type && item.value)
    );
    handleClose();
  };
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };
  console.log(Errors, "error");
  return (
    <>
      <div className="col-md-6">
        <form className="form-section CreateForm" onSubmit={HandleSubmit}>
          <p className="">{`Create ${
            title == "One" ? "1/1" : "Edition"
          } Item`}</p>
          <div className="form-section-b"></div>
          <p className="p-2">{"NFT Details"}</p>
          <div className="form-div">
            <label htmlFor="name">{"Name"}</label>
            <input
              type="text"
              id="name"
              name="nftname"
              value={fill.nftname}
              onChange={handleChange}
              placeholder={"Enter Name"}
            />
            <span className={"text-danger small"}>{Errors?.name || ""}</span>
          </div>
          <div className="form-div mb-3">
            <label htmlFor="">{"Categories"}</label>
            <Select
              name="categorydetails"
              isMulti
              components={{
                Option: InputOption,
              }}
              classNamePrefix="categorydetails"
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              placeholder={`Choose Categories ...`}
              options={
                Category?.length
                  ? Category?.map((item, index) => ({
                      value: item._id,
                      label: item.Categoryname || "Dummy",
                    }))
                  : []
              }
              onChange={handleChangeMulti}
            />
            <span className={"text-danger small"}>
              {Errors?.categorydetails || ""}
            </span>
            {/* <select id="" name="category" defaultValue={fill.category} onChange={handleChange}>
              <option value="frontend_developer">
                {"Select Categories"}
              </option>
              {Category && Category.map((item, index) => <option key={index} value={item._id}>{item.Categoryname}</option>)}
            </select> */}
          </div>
          <div className="form-div mb-3">
            <label htmlFor="">{"Creator Categories (Optional)"}</label>
            <Select
              name="creatorCategory"
              isMulti
              classNamePrefix="creatorCategory"
              placeholder={`Choose Creators Categories…`}
              components={{
                Option: InputOption,
              }}
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              options={
                CreatorCategory?.length
                  ? CreatorCategory?.map((item, index) => ({
                      value: item._id,
                      label: item.Creatorname || "Dummy",
                    }))
                  : []
              }
              onChange={(val) =>
                handleChange(
                  { target: { name: "creatorCategory" } },
                  val.map((item) => item.value)
                )
              }
            />
            {/* <select id="" name="category" defaultValue={fill.category} onChange={handleChange}>
              <option value="frontend_developer">
                {"Select Categories"}
              </option>
              {Category && Category.map((item, index) => <option key={index} value={item._id}>{item.Categoryname}</option>)}
            </select> */}
          </div>
          <div className="form-div">
            <label htmlFor="bio">{"Description"}</label>
            <textarea
              id="bio"
              name="description"
              placeholder={
                "e. g. 'Music cover art for My Single , Artist Name , Date, Art making process etc...'"
              }
              onChange={handleChange}
              defaultValue={""}
              value={fill.description}
            />
            <span className={"text-danger small"}>
              {Errors?.description || ""}
            </span>
          </div>
          <div className="form-div mb-4">
            <label>{"Properties"}</label>
            <Accordion flush className="position-relative propertyAccod">
              <Accordion.Item eventKey="0">
                <Accordion.Header className="rounded-4">
                  Properties{" "}
                  <Button
                    onClick={handleShow}
                    className="mx-3 btn btn-sm btn-light border border-2 float-right"
                  >
                    Add
                  </Button>
                </Accordion.Header>
                <Accordion.Body>
                  <div className="row">
                    {fill.Properties.length
                      ? fill.Properties.map((listItem) => (
                          <div className="col-sm-3">
                            <Card>
                              <Card.Body>
                                <Card.Title className="text-primary text-sm">
                                  <small title={listItem.trait_type}>
                                    {listItem.trait_type.length < 5
                                      ? listItem.trait_type
                                      : listItem.trait_type.slice(0, 5) + "..."}
                                  </small>
                                </Card.Title>
                                <Card.Text>
                                  <p title={listItem.value}>
                                    {listItem.value.length < 5
                                      ? listItem.value
                                      : listItem.value.slice(0, 5) + "..."}
                                  </p>
                                </Card.Text>
                              </Card.Body>
                            </Card>
                          </div>
                        ))
                      : null}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>

          <div className="form-div">
            <div className="max" style={{ zIndex: "1" }}>
              {`Maximum ${royality}%`}
            </div>
            <label htmlFor="name">{"Creator Royalty"}</label>
            <input
              type="text"
              min={0}
              id="name"
              onChange={(e) => {
                const re = /^[0-9]*$/;
                if (
                  /^0/.test(e.target.value[0]) &&
                  /^0/.test(e.target.value[1])
                ) {
                  e.target.value =
                    e.target.value[0] + e.target.value[1].replace(/^0/, "");
                }
                if (e.target.value === "" || re.test(e.target.value)) {
                  e.target.value <= royality &&
                    handleChange(null, e.target.value, "royality");
                }
              }}
              value={fill.royality}
              max={royality}
              name="royality"
              placeholder={"0%"}
            />
            <span className={"text-danger small"}>{Errors?.royalty || ""}</span>
          </div>
          {title == "Multiple" && (
            <div className="form-div">
              <label htmlFor="name">{"No of Copies"}</label>
              <input
                type="text"
                id="name"
                onChange={(e) => {
                  const re = /^([0-9]|[1-9][0-9]*)$/;
                  if (e.target.value === "" || re.test(e.target.value)) {
                    handleChange(null, e.target.value, "no_of_copies");
                  }
                }}
                value={fill.no_of_copies}
                name="no_of_copies"
                placeholder={"0"}
              />
              <span className={"text-danger small"}>
                {Errors?.no_of_copies || ""}
              </span>
            </div>
          )}
          <div className="tab-wrap">
            <input
              type="radio"
              id="tab1"
              name="nft_type"
              onChange={handleChange}
              defaultChecked={true}
              className="tab"
              value={nftType.fixed}
            />
            <label htmlFor="tab1">
              {" "}
              <figure>
                <img src="/images/price-tag.svg" alt="" />
              </figure>
              <p>{"Fixed Price"}</p>
            </label>
            <input
              type="radio"
              id="tab2"
              name="nft_type"
              onChange={handleChange}
              className="tab"
              value={nftType.openBid}
            />
            <label htmlFor="tab2">
              <figure>
                <img src="/images/bid.svg" alt="" />
              </figure>
              <p>{"Open for bids"}</p>
            </label>
            <input
              type="radio"
              id="tab3"
              name="nft_type"
              onChange={handleChange}
              className="tab"
              value={nftType.timeAuction}
            />
            <label htmlFor="tab3">
              {" "}
              <figure>
                <img src="/images/auction-count.svg" alt="" />
              </figure>
              <p>{"Timed Auction"}</p>
            </label>
          </div>
          <div className="">
            {String(fill.nft_type) == nftType.fixed && (
              <>
                <div className="form-div">
                  <div className="row">
                    <div className="col-sm-6">
                      <label htmlFor="name">{"From"}</label>
                      <DatePicker
                        minDate={new Date()}
                        selected={fill.Time_from}
                        showTimeSelect={true}
                        onChange={(date) =>
                          handleChange(null, date, "Time_from")
                        }
                        filterTime={filterPassedTime}
                        dateFormat="MMM d, yyyy h:mm aa"
                        isClearable
                        timeIntervals={1}
                      />
                      <span className={"text-danger small"}>
                        {Errors?.Time_from || ""}
                      </span>
                    </div>
                    <div className="col-sm-6">
                      <label htmlFor="name">{"To"}</label>
                      <DatePicker
                        minDate={new Date(fill.Time_from)}
                        selected={fill.Time_to}
                        showTimeSelect={true}
                        onChange={(date) => handleChange(null, date, "Time_to")}
                        filterTime={filterPassedTime}
                        dateFormat="MMM d, yyyy h:mm aa"
                        disabled={!fill.Time_from}
                        isClearable
                        timeIntervals={1}
                      />
                      <span className={"text-danger small"}>
                        {Errors?.Time_to || ""}
                      </span>
                      {/* {fill.Time_to ? (
                        <div
                          className="max"
                          style={{
                            maxWidth: 40,
                            top: 55,
                            color: "#98999D",
                            cursor: "pointer",
                          }}
                          onClick={() => handleChange(null, null, "Time_to")}
                        >
                          <i className="fa fa-times" />
                        </div>
                      ) : null} */}
                    </div>
                  </div>
                </div>
                <div className="form-div">
                  <label htmlFor="name">{"Price"}</label>

                  <div className="max" style={{ maxWidth: 36, top: 46 }}>
                    {address ? "ETH" : "XRP"}
                  </div>

                  <input
                    type="text"
                    id="name"
                    name="price"
                    value={fill.price}
                    onChange={(e) => {
                      // const re = /^[0-9\b]+$/;
                      const re = /^[0-9]{0,5}\.?[0-9]{0,5}$/;
                      if (
                        /^0/.test(e.target.value[0]) &&
                        /^0/.test(e.target.value[1])
                      ) {
                        e.target.value =
                          e.target.value[0] +
                          e.target.value[1].replace(/^0/, "");
                      }
                      if (e.target.value === "" || re.test(e.target.value)) {
                        handleChange(e);
                      }
                      // if (e.target.value === '' || re.test(e.target.value)) {
                      // }
                    }}
                    placeholder={"Price"}
                  />
                  <span className={"text-danger small"}>
                    {Errors?.price || ""}
                  </span>
                </div>
                <div className="form-div">
                  <div className="max" style={{ maxWidth: 36, top: 20 }}>
                    {"2.5%"}
                  </div>
                  <input
                    type="text"
                    id="name"
                    disabled={true}
                    name="servicefee"
                    value={fill.servicefee}
                    onChange={handleChange}
                    placeholder={"Service Fee"}
                  />
                </div>
              </>
            )}
            {String(fill.nft_type) == nftType.openBid && null}
            {String(fill.nft_type) == nftType.timeAuction && (
              <div className="form-div">
                <label htmlFor="name">{"Timed Auction"}</label>
                <input
                  type="text"
                  id="name"
                  name="user_name"
                  placeholder={"Enter Name"}
                />
                <input
                  type="text"
                  id="name"
                  name="user_name"
                  placeholder={"Enter Name"}
                />
              </div>
            )}
          </div>
          {/* <div className="container-fluid">
            <div className="show-items-div" style={{ marginBottom: 50 }}>
              <a href="#" >
                <div className="show-items">
                  <img src="/images/plus-icon.svg" alt="" />
                  <p>{"Create"}</p>
                </div>
              </a>
              <a href="#">
                <div className="show-items show-items-active">
                  <img src="/images/ct-icon.svg" alt="" alt="" />
                  <p>{"CrossTower"}</p>
                </div>
              </a>
            </div>
          </div> */}

          <div className="mt-4">
            <div className="fiat_payment">
              <div className="check-div">
                <label>
                  {"Allow Fiat Payment"}
                  <br />
                  <span>{"Allow buyers to pay the amount in fiat"}</span>
                </label>

                <label className="switch" style={{ float: "right" }}>
                  <input
                    type="checkbox"
                    name="is_fiat"
                    value={1}
                    defaultChecked={fill.is_fiat}
                    onChange={handleChange}
                  />
                  <span className="slider round" />
                </label>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="fiat_payment">
              <div className="check-div">
                <label>
                  {"Allow Burn"}
                  <br />
                  <span>{"Allow buyers to Burn"}</span>
                </label>

                <label className="switch" style={{ float: "right" }}>
                  <input
                    type="checkbox"
                    name="Is_burnable"
                    value={true}
                    defaultChecked={fill.Is_burnable}
                    onChange={handleChange}
                  />
                  <span className="slider round" />
                </label>
              </div>
            </div>
          </div>

          <div className="create-button-div">
            <button type="submit">{"Create"}</button>
          </div>
        </form>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Properties</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container-fluid">
              <form onSubmit={propertiesSubmit}>
                <div className="row">
                  <div
                    className="col-sm-12"
                    style={{ height: "500px", overflowY: "scroll" }}
                  >
                    <table>
                      <thead>
                        <tr style={{ border: "none" }}>
                          <th align="center">Properties</th>
                          <th align="center">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Properties.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <div className="p-1">
                                <InputGroup className="mb-3">
                                  <Button
                                    variant="outline-secondary"
                                    id="button-addon1"
                                    onClick={(e) => {
                                      deleteRow(e)(index);
                                    }}
                                  >
                                    X
                                  </Button>
                                  <Form.Control
                                    placeholder="Type"
                                    defaultValue={item.trait_type}
                                    aria-label="Example text with button addon"
                                    aria-describedby="basic-addon1"
                                    name={`${index}-trait_type`}
                                  />
                                </InputGroup>
                              </div>
                            </td>
                            <td>
                              <div className="p-1">
                                <InputGroup className="mb-3">
                                  <Form.Control
                                    placeholder="Name"
                                    defaultValue={item.value}
                                    aria-label="Example text with button addon"
                                    aria-describedby="basic-addon1"
                                    name={`${index}-value`}
                                  />
                                </InputGroup>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td>
                            <Button
                              onClick={AddrowProp}
                              variant=""
                              className="formbold-browse"
                            >
                              Add Row
                            </Button>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
                <div className="d-grid">
                  <Button type="submit" variant="" className="formbold-browse">
                    Save
                  </Button>
                </div>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}
