import {
  Backdrop,
  CircularProgress,
  List,
  Pagination,
  Skeleton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Author, CreateAuthor } from "../../model";
import { createAuthor, getAuthorPage } from "../../services/AuthorService";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuthorListItem from "../molecules/AuthorListItem";
import EditDialog, { FormValues } from "../atoms/EditDialog";

type AuthorListProps = {
  setOpenAddDialog: (isOpen: React.SetStateAction<boolean>) => void;
  openAddDialog: boolean;
};

function AuthorList({ setOpenAddDialog, openAddDialog }: AuthorListProps) {
  const [page, setPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(10);
  const [authorList, setAuthorList] = useState<Author[]>([]);
  const nav = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  function requestAuthorList() {
    getAuthorPage(page)
      .then((responce) => {
        setAuthorList(responce.authorsPage);
        setPageCount(Math.ceil(responce.totalAuthorCount / 10));
      })
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
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const pageParam = searchParams.get("page");
    if (pageParam) {
      const pageNumber = parseInt(pageParam);
      if (!isNaN(pageNumber)) {
        setPage(pageNumber);
      }
    }
  }, []);

  function onSubmitAdd(values: FormValues) {
    addAuthor({
      author_name: values.author_name,
      birth_date: new Date(values.birth_date),
    });
    setOpenAddDialog((prev) => !prev);
  }

  function addAuthor(author: CreateAuthor) {
    setIsLoading(true);
    createAuthor(author)
      .then(requestAuthorList)
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

  return (
    <div className="bg-white rounded flex flex-col items-center">
      <List className="w-full">
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
        count={pageCount}
        page={page}
        onChange={(_, value) => {
          setPage(value);
          setSearchParams({ page: value.toString() });
        }}
      />
      <EditDialog
        open={openAddDialog}
        author={{ id: 0, author_name: "", birth_date: new Date() }}
        onSubmit={onSubmitAdd}
        onClose={() => setOpenAddDialog((prev) => !prev)}
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
