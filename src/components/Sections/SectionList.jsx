import React, { useContext, useEffect, useState } from "react";
import { FaClipboardList } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { URL_BACK } from "../../../config";
import SessionContext from "../../context/SessionContext";
import AddButton from "../utils/Buttons/AddButton";
import EditButton from "../utils/Buttons/EditButton";
import Table from "../utils/Table";

const initialSection = [];
const initialActionsButtons = [];
const theaders = ["Title", "Order", "Active"];
const fields = ["title", "order", "is_active"];

const SectionList = () => {
  const { session } = useContext(SessionContext);
  const [actionsButtons, setActionsButtons] = useState(initialActionsButtons);
  const [sections, setSections] = useState(initialSection);
  const navigate = useNavigate();

  useEffect(() => {
    const sectionsRequest = async () => {
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
      let actions = sectionsResponse?.info.map((section) => {
        let edit = (
          <EditButton
            size={12}
            handleClick={() => {
              navigate(`${section.slug_name}/edit`);
            }}
          />
        );
        return [edit];
      });
      setActionsButtons(actions || initialActionsButtons);
      return { sections: sections.info };
    };
    sectionsRequest();
  }, []);

  const addNew = (e) => {
    e.preventDefault();
    navigate("/sections/new");
  };

  return (
    <section className="sections">
      <div className="card-sections">
        <div className="title-section">
          <h2>Sections</h2>
        </div>
        <div className="add-new-section">
          <div className="btn-section bg-detail-secondary-color mg-right-10px">
            <p>Reorder Sections</p>
            <button
              className="action-button"
              onClick={() => navigate("reorder/")}
            >
              <FaClipboardList size={25} color={"#fff"} />
            </button>
          </div>

          <div className="btn-section bg-add">
            <p>Add new</p>
            <AddButton size={25} handleClick={(e) => addNew(e)} />
          </div>
        </div>

        <div className="table-section">
          <Table
            theaders={theaders}
            data={sections}
            fields={fields}
            actionsButtons={actionsButtons}
          />
        </div>
      </div>
    </section>
  );
};

export default SectionList;
