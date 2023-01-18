import React, { useContext, useEffect, useState } from "react";
import AddButton from "../utils/Buttons/AddButton";
import CancelButton from "../utils/Buttons/CancelButton";
import { toast } from "react-toastify";
import Loader from "../utils/Loader";
import { useActionData, useNavigate, useParams } from "react-router-dom";
import SessionContext from "../../context/SessionContext";
import { URL_BACK } from "../../../config";

const initalSectionForm = {
  title: "",
  is_active: true,
};

const initialErrors = {
  title: [],
  is_active: false,
};

const SectionForm = () => {
  const { session } = useContext(SessionContext);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(initialErrors);
  const [section, setSection] = useState(initalSectionForm);
  const navigate = useNavigate();

  const { slugNameSection } = useParams();

  useEffect(() => {
    if (slugNameSection) {
      setIsLoading(true);
      const sectionsRequest = async () => {
        const sectionsResponse = await fetch(
          `${URL_BACK}/cv/sections/${slugNameSection}/`,
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
        setSection(sectionsResponse);
        setIsLoading(false);
        return sectionsResponse;
      };
      sectionsRequest();
    }
  }, []);

  const handleCancel = (e) => {
    e.preventDefault();
    let response = confirm("Are you sure to cancel this operation?");
    if (response) navigate("/sections");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `${URL_BACK}/cv/sections/${slugNameSection ? slugNameSection + "/" : ""}`,
      {
        method: slugNameSection ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access}`,
        },
        body: JSON.stringify(section),
      }
    )
      .then((response) =>
        response
          .json()
          .then((data) => ({ info: data, status: response.status }))
      )
      .catch((err) => console.error(err));

    if (response?.status === 200) {
      toast.success(`${response.info.title} was updated`);
      navigate(`/sections/`);
    }

    if (response?.status === 201) {
      toast.success(`${response.info.title} was created!`);
      navigate(`/sections/`);
    }

    if (response?.status === 400) {
      toast.error("Some values are incorrectly");
      setErrors({ ...errors, ...response.info });
    }

    if (response?.status === 401) {
      navigate("/login/");
    }
  };

  const onChange = (e) => {
    if (e.target.id === "is_active") {
      setSection({ ...section, [e.target.id]: e.target.checked });
    } else {
      setSection({ ...section, [e.target.id]: e.target.value });
    }
  };

  return (
    <section className="sections">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="card-sections">
          <div className="title-section">
            <h2>New Section</h2>
          </div>
          <div className="form-container">
            <form method="post" onSubmit={(e) => onSubmit(e)}>
              <div className="form-group">
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder=" "
                  className={`form-input ${errors?.title && "error-input"}`}
                  defaultValue={section?.title}
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
                <label htmlFor="is_active">
                  Yo want to active this section?
                </label>
                <input
                  type="checkbox"
                  name="is_active"
                  id="is_active"
                  checked={section?.is_active}
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

export default SectionForm;
