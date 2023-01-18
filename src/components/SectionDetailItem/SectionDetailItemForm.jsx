import React, { useContext, useEffect, useState } from "react";
import { Form, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { URL_BACK } from "../../../config";
import SessionContext from "../../context/SessionContext";
import AddButton from "../utils/Buttons/AddButton";
import CancelButton from "../utils/Buttons/CancelButton";
import Loader from "../utils/Loader";
import FileIcon from "../../assets/file-icon.svg";

const initialDetailItemForm = {
  text: "",
  icon: null,
  is_active: true,
};

const initialErrors = {
  text: [],
  icon: [],
};

const SectionDetailItemForm = () => {
  const { session } = useContext(SessionContext);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(initialErrors);
  const [item, setItem] = useState(initialDetailItemForm);
  const { slugNameSection, idSectionDetail, idSectionDetailItem } = useParams();
  const navigate = useNavigate();

  const itemLoader = async () => {
    setIsLoading(true);
    const itemResponse = await fetch(
      `${URL_BACK}/cv/section/${slugNameSection}/details/${idSectionDetail}/items/${idSectionDetailItem}/`,
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
    if (itemResponse?.status === 401) {
      navigate("/login/");
    }
    const newItemState = {};
    for (var key in item) {
      if (itemResponse.hasOwnProperty(key)) {
        newItemState[key] = itemResponse[key];
      }
    }
    setItem(newItemState);
    setIsLoading(false);
  };

  useEffect(() => {
    if (idSectionDetailItem) itemLoader();
  }, []);

  const handleCancel = (e) => {
    e.preventDefault();
    let response = confirm("Are you sure to cancel this operation?");
    if (response) navigate("/section-details-item/");
  };

  const handleClick = (e) => {
    e.preventDefault();
    const $input = document.getElementById("file");
    $input.click();
  };

  const onChange = (e) => {
    e.preventDefault();
    if (e.target.id === "is_active") {
      setItem({ ...item, [e.target.id]: e.target.checked });
    } else {
      setItem({ ...item, [e.target.id]: e.target.value });
    }
  };

  const onChangeFile = (e) => {
    e.preventDefault();
    setItem({ ...item, icon: e.target.files[0] });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (var key in item) {
      if (item.hasOwnProperty(key)) {
        if (key === "icon") {
          if (typeof item[key] !== "object") {
            continue;
          }
        }
        formData.append(key, item[key]);
      }
    }

    const responseitem = await fetch(
      `${URL_BACK}/cv/section/${slugNameSection}/details/${idSectionDetail}/items/${
        idSectionDetailItem ? idSectionDetailItem + "/" : ""
      }`,
      {
        method: idSectionDetailItem ? "PATCH" : "POST",
        headers: {
          Authorization: `Bearer ${session.access}`,
        },
        body: formData,
      }
    ).then((response) =>
      response.json().then((data) => ({ info: data, status: response.status }))
    );
    if (responseitem?.status === 201) {
      toast.success(`${responseitem.info.text} was created!`);
      navigate("/section-details-item/");
    }
    if (responseitem?.status === 200) {
      toast.success(`${responseitem.info.text} was edited!`);
      navigate("/section-details-item/");
    }
    if (responseitem?.status === 401) {
      navigate("/login/");
    }
  };

  return (
    <section className="sections">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="card-sections">
          <div className="title-section">
            <h2>New Section Detail Item</h2>
          </div>
          <div className="form-container">
            <form method="post" onSubmit={(e) => onSubmit(e)}>
              <div className="form-group">
                <textarea
                  type="text"
                  name="text"
                  id="text"
                  placeholder=" "
                  className={`form-input form-textarea ${
                    errors?.text && "error-input"
                  }`}
                  value={item?.text}
                  onChange={(e) => onChange(e)}
                ></textarea>
                <label
                  className={`form-label ${errors?.text && "error-label"}`}
                  htmlFor="text"
                >
                  Text
                </label>
                <div className="error-container">
                  {errors?.title && <p className="error-msg">{errors.title}</p>}
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
                  accept="image/*"
                  hidden
                  onChange={(e) => onChangeFile(e)}
                />
                {item?.icon && (
                  <div className="file-container">
                    <div className="file-link-container">
                      <a href={item?.icon} target="_blank">
                        <img src={FileIcon} alt="file-icon" />
                        Open the file
                      </a>
                    </div>
                  </div>
                )}
                <div className="error-container">
                  {errors?.file && <p className="error-msg">{errors.file}</p>}
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
                  defaultChecked={item ? item.is_active : false}
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

export default SectionDetailItemForm;
