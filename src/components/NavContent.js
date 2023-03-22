import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AddInventory from "./AddInventory";
import Inventory from "./Inventory";
import Login from "./Login";
import Protected from "./ProtectedRoute";
import Register from "./Register";

const NavContent = () => {
  const loggedIn = useSelector(({ user }) => user.loggedIn);

  return (
    <Routes>
      <Route path="/" exact element={<Login />} />
      <Route path="/signUp" element={<Register />} />
      <Route
        path="/home"
        element={
          <Protected isLoggedIn={loggedIn}>
            <Inventory />
          </Protected>
        }
      />
      <Route
        path="addInventory"
        element={
          <Protected isLoggedIn={loggedIn}>
            <AddInventory />
          </Protected>
        }
      />
    </Routes>
  );
};

export default NavContent;
