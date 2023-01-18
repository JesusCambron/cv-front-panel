import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { URL_BACK } from "../../../config";
import SessionContext from "../../context/SessionContext";
import AddButton from "../utils/Buttons/AddButton";
import EditButton from "../utils/Buttons/EditButton";
import Table from "../utils/Table";

const theaders = ["Text", "Active"];
const fields = ["text", "is_active"];

const SectionDetailItemList = () => {
  const { session } = useContext(SessionContext);
  const [sections, setSections] = useState([]);
  const [sectionDetails, setSectionDetails] = useState(null);
  const [actionsButtons, setActionsButtons] = useState([]);
  const [sectionSelected, setSectionSelected] = useState(null);
  const [sectionDetailSelected, setSectionDetailSelected] = useState(" ");
  const [sectionDetailItems, setSectionDetailItems] = useState(null);
  const navigate = useNavigate();

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

  useEffect(() => {
    getSections();
  }, []);

  useEffect(() => {
    if (sectionDetailItems !== null) {
      let actions = sectionDetailItems.map((sectionDetailItem) => {
        let edit = (
          <EditButton
            size={12}
            handleClick={() => {
              navigate(
                `/section-detail-items/${sectionDetailItem.section_detail.section.slug_name}/details/${sectionDetailItem.section_detail.id}/items/${sectionDetailItem.id}/edit/`
              );
            }}
          />
        );
        return [edit];
      });
      setActionsButtons(actions);
    }
  }, [sectionDetailItems]);

  const handleChangeSection = async (e) => {
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
    setSectionDetailSelected(" ");
    setSectionDetailItems(null);
  };

  const handleChangeSectionDetail = async (e) => {
    let newSectionDetailSelected = e.target.value;
    setSectionDetailSelected(newSectionDetailSelected);
    const sectionDetailsItems = await fetch(
      `${URL_BACK}/cv/section/${sectionSelected}/details/${newSectionDetailSelected}/items/`,
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
    setSectionDetailItems(sectionDetailsItems);
  };

  const addNew = (e) => {
    e.preventDefault();
    navigate(
      `/section-details-item/${sectionSelected}/details/${sectionDetailSelected}/items/new/`
    );
  };

  return (
    <section className="sections">
      <div className="card-sections">
        <div className="title-section">
          <h2>Sections Details Items</h2>
        </div>
        <div className="section-detail-container">
          {sections?.length && (
            <>
              <div className="select-section">
                <label htmlFor="section_detail">Choose a section:</label>
                <select
                  name="section_detail"
                  id="section_detail"
                  className="form-select"
                  defaultValue=" "
                  onChange={(e) => handleChangeSection(e)}
                >
                  <option disabled value=" ">
                    -- Select an option --
                  </option>
                  {sections.map((section_detail, index) => (
                    <option key={index} value={section_detail.slug_name}>
                      {section_detail.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="select-section">
                <label htmlFor="section_detail">Choose a section detail:</label>
                <select
                  name="section_detail_item"
                  id="section_detail_item"
                  className="form-select"
                  value={sectionDetailSelected}
                  onChange={(e) => handleChangeSectionDetail(e)}
                >
                  <option disabled value=" ">
                    -- Select an option --
                  </option>
                  {sectionDetails?.map((section_detail, index) => (
                    <option key={index} value={section_detail.id}>
                      {section_detail.title}
                    </option>
                  ))}
                </select>
              </div>
              {sectionDetailItems && (
                <div className="btn-section bg-add add-section-detail-container">
                  <p>Add new</p>
                  <AddButton size={25} handleClick={(e) => addNew(e)} />
                </div>
              )}
            </>
          )}
        </div>
        <div className="table-section">
          <Table
            theaders={theaders}
            data={sectionDetailItems === null ? [] : sectionDetailItems}
            fields={fields}
            actionsButtons={actionsButtons}
          />
        </div>
      </div>
    </section>
  );
};

export default SectionDetailItemList;
