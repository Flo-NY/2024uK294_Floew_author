import { Logout } from "@mui/icons-material";
import { ListItemIcon, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/UserService";

function LogoutMenuItem() {
  const nav = useNavigate();

  function handleClick() {
    console.log("Logging out...");
    logoutUser();
    nav("/login");
  }
  return (
    <MenuItem onClick={handleClick}>
      <ListItemIcon>
        <Logout fontSize="small" />
      </ListItemIcon>
      Logout
    </MenuItem>
  );
}

export default LogoutMenuItem;
