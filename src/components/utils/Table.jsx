import React from "react";
import { useNavigate } from "react-router-dom";
import DeleteButton from "../utils/Buttons/DeleteButton";
import EditButton from "../utils/Buttons/EditButton";
import "./table.css";

const Table = ({ theaders, data, fields, actionsButtons }) => {
  const navigate = useNavigate();
  return (
    <table className="table-data">
      <thead>
        <tr>
          {theaders.map((title, index) => (
            <th key={index}>{title}</th>
          ))}
          <th key={theaders.length}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.length ? (
          <>
            {data?.map((data, index) => (
              <tr>
                {fields.map((field) => (
                  <td>
                    <p>
                      {typeof data[field] !== "boolean"
                        ? data[field]
                        : data[field]
                        ? "✔"
                        : "❌"}
                    </p>
                  </td>
                ))}
                <td className="action-column">
                  {actionsButtons?.length > 0 &&
                    actionsButtons[index]?.map((actionButton) => actionButton)}
                </td>
              </tr>
            ))}
          </>
        ) : (
          <tr>
            <td colSpan={theaders.length + 1}>
              <h2 style={{ color: "var(--white-color)" }}>No data</h2>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
