import React, { useState } from "react";
import { toast } from "react-toastify";
import { API } from "../../apiwrapper";
import DragDrop from "../../pages/DragDrop";
import { apiURl } from "../../store/actions";
import {
  isValid,
  validateEmail,
  validateEnquiryType,
  validateFirstName,
  validateLastName,
  validateMobile,
  validateQueryMessage,
} from "../../Validation/InputValidation";

function ContactUs() {
  const [inpData, setInpData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    contact: "",
    enquirytype: "",
    querymessage: "",
    image: "",
  });
  const {
    firstname = "",
    lastname = "",
    email = "",
    contact = "",
    enquirytype = "",
    querymessage = "",
    image = "",
  } = inpData;
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setInpData({ ...inpData, [e.target.name]: e.target.value });
    handleValidate(e);
  };
  const handleValidate = (e) => {
    const errors1 = {};
    switch (e.target.name) {
      case "firstname":
        errors1.firstname = validateFirstName(e.target.value);
        break;
      case "lastname":
        errors1.lastname = validateLastName(e.target.value);
        break;
      case "email":
        errors1.email = validateEmail(e.target.value);
        break;
      case "contact":
        errors1.contact = validateMobile(e.target.value);
        break;
      case "enquirytype":
        errors1.enquirytype = validateEnquiryType(e.target.value);
        break;
      case "querymessage":
        errors1.querymessage = validateQueryMessage(e.target.value);
        break;
      default:
        break;
    }
    setErrors(errors1);
  };
  const validateAll = () => {
    let err1 = {};
    err1.firstname = validateFirstName(firstname);
    err1.lastname = validateLastName(lastname);
    err1.email = validateEmail(email);
    err1.contact = validateMobile(contact);
    err1.enquirytype = validateEnquiryType(enquirytype);
    err1.querymessage = validateQueryMessage(querymessage);
    return err1;
  };
  const handleFileChange = (file) => {
    console.log(file," multiple={true}")
    setInpData({ ...inpData, image: file });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let err = validateAll();
      if (isValid(err)) {
        let fd = new FormData();
        Object.keys(inpData).map((elt) => fd.append(elt, inpData.elt));
        await API({
          url: apiURl.contactus,
          method: "POST",
          body: fd,
          formData: true,
        }).then((data) => {
          if (data?.status || data?.status === "true") {
            // toast(`${data?.message}`, { type: "success" });
            setInpData({
              firstname: "",
              lastname: "",
              email: "",
              contact: "",
              enquirytype: "",
              querymessage: "",
            });
          } else {
            toast.warn(`${data?.message}`);
          }
        });
      } else {
        setErrors(err);
      }
    } catch (error) {
      toast(error, { type: "error" });
    }
  };
  console.log(inpData);
  return (
    <>
      <section className="innre-bannre">
        <div className="blog-bg">
          <h1>Contact Us</h1>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-sm-8">
              <form method="post">
                <div className="contact-form-box">
                  <form>
                    <div className="form-row row">
                      <div className="form-group col-6 col-md-6">
                        <label for="First_Name">
                          First Name<span className="text-danger"> *</span>
                        </label>
                        <input
                          type="text"
                          className="form-control mb-0"
                          id="First_Name"
                          placeholder="Enter your first name"
                          name="firstname"
                          value={firstname}
                          onBlur={handleValidate}
                          onChange={handleChange}
                        />
                        {errors.firstname ? (
                          <span
                            className="text-danger"
                            style={{ fontSize: "14px" }}
                          >
                            {errors.firstname}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="form-group col-6 col-md-6">
                        <label for="First_Name">
                          Last Name<span className="text-danger"> *</span>
                        </label>
                        <input
                          type="text"
                          className="form-control mb-0"
                          id="last_Name"
                          placeholder="Enter your last name"
                          name="lastname"
                          value={lastname}
                          onBlur={handleValidate}
                          onChange={handleChange}
                        />
                        {errors.lastname ? (
                          <span
                            className="text-danger"
                            style={{ fontSize: "14px" }}
                          >
                            {errors.lastname}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>

                    <div className="form-row row">
                      <div className="form-group col-6 col-md-6 ">
                        <label for="Eamil">
                          Email<span className="text-danger"> *</span>
                        </label>
                        <input
                          type="email"
                          className="form-control mb-0"
                          id="Email"
                          placeholder="Enter your email"
                          name="email"
                          value={email}
                          onBlur={handleValidate}
                          onChange={handleChange}
                        />
                        {errors.email ? (
                          <span
                            className="text-danger"
                            style={{ fontSize: "14px" }}
                          >
                            {errors.email}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="form-group col-6 col-md-6">
                        <label for="Phone">
                          Contact# <span className="text-danger"> *</span>
                        </label>
                        <input
                          className="input[type=number]::-webkit-outer-spin-button form-control mb-0"
                          type="number"
                          id="Phone"
                          placeholder="Enter your phone no."
                          name="contact"
                          value={contact}
                          onBlur={handleValidate}
                          onChange={handleChange}
                        />
                        {errors.contact ? (
                          <span
                            className="text-danger"
                            style={{ fontSize: "14px" }}
                          >
                            {errors.contact}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>

                    <div className="form-row row">
                      <div className="form-group  col-md-12">
                        <label for="Enquiry">
                          Enquiry Type <span className="text-danger"> *</span>{" "}
                        </label>
                        <select
                          id="Enquiry"
                          value={enquirytype}
                          name="enquirytype"
                          className="form-control mb-0"
                          onBlur={handleValidate}
                          onChange={handleChange}
                        >
                          <option selected>Select Enquiry</option>
                          <option
                            value="partnership"
                            label="Partnership Enquiry"
                          ></option>
                          <option
                            value="general"
                            label="General Enquiry"
                          ></option>
                        </select>
                        {errors.enquirytype ? (
                          <span
                            className="text-danger"
                            style={{ fontSize: "14px" }}
                          >
                            {errors.enquirytype}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                      <DragDrop
                        handleFileChange={handleFileChange}
                        accept={[]}
                      />
                      {/* <div className="form-group col-6 col-md-6">
                        <label htmlFor="file">File</label>
                        <input
                          type="file"
                          className="form-control mb-0"
                          id="file"
                          name="image"
                          onChange={(e) => {
                            setInpData({ ...inpData, image: e.target.files });
                          }}
                        />
                      </div> */}

                      <div className="form-group col-md-12">
                        <label for="Message">
                          Message<span className="text-danger"> *</span>
                        </label>
                        <textarea
                          type="textarea"
                          rows="5"
                          className="form-control  mb-0 form-control-contact px-2"
                          id="message"
                          aria-describedby="emailHelp"
                          placeholder="Write your message"
                          name="querymessage"
                          value={querymessage}
                          onBlur={handleValidate}
                          onChange={handleChange}
                        ></textarea>
                        {errors.querymessage ? (
                          <span
                            className="text-danger"
                            style={{ fontSize: "14px" }}
                          >
                            {errors.querymessage}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>

                    <div className="form-button-div mt-3">
                      <button
                        onClick={handleSubmit}
                        className="btn btn-primary"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </form>
            </div>
            <div className="col-sm-4">
              <div className="contact-email-box">
                <div className="contact-email-box-img">
                  <img src="/images/contact-email-img.png" />
                </div>
                <p>
                  {" "}
                  <b>Email Address:</b>
                  <br />
                  <a href="mailto:nftsupport@crosstower.com">
                    nftsupport@crosstower.com
                  </a>
                </p>
              </div>
              <img
                src="/images/contact-img-1.png"
                className="contact-last-img"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactUs;
