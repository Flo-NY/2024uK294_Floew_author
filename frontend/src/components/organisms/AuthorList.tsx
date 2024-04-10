import {
  Backdrop,
  CircularProgress,
  List,
  Pagination,
  Skeleton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Author, CreateAuthor } from "../../model";
import {
  createAuthor,
  getAuthorPage,
  updateAuthor,
} from "../../services/AuthorService";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuthorListItem from "../molecules/AuthorListItem";
import EditDialog, { FormValues } from "../molecules/EditDialog";
import DetailsDialog from "../molecules/DetailsDialog";

type AuthorListProps = {
  setOpenAddDialog: (isOpen: React.SetStateAction<boolean>) => void;
  openAddDialog: boolean;
};

function AuthorList({ setOpenAddDialog, openAddDialog }: AuthorListProps) {
  const [page, setPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(10);
  const [authorList, setAuthorList] = useState<Author[]>([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDetails, setOpenDialog] = useState(false);
  const [focusedAuthor, setForusedAuthor] = useState<Author>({
    id: 0,
    author_name: "",
    birth_date: new Date(),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const nav = useNavigate();

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
  // Pagination
  useEffect(() => {
    const pageParam = searchParams.get("page");
    if (pageParam) {
      const pageNumber = parseInt(pageParam);
      if (!isNaN(pageNumber)) {
        setPage(pageNumber);
      }
    }
  }, []);
  useEffect(requestAuthorList, [page]);

  // Edit author
  function onSubmitEdit(values: FormValues) {
    setOpenEdit((prev) => !prev);
    setIsLoading(true);
    updateAuthor({
      id: focusedAuthor.id,
      author_name: values.author_name,
      birth_date: values.birth_date,
    })
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
  // Add author
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
                handleOpenDetailsDialog={() => {
                  setForusedAuthor(author);
                  setOpenDialog((prev) => !prev);
                }}
                handleOpenEditDialog={() => {
                  setForusedAuthor(author);
                  setOpenEdit((prev) => !prev);
                }}
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
      {/*  Add author */}
      <EditDialog
        open={openAddDialog}
        author={{ id: 0, author_name: "", birth_date: new Date() }}
        onSubmit={onSubmitAdd}
        onClose={() => setOpenAddDialog((prev) => !prev)}
      />
      {/* edit focused author */}
      <EditDialog
        open={openEdit}
        author={focusedAuthor}
        onSubmit={onSubmitEdit}
        onClose={() => setOpenEdit((prev) => !prev)}
      />
      {/* focused details */}
      <DetailsDialog
        open={openDetails}
        author={focusedAuthor}
        onClose={() => setOpenDialog((prev) => !prev)}
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
