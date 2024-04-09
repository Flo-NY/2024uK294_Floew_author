import { Author } from "../../model";
import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { deleteAuthor, updateAuthor } from "../../services/AuthorService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import EditDialog, { FormValues } from "../atoms/EditDialog";

type AuthorListItemProps = {
  author: Author;
  requestAuthorList: () => void;
  setIsLoading: (isLoading: boolean) => void;
};

function AuthorListItem({
  author,
  requestAuthorList,
  setIsLoading,
}: AuthorListItemProps) {
  const nav = useNavigate();

  const [openEdit, setOpenEdit] = useState(false);
  const [openDetails, setOpenDialog] = useState(false);

  function onSubmitEdit(values: FormValues) {
    setIsLoading(true);
    updateAuthor({
      id: author.id,
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

  function deleteItem() {
    setIsLoading(true);
    deleteAuthor(author.id)
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
    <>
      <ListItem
        sx={{ padding: 0 }}
        secondaryAction={
          <div className="flex">
            <ListItemButton
              className="border border-solid border-gray-300 rounded-md p-0"
              onClick={() => setOpenEdit((prev) => !prev)}
            >
              <ListItemText primary="Edit" />
            </ListItemButton>
            <ListItemButton
              className="border border-solid border-gray-300 rounded-md p-0"
              onClick={deleteItem}
            >
              <DeleteForeverIcon />
            </ListItemButton>
          </div>
        }
      >
        <ListItemButton
          className="p-0"
          onClick={() => setOpenDialog((prev) => !prev)}
        >
          <ListItemText primary={author.author_name} />
        </ListItemButton>
      </ListItem>
      <EditDialog
        open={openEdit}
        author={author}
        onSubmit={onSubmitEdit}
        onClose={() => setOpenEdit((prev) => !prev)}
      />
    </>
  );
}

export default AuthorListItem;
