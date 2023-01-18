import Menu from "./components/Menu/Menu";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { MenuProvider } from "./context/MenuContext";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <MenuProvider>
        <Menu />
        <Outlet />
      </MenuProvider>
    </div>
  );
}

export default App;
