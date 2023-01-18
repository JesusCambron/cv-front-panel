import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddButton from "../utils/Buttons/AddButton";
import CancelButton from "../utils/Buttons/CancelButton";
import { URL_BACK } from "../../../config";
import { toast } from "react-toastify";
import SessionContext from "../../context/SessionContext";

const Reorder = () => {
  const { session } = useContext(SessionContext);
  const [sections, setSections] = useState([]);

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
      setSections(sectionsResponse?.info);
      return { sections: sections.info };
    };
    sectionsRequest();
  }, []);

  const reorder = (list, startIndex, endIndex) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setSections(
      result.map((section, index) => {
        section.order = index + 1;
        return section;
      })
    );
    return result;
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const sectionUpdate = await fetch(`${URL_BACK}/cv/section/reorder/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access}`,
      },
      body: JSON.stringify(sections),
    }).then((response) =>
      response.json().then((data) => ({ info: data, status: response.status }))
    );
    if (sectionUpdate?.status === 200) {
      toast.success(`Sections were reorder`);
      navigate("/sections");
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    let response = confirm("Are you sure to return to section page?");
    if (response) navigate("/sections");
  };

  return (
    <section className="sections">
      <div className="card-sections">
        <div className="title-section">
          <h2>Reorder Sections</h2>
        </div>
        <DragDropContext
          onDragEnd={(result) => {
            const { source, destination } = result;
            if (!destination) return;
            if (
              source.index === destination.index &&
              source.droppableId === destination.droppableId
            )
              return;
            setSections((prevSections) =>
              reorder(prevSections, source.index, destination.index)
            );
          }}
        >
          <div className="app">
            <main>
              <section className="droppable-section">
                <Droppable droppableId="sections">
                  {(droppableProvided) => (
                    <ul
                      ref={droppableProvided.innerRef}
                      {...droppableProvided.droppableProps}
                      className="task-list"
                    >
                      {sections &&
                        sections.map((section, index) => (
                          <Draggable
                            key={section.id}
                            draggableId={String(section.id)}
                            index={index}
                          >
                            {(draggableProvided) => (
                              <li
                                {...draggableProvided.draggableProps}
                                ref={draggableProvided.innerRef}
                                {...draggableProvided.dragHandleProps}
                                className="section-item"
                              >
                                <div
                                  className={`reorder-text-container${
                                    section.is_active ? "" : " opacity-30"
                                  }`}
                                >
                                  <span>Order: {section.order}</span>
                                  <span>Title: {section.title}</span>
                                  <span>
                                    Is Active?: {section.is_active ? "✔" : "❌"}
                                  </span>
                                </div>
                              </li>
                            )}
                          </Draggable>
                        ))}
                      {droppableProvided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </section>
            </main>
          </div>
        </DragDropContext>
        <div className="actions-form-buttons">
          <div className="form-button bg-cancel">
            <p>Cancel</p>
            <CancelButton size={20} handleClick={(e) => handleCancel(e)} />
          </div>
          <div className="form-button bg-add">
            <p>Save</p>
            <AddButton size={20} handleClick={(e) => handleClick(e)} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reorder;
