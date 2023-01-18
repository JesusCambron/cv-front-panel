import React, { useEffect, useState } from "react";
import Loader from "../utils/Loader";
import GitHubCard from "./GitHubCard";
import { getRepositories } from "./HomeRequest";

const initialGithubData = [];

const HomePage = () => {
  const [githubData, setGithubData] = useState(initialGithubData);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getRepositories(setGithubData);
  }, []);

  useEffect(() => {
    setIsLoading(!isLoading);
  }, [githubData]);

  return (
    <section className="sections">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="card-sections">
          <div className="title-section">
            <h2>Last GitHub Repositories Updates</h2>
          </div>
          <div className="cards-container">
            {githubData?.map((repo) => (
              <GitHubCard repo={repo} />
            ))}
          </div>
        </div>
      )}
      ;
    </section>
  );
};

export default HomePage;
