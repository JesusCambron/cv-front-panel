import { URL_BACK } from "../../../config";

export async function login({ request }) {
  const formData = await request.formData();
  const session = await fetch(`${URL_BACK}/user/api/token/`, {
    method: "POST",
    body: formData,
  }).then((response) =>
    response.json().then((data) => ({ info: data, status: response.status }))
  );
  return { ...session };
}
