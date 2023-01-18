import React, { useContext, useEffect, useState } from "react";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigate,
  useParams,
} from "react-router-dom";
import AddButton from "../utils/Buttons/AddButton";
import CancelButton from "../utils/Buttons/CancelButton";
import Loader from "../utils/Loader";
import FileIcon from "../../assets/file-icon.svg";
import SessionContext from "../../context/SessionContext";
import { URL_BACK } from "../../../config";
import { toast } from "react-toastify";

const initialSectionDetailForm = {
  title: "",
  subtitle: "",
  start_date: "",
  finish_date: "",
  file: null,
  is_active: true,
};

const initialErrors = {
  title: [],
  subtitle: [],
  start_date: [],
  finish_date: [],
  file: null,
  is_active: true,
};

const SectionDetailForm = () => {
  const { session } = useContext(SessionContext);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(initialErrors);
  const [sectionDetail, setSectionDetail] = useState(initialSectionDetailForm);
  const navigate = useNavigate();
  const { slugNameSection, idSectionDetail } = useParams();

  useEffect(() => {
    if (idSectionDetail) {
      sectionDetailLoader();
    }
  }, []);

  const sectionDetailLoader = async () => {
    setIsLoading(true);
    const sectionsResponse = await fetch(
      `${URL_BACK}/cv/section/${slugNameSection}/details/${idSectionDetail}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access}`,
        },
      }
    )
      .then((response) => response.json())
      .catch((err) => console.log(err));
    if (sectionsResponse?.status === 401) {
      navigate("/login/");
    }
    const newSectionDetailState = {};
    for (var key in sectionDetail) {
      if (sectionsResponse.hasOwnProperty(key)) {
        newSectionDetailState[key] = sectionsResponse[key];
      }
    }

    setSectionDetail(newSectionDetailState);
    setIsLoading(false);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    let response = confirm("Are you sure to cancel this operation?");
    if (response) navigate("/section-details/");
  };

  const handleClick = (e) => {
    e.preventDefault();
    const $input = document.getElementById("file");
    $input.click();
  };

  const onChangeFile = (e) => {
    e.preventDefault();
    setSectionDetail({ ...sectionDetail, file: e.target.files[0] });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (var key in sectionDetail) {
      if (sectionDetail.hasOwnProperty(key)) {
        if (key === "file") {
          if (typeof sectionDetail[key] !== "object") {
            continue;
          }
        }
        formData.append(key, sectionDetail[key]);
      }
    }
    const responseSectionDetail = await fetch(
      `${URL_BACK}/cv/section/${slugNameSection}/details/${
        idSectionDetail ? idSectionDetail + "/" : ""
      }`,
      {
        method: idSectionDetail ? "PATCH" : "POST",
        headers: {
          Authorization: `Bearer ${session.access}`,
        },
        body: formData,
      }
    ).then((response) =>
      response.json().then((data) => ({ info: data, status: response.status }))
    );

    if (responseSectionDetail?.status === 201) {
      toast.success(`${responseSectionDetail.info.title} was created!`);
      navigate(`/section-details/`);
    }

    if (responseSectionDetail?.status === 200) {
      toast.success(`${responseSectionDetail.info.title} was updated`);
      navigate(`/section-details/`);
    }

    if (responseSectionDetail?.status === 401) {
      navigate("/login/");
    }
  };

  const onChange = (e) => {
    e.preventDefault();
    if (e.target.id === "is_active") {
      setSectionDetail({ ...sectionDetail, [e.target.id]: e.target.checked });
    } else {
      setSectionDetail({ ...sectionDetail, [e.target.id]: e.target.value });
    }
  };

  return (
    <section className="sections">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="card-sections">
          <div className="title-section">
            <h2>New Section Detail</h2>
          </div>
          <div className="form-container">
            <form
              method="post"
              encType="multipart/form-data"
              onSubmit={(e) => onSubmit(e)}
            >
              <div className="form-group">
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder=" "
                  className={`form-input ${errors?.title && "error-input"}`}
                  value={sectionDetail?.title}
                  onChange={(e) => onChange(e)}
                />
                <label
                  className={`form-label ${errors?.title && "error-label"}`}
                  htmlFor="title"
                >
                  Title
                </label>
                <div className="error-container">
                  {errors?.title.map((error) => (
                    <p className="error-msg">{error}</p>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="subtitle"
                  id="subtitle"
                  placeholder=" "
                  className={`form-input ${errors?.subtitle && "error-input"}`}
                  value={sectionDetail?.subtitle}
                  onChange={(e) => onChange(e)}
                />
                <label
                  className={`form-label ${errors?.subtitle && "error-label"}`}
                  htmlFor="subtitle"
                >
                  Subtitle
                </label>
                <div className="error-container">
                  {errors?.subtitle.map((error) => (
                    <p className="error-msg">{error}</p>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <input
                  type="date"
                  name="start_date"
                  id="start_date"
                  placeholder=" "
                  className={`form-input ${
                    errors?.start_date && "error-input"
                  }`}
                  value={sectionDetail?.start_date}
                  onChange={(e) => onChange(e)}
                />
                <label
                  className={`form-label ${
                    errors?.start_date && "error-label"
                  }`}
                  htmlFor="start_date"
                >
                  Start Date
                </label>
                <div className="error-container">
                  {errors?.start_date.map((error) => (
                    <p className="error-msg">{error}</p>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <input
                  type="date"
                  name="finish_date"
                  id="finish_date"
                  placeholder=" "
                  className={`form-input ${
                    errors?.finish_date && "error-input"
                  }`}
                  value={sectionDetail?.finish_date}
                  onChange={(e) => onChange(e)}
                />
                <label
                  className={`form-label ${
                    errors?.finish_date && "error-label"
                  }`}
                  htmlFor="finish_date"
                >
                  Finish Date
                </label>
                <div className="error-container">
                  {errors?.finish_date.map((error) => (
                    <p className="error-msg">{error}</p>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label
                  className={`label-file ${errors?.file && "error-label"}`}
                  htmlFor="file"
                >
                  File
                </label>
                <input
                  type="button"
                  value="Select a file"
                  className="input-file-button"
                  onClick={(e) => handleClick(e)}
                />
                <input
                  type="file"
                  name="file"
                  id="file"
                  placeholder=" "
                  accept="image/*, .pdf"
                  hidden
                  onChange={(e) => {
                    onChangeFile(e);
                  }}
                />
                {sectionDetail?.file && (
                  <div className="file-container">
                    <div className="file-link-container">
                      <a href={sectionDetail?.file} target="_blank">
                        <img src={FileIcon} alt="file-icon" />
                        Open the file
                      </a>
                    </div>
                  </div>
                )}
                <div className="error-container">
                  {errors?.file?.map((error) => (
                    <p className="error-msg">{error}</p>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="is_active">
                  Yo want to active this section detail?
                </label>
                <input
                  type="checkbox"
                  name="is_active"
                  id="is_active"
                  checked={sectionDetail?.is_active}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="actions-form-buttons">
                <div className="form-button bg-cancel">
                  <p>Cancel</p>
                  <CancelButton size={20} handleClick={handleCancel} />
                </div>
                <div className="form-button bg-add">
                  <p>Save</p>
                  <AddButton size={20} />
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default SectionDetailForm;
