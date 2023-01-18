import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { URL_BACK } from "../../../config";
import SessionContext from "../../context/SessionContext";
import AddButton from "../utils/Buttons/AddButton";
import EditButton from "../utils/Buttons/EditButton";
import Table from "../utils/Table";

const initialSection = [];
const theaders = ["Title", "Active"];
const fields = ["title", "is_active"];

const SectionDetailsList = () => {
  const { session } = useContext(SessionContext);
  const [sectionDetails, setSectionDetails] = useState(null);
  const [actionsButtons, setActionsButtons] = useState([]);
  const [sectionSelected, setSectionSelected] = useState(null);
  const [sections, setSections] = useState(initialSection);

  const navigate = useNavigate();

  useEffect(() => {
    getSections();
    if (sectionDetails !== null) {
      let actions = sectionDetails.map((sectionDetail) => {
        let edit = (
          <EditButton
            size={12}
            handleClick={() => {
              navigate(
                `${sectionDetail.section.slug_name}/${sectionDetail.id}/edit/`
              );
            }}
          />
        );
        return [edit];
      });
      setActionsButtons(actions);
    }
  }, [sectionDetails]);

  const getSections = async () => {
    const sectionsResponse = await fetch(`${URL_BACK}/cv/sections/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access}`,
      },
    })
      .then((response) =>
        response
          .json()
          .then((data) => ({ info: data, status: response.status }))
      )
      .catch((err) => console.log(err));
    if (sectionsResponse?.status === 401) {
      navigate("/login/");
    }
    setSections(sectionsResponse?.info);
  };

  const handleChange = async (e) => {
    let newSectionSelected = e.target.value;
    setSectionSelected(newSectionSelected);
    const sectionDetails = await fetch(
      `${URL_BACK}/cv/section/${newSectionSelected}/details/`,
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
    if (sectionDetails?.status === 401) {
      navigate("/login/");
    }
    setSectionDetails(sectionDetails);
  };

  const addNew = (e) => {
    e.preventDefault();
    navigate(`${sectionSelected}/new/`);
  };

  return (
    <section className="sections">
      <div className="card-sections">
        <div className="title-section">
          <h2>Sections Details</h2>
        </div>
        <div className="section-detail-container">
          {sections?.length ? (
            <>
              <div className="select-section">
                <label htmlFor="section">Choose a section:</label>
                <select
                  name="section"
                  id="section"
                  className="form-select"
                  defaultValue=" "
                  onChange={(e) => handleChange(e)}
                >
                  <option disabled value=" ">
                    -- Select an option --
                  </option>
                  {sections.map((section, index) => (
                    <option key={index} value={section.slug_name}>
                      {section.title}
                    </option>
                  ))}
                </select>
              </div>
              {sectionDetails && (
                <div className="btn-section bg-add add-section-detail-container">
                  <p>Add new</p>
                  <AddButton size={25} handleClick={(e) => addNew(e)} />
                </div>
              )}
            </>
          ) : (
            <h1>No data</h1>
          )}
        </div>
        <div className="table-section">
          <Table
            theaders={theaders}
            data={sectionDetails === null ? [] : sectionDetails}
            fields={fields}
            actionsButtons={actionsButtons}
          />
        </div>
      </div>
    </section>
  );
};

export default SectionDetailsList;
