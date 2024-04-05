import { Button, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Author, getAuthorPage } from "../../services/AuthorService";
import { tokenValid } from "../../services/UserService";
import { useNavigate } from "react-router-dom";

function AuthorsPage() {
  const nav = useNavigate();
  const [authorList, setAuthorList] = useState<Author[]>([]);
  const [page, setPage] = useState<number>(1);

  function requestAuthorList() {
    getAuthorPage(page)
      .then(setAuthorList)
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          console.log("navigating");
          nav("/login");
        } else {
          console.error(error);
        }
      });
  }
  useEffect(requestAuthorList), [page];
  return (
    <>
      <div>{JSON.stringify(authorList)}</div>;
      <Pagination
        count={10}
        page={page}
        onChange={(_, value) => setPage(value)}
      />
    </>
  );
}

export default AuthorsPage;