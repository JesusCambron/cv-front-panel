import React from "react";

const GitHubCard = ({ repo }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const { name, created_at, description, html_url } = repo;
  return (
    <div className="github-card-container">
      <div className="github-title">
        <h2>{name}</h2>
      </div>
      <div className="details">
        <div className="detail-group">
          <b>Description: </b>
          <p>{description || "Not description yet"}</p>
        </div>
        <div className="detail-group">
          <b>Repositorie link: </b>
          <p>
            <a href={html_url} target="_blank" rel="noopener noreferrer">
              {name}
            </a>
          </p>
        </div>
        <div className="detail-group">
          <b>Created at: </b>
          <p>{formatDate(created_at)}</p>
        </div>
      </div>
    </div>
  );
};

export default GitHubCard;
