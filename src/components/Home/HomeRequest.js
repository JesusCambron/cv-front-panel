import { GITHUB_REPOS_URL, GITHUB_TOKEN } from "../../../config";

const SORT_BY_CREATED_DATE = `?sort=created`;
export const getRepositories = async (setGithubData) => {
  const data = await fetch(`${GITHUB_REPOS_URL}${SORT_BY_CREATED_DATE}`, {
    method: "GET",
    headers: {
      Authorization: `${GITHUB_TOKEN}`,
    },
  }).then((response) => response.json());
  setGithubData(data);
  return data;
};
