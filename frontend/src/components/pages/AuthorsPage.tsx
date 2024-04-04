import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { Author } from "../../services/AuthorService";
import { tokenValid as isTokenValid } from "../../services/UserService";
import { useNavigate } from "react-router-dom";

function AuthorsPage() {
  const navigator = useNavigate();
  useEffect(() => {
    isTokenValid().then((tokenValid) => {
      console.log(tokenValid);
      if (!tokenValid) {
        navigator("login");
        console.log(tokenValid);
      }
    });
  });
  return <div></div>;
}

export default AuthorsPage;
