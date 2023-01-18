import { createContext, useEffect, useState } from "react";
import { URL_BACK } from "../../config";

const SessionContext = createContext();
const initialSession = JSON.parse(window.localStorage.getItem("session")) || {};

const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(initialSession);

  useEffect(() => {
    window.localStorage.setItem("session", JSON.stringify(session));
  }, [session]);

  const handleSession = (data) => {
    setSession(data);
  };

  const logout = () => {
    setSession({});
    console.log("logout");
  };

  const data = { session, handleSession, logout };

  const verifySession = async () => {
    const sessionVerify = await fetch(`${URL_BACK}/user/api/token/verify/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: session.access }),
    })
      .then((response) =>
        response
          .json()
          .then((data) => ({ info: data, status: response.status }))
      )
      .catch((err) => console.log(err));
    if (sessionVerify?.status === 401) setSession({});
  };

  verifySession();

  return (
    <SessionContext.Provider value={data}>{children}</SessionContext.Provider>
  );
};

export { SessionProvider };
export default SessionContext;
