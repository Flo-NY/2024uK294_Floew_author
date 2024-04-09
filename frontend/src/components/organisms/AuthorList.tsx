import {
  Backdrop,
  CircularProgress,
  List,
  Pagination,
  Skeleton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Author } from "../../model";
import { getAuthorPage } from "../../services/AuthorService";
import { useNavigate } from "react-router-dom";
import AuthorListItem from "../molecules/AuthorListItem";

function AuthorList() {
  const [page, setPage] = useState<number>(1);
  const [authorList, setAuthorList] = useState<Author[]>([]);
  const nav = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  function requestAuthorList() {
    getAuthorPage(page)
      .then(setAuthorList)
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          console.log("Logging out...");
          nav("/login");
        } else {
          console.error(error);
        }
      })
      .finally(() => setIsLoading(false));
  }
  useEffect(requestAuthorList, [page]);

  return (
    <div>
      <List>
        {isLoading
          ? Array.from(new Array(10)).map((_, index) => (
              <Skeleton key={index} variant="text" className="py-[12px]" />
            ))
          : authorList.map((author, index) => (
              <AuthorListItem
                setIsLoading={setIsLoading}
                requestAuthorList={requestAuthorList}
                author={author}
                key={index}
              />
            ))}
      </List>
      <Pagination
        count={10}
        page={page}
        onChange={(_, value) => setPage(value)}
      />
      <Backdrop
        open={isLoading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default AuthorList;
