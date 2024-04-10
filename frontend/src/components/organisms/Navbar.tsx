import React from "react";
import UserAvatar from "../molecules/UserAvatar";
import { IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

type NavbarProps = {
  onClick: () => void;
};

function Navbar({ onClick }: NavbarProps) {
  return (
    <div className="w-full flex px-5 py-2 items-center	bg-white">
      <h1 className="text-3xl">AuthorList App</h1>
      <div className="flex-grow"></div>
      <IconButton onClick={onClick}>
        <AddIcon />
      </IconButton>
      <UserAvatar />
    </div>
  );
}

export default Navbar;
