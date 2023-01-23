import { useWeb3 } from "@3rdweb/hooks";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../../apiwrapper";
import { profileFormValidation } from "../../constant/create-from";
import { apiURl } from "../../store/actions";
import { fileToDataUri } from "../../store/actions/extra-function";
import { SetUserData } from "../../store/reducer";

function ProfileSetting() {
  const { address } = useWeb3();

  const { id } = useSelector((state) => state.authUser?.loginUserData);
  const [Errors, setErrors] = useState({});

  const { User } = useSelector((state) => state);
  const { userId } = useParams();
  const {
    image = null,
    Sex = "other",
    Bio = "",
    _id = "",
    coverimage = null,
    Name = "",
    type = "",
    Personal_url = "",
    Telegram_link = "",
    Twitter_link = "",
    Facebook_link = "",
    Youtube_link = "",
  } = User?.data;

  const { walletAddress = "" } = useSelector((state) => state.User?.xumm);

  const inputRef = useRef(null);
  const inputCoverRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Imagehow, setImagehow] = useState(null);
  const [HeaderImagehow, setHeaderImagehow] = useState(null);
  const [formDataInput, setFormData] = useState({
    address: address || walletAddress,
    name: "",
    bio: "",
    twitter_link: "",
    personal_url: "",
    youtube_link: "",
    facebook_link: "",
    telegram_link: "",
    sex: "",
    image: "",
    coverimage: "",
  });
  const fetchUserData = async () => {
    try {
      await API({
        url: `${apiURl.GetUsers}/${userId}`,
        method: "GET",
      }).then((values) => {
        console.log(values, "values");
        let obj = {};
        obj.address = address || walletAddress;
        obj.name = values?.userData?.Name ? values?.userData?.Name : "";
        obj.bio = values?.userData?.Bio ? values?.userData?.Bio : "";
        obj.twitter_link = values?.userData?.Twitter_link
          ? values?.userData?.Twitter_link
          : "";
        obj.personal_url = values?.userData?.Personal_url
          ? values?.userData?.Personal_url
          : "";
        obj.youtube_link = values?.userData?.Youtube_link
          ? values?.userData?.Youtube_link
          : "";
        obj.facebook_link = values?.userData?.Facebook_link
          ? values?.userData?.Facebook_link
          : "";
        obj.telegram_link = values?.userData?.Telegram_link
          ? values?.userData?.Telegram_link
          : "";
        obj.sex = values?.userData?.Sex ? values?.userData?.Sex : "";
        obj.image = values?.userData?.image ? values?.userData?.image : "";
        obj.coverimage = values?.userData?.coverimage
          ? values?.userData?.coverimage
          : "";
        setFormData(obj);
      });
    } catch (error) {
      toast(`Something Wrong`, { type: "error" });
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id) return;
    try {
      profileFormValidation(formDataInput);
    } catch (error) {
      setErrors(error);
      return;
    }
    const form = new FormData();
    for (var key in formDataInput) {
      form.append(key, formDataInput[key]);
    }

    let submitButton = document.getElementById("profileSubmit");
    submitButton.disabled = true;
    try {
      await API({
        url: `${apiURl.EditUser}/${id}`,
        body: form,
        method: "PUT",
        formData: true,
        headers: {},
      }).then((values) => {
        dispatch(SetUserData(values.result));
        submitButton.disabled = false;
        navigate(-1);
      });
    } catch (error) {
      submitButton.disabled = false;
      toast(`Something Wrong`, { type: "error" });
      console.log(error);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      address: address,
    }));
    try {
      profileFormValidation(formDataInput);
    } catch (error) {
      setErrors(error);
    }
  };

  const handleFileChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }

    fileToDataUri(fileObj).then((dataUri) => {
      setImagehow(dataUri.url);
    });
    setFormData((prev) => ({ ...prev, image: fileObj }));
  };

  const handleCoverFileChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }

    fileToDataUri(fileObj).then((dataUri) => {
      setHeaderImagehow(dataUri.url);
    });
    setFormData((prev) => ({ ...prev, coverimage: fileObj }));
  };

  const handleClick = (e) => {
    e.preventDefault();
    // 👇️ open file input box on click of other element
    inputRef.current.click();
  };

  const handleCoverClick = (e) => {
    e.preventDefault();
    inputCoverRef.current.click();
  };
  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId]);
  console.log("Error", Errors);
  return (
    <div>
      <header
        style={{
          margin: "0 auto 30px;",
          backgroundColor: "#fff",
          listStyle: "none",
          display: "flex",
          alignItems: "center",
          width: "100%",
          marginBottom: 30,
        }}
      />
      <section>
        <div className="container profile-set">
          <form method="post" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-sm-12">
                <div
                  className="profile-header"
                  onClick={handleCoverClick}>
                  <img
                    alt=""
                    src={
                      HeaderImagehow
                        ? HeaderImagehow
                        : coverimage
                        ? process.env.REACT_APP_BACKENDURL + "/" + coverimage
                        : "/images/profile-header-img.png"
                    }
                  />
                  <div className="edit-icon">
                    <img alt="" src="/images/edit-iocn-1.png" />
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-6">
                <div className="profile-pic" onClick={handleClick}>
                  {" "}
                  <img
                    alt=""
                    src={
                      Imagehow
                        ? Imagehow
                        : image
                        ? process.env.REACT_APP_BACKENDURL + "/" + image
                        : "/images/user-icon.svg"
                    }
                    width="150px"
                    height={`150px`}
                  />
                  <div className="edit-icon">
                    <img alt="" src="/images/edit-iocn-1.png" />
                  </div>
                </div>

                <div className="profile-text" title={address}>
                  <p>
                    {" "}
                    {Name && Name !== ""
                      ? Name
                      : address
                      ? address?.slice(0, 4) +
                        "...." +
                        address?.slice(address?.length - 4)
                      : walletAddress.slice(0, 4) +
                        "...." +
                        walletAddress.slice(address?.length - 4)}
                  </p>
                  <span>
                    <img alt="" src="/images/wallet-icon.svg" />{" "}
                    {address
                      ? address?.slice(0, 4) +
                        "...." +
                        address.slice(address?.length - 4)
                      : walletAddress.slice(0, 4) +
                        "...." +
                        walletAddress.slice(walletAddress.length - 4)}
                  </span>
                </div>
              </div>
              <div className="col-sm-5 col-md-6 action-button-web">
                <button
                  type="submit"
                  className="save-button "
                  style={{ color: "white" }}
                  id="profileSubmit"
                >
                  Save
                </button>

                <button
                  className="cancel-button-2 "
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(-1);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>

            <input
              style={{ display: "none" }}
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            <input
              style={{ display: "none" }}
              ref={inputCoverRef}
              type="file"
              accept="image/*"
              onChange={handleCoverFileChange}
            />
            <div className="row">
              <div className="col-sm-6">
                <div className="form-div">
                  <label htmlFor="name">{`Username`}</label>
                  <input
                    className="form-control mb-0"
                    type="text"
                    id="name"
                    name="name"
                    value={formDataInput.name}
                    onChange={handleChange}
                    placeholder="Username Enter Name"
                  />
                  <span className={"text-danger small "}>
                    {Errors?.name || ""}
                  </span>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-div">
                  <label for="name">
                    Twitter Username
                    <div className="help">
                      <i
                        className="fa fa-question-circle"
                        aria-hidden="true"
                        style={{ color: "#98999D" }}
                      ></i>
                      <span className="tooltiptext">
                        Link your Twitter account in order to get the
                        verification badge
                      </span>
                    </div>{" "}
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="name"
                    value={formDataInput.twitter_link}
                    onChange={handleChange}
                    name="twitter_link"
                    placeholder="@"
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-div">
                  <label for="name">Instagram</label>
                  <input
                    className="form-control"
                    type="text"
                    id="name"
                    value={formDataInput.personal_url}
                    onChange={handleChange}
                    name="personal_url"
                    placeholder="Instagram url"
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-div">
                  <label for="name">Facebook</label>
                  <input
                    className="form-control"
                    type="text"
                    id="name"
                    value={formDataInput.facebook_link}
                    onChange={handleChange}
                    name="facebook_link"
                    placeholder="Facebook url"
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-div">
                  <label for="name">Youtube</label>
                  <input
                    className="form-control"
                    type="text"
                    id="name"
                    value={formDataInput.youtube_link}
                    onChange={handleChange}
                    name="youtube_link"
                    placeholder="Youtube url"
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-div">
                  <label for="name">Telegram</label>
                  <input
                    className="form-control"
                    type="text"
                    id="name"
                    value={formDataInput.telegram_link}
                    onChange={handleChange}
                    name="telegram_link"
                    placeholder="Telegram url"
                  />
                </div>
              </div>

              <div className="col-sm-6 mb-3">
                <div className="form-div">
                  <label for="name">
                    Your Bio{" "}
                    <span style={{ fontSize: "12px" }}>
                      (Write a short introduction.)
                    </span>
                  </label>
                  <textarea
                    className="form-control mb-0 py-2"
                    id="bio"
                    name="bio"
                    value={formDataInput.bio}
                    onChange={handleChange}
                    placeholder="Add a short bio… (Max 500 Characters)"
                    maxLength={1000}
                    rows={4}
                  ></textarea>
                  <span className={"text-danger small "}>
                    {Errors?.bio || ""}
                  </span>
                </div>
              </div>

              <div className="col-sm-6 col-md-6 action-button-mb">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="save-button">
                      <button type="submit">Save</button>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="cancel-button-2">
                      <a
                        href="!#"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate("/profile");
                        }}
                      >
                        Cancel
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default ProfileSetting;
