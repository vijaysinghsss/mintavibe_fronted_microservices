import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { fileToDataUri } from '../../store/actions/extra-function'
import { toast } from 'react-toastify';
import { NotificationMsg } from '../../store/actions/api-url';

const Upload = ({ setData, Errors }) => {

  const [coverImage, setcoverImage] = useState(false);
  const [fileType, setfileType] = useState({ type: false, format: false });
  const [CoverfileType, setCoverfileType] = useState({ type: false, format: false });
  const [imageBlob, setimageBlob] = useState(false)
  const [CoverimageBlob, setCoverimageBlob] = useState(false)

  const removeImage = (e) => {
    e.preventDefault();
    setimageBlob(false);
    setCoverimageBlob(false);
    setcoverImage(false);
    setfileType({ type: false, format: false });
    setCoverfileType((prev) => ({ ...prev, type: false, format: false }))
    setData({ name: 'image', value: null })
    setData({ name: 'mediaType', value: null })
    setData({ name: 'coverImage', value: null })
  }

  const removeCoverImage = (e) => {
    e.preventDefault();
    setCoverimageBlob(false);
    setCoverfileType((prev) => ({ ...prev, type: false, format: false }))
    setData({ name: 'coverImage', value: null })
  }

  const imageSelect = (e) => {
    const fileObj = e.target.files && e.target.files[0];
    if (!fileObj) {
      return;
    }

    if (fileObj.size > 1.5e+7) {
      toast(NotificationMsg.fileUpload15MB, { type: "info" });
      return;
    }

    fileToDataUri(fileObj).then((data) => {
      const { url, type, format } = data;
      setimageBlob(url);
      if (type && ['video', 'audio'].includes(type)) {
        setcoverImage(true);
      } else {
        if (coverImage) {
          setcoverImage(false)
          setCoverfileType((prev) => ({ ...prev, type: false, format: false }))
          setData({ name: 'coverImage', value: null })
        };
      }
      setData({ name: 'mediaType', value: type })
      setfileType({ type, format })
    });
    setData({ name: 'image', value: fileObj })
  }

  const coverImageSelect = (e) => {
    const fileObj = e.target.files && e.target.files[0];
    if (!fileObj) {
      return;
    }

    if (fileObj.size > 1.5e+7) {
      toast(NotificationMsg.fileUpload15MB, { type: "info" });
      return;
    }

    fileToDataUri(fileObj).then((data) => {
      const { url, type, format } = data;
      setCoverimageBlob(url)
      if (type && ['video', 'audio'].includes(type)) {
        toast(NotificationMsg.errorType, { type: 'error' })
        return;
      }
      setCoverfileType({ type, format })
      setData({ name: 'coverImage', value: fileObj })
    });


  }

  return (
    <div className="col-md-6 mb-5">
      <label className="formbold-form-label formbold-form-label-2">
        {"Upload File"}

      </label>
      <div className="formbold-main-wrapper">
        <div className="formbold-form-wrapper">
          <form action="" method="POST">
            <div className="mb-6 pt-4">
              <div className="formbold-mb-5 formbold-file-input">
                <input type="file" name="file" accept='image/png,image/jpeg,image/gif,video/mp4,video/webm,audio/mp3,audio/webm,audio/mpeg' id="file" onChange={imageSelect} />

                <label htmlFor={fileType.type ? '' : "file"} style={fileType.type ? {} : { cursor: 'pointer' }}>

                  <div>
                    {fileType.type
                      ?
                      <>
                        <div className="close-preview-button" id="close-preview-button" style={{ display: "inline-block" }} onClick={removeImage}>
                          <img className="img-fluid" src="/images/cross-button.svg" alt="" />

                          {/* <span>X</span> */}
                        </div>
                        {
                          ['video'].includes(fileType.type) ?
                            <video width="100%" height="100%" controls controlsList="nodownload">
                              <source src={imageBlob + '#toolbar=0'} />
                            </video>
                            :
                            (
                              ['audio'].includes(fileType.type)
                                ?
                                <audio controls>
                                  <source src={imageBlob} />
                                </audio>
                                :
                                <img src={imageBlob} alt="" width={`100%`} />
                            )
                        }
                      </>
                      :
                      <>
                        <span className="formbold-drop-file">
                          <i className="fa fa-cloud-upload"></i>{" "}
                        </span>
                        <span className="formbold-or">
                          {" PNG, GIF, WEBP, MP4 or MP3. Max 15mb."}
                        </span>
                        <span className="formbold-browse">
                          {fileType.format ? `file Selected` : `Browse`}
                        </span>
                        <br />
                        <span className={"text-danger small"}>
                          {Errors?.image || ''}
                        </span>
                      </>
                    }
                  </div>
                </label>
              </div>
              {coverImage ?
                <>
                  <div style={{ marginTop: 20 }}>
                    <label className="formbold-form-label formbold-form-label-2">
                      {"Upload Cover"}
                    </label>
                  </div>
                  <div className="formbold-mb-5  formbold-file-input">
                    <input type="file" name="coverfile" id="coverfile" accept="image/*" onChange={coverImageSelect} />
                    <label htmlFor={CoverfileType.type ? null : "coverfile"} style={{ minHeight: 100 }}>
                      {CoverimageBlob
                        ?
                        <>
                          <div className="close-preview-button" id="close-preview-button" style={{ display: "inline-block" }} onClick={removeCoverImage}>
                            <img className="img-fluid" src="/images/cross-button.svg" alt="" />
                            {/* <span>X</span> */}
                          </div>
                          <img src={CoverimageBlob} alt="" width={`100%`} />
                        </>
                        :
                        <div>

                          <span className="formbold-drop-file">
                            <i className="fa fa-cloud-upload" />{" "}
                          </span>

                          <span className="formbold-or">
                            {" PNG, GIF, WEBP. Max 15mb."}
                          </span>

                          <span className="formbold-browse">
                            {CoverfileType.type ? `${CoverfileType.type} file Selected` : "Browse"}
                          </span>
                          <br />
                          <span className={"text-danger small"}>
                            {Errors?.coverImage || ''}
                          </span>

                        </div>
                      }
                    </label>
                  </div>
                </>
                :
                null}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

Upload.propTypes = {
  setData: PropTypes.func
}

export default Upload