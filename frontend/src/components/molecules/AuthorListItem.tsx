import { Author } from "../../model";
import { Chip, ListItem, ListItemButton, ListItemText } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { deleteAuthor, updateAuthor } from "../../services/AuthorService";
import { useNavigate } from "react-router-dom";

type AuthorListItemProps = {
  author: Author;
  requestAuthorList: () => void;
  setIsLoading: (isLoading: boolean) => void;
  handleOpenEditDialog: () => void;
  handleOpenDetailsDialog: () => void;
};

function AuthorListItem({
  author,
  requestAuthorList,
  setIsLoading,
  handleOpenEditDialog,
  handleOpenDetailsDialog,
}: AuthorListItemProps) {
  const nav = useNavigate();

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
              onClick={handleOpenEditDialog}
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
        <ListItemButton className="p-0" onClick={handleOpenDetailsDialog}>
          <div className="gap-3 flex flex-row">
            <Chip label={author.id} color="primary" />
            <ListItemText primary={author.author_name} />
          </div>
        </ListItemButton>
      </ListItem>
    </>
  );
}

export default AuthorListItem;
