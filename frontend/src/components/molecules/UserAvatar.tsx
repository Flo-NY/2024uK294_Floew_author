import { Avatar, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import React from "react";
import LogoutMenuItem from "../atoms/LogoutMenuItem";

function UserAvatar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  function handleClose() {
    setAnchorEl(null);
  }
  function handleClick(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }
  return (
    <>
      <Tooltip title="Logout">
        <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
          <Avatar className="h-[32px] w-[32px]">U</Avatar>
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <LogoutMenuItem />
      </Menu>
    </>
  );
}

export default UserAvatar;
