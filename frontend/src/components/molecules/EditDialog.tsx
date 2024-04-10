import {
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Author } from "../../model";
import { Form, Formik } from "formik";
import FormSingleInput from "../atoms/FormSingleInput";

type EditDialogProps = {
  author: Author;
  open: boolean;
  onClose: () => void;
  onSubmit: (values: FormValues) => void;
};

export type FormValues = {
  author_name: string;
  birth_date: Date;
};

function EditDialog({ author, open, onClose, onSubmit }: EditDialogProps) {
  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <Formik
        initialValues={{
          author_name: author.author_name,
          birth_date: new Date(author.birth_date),
        }}
        onSubmit={onSubmit}
      >
        <Form>
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            {author.author_name}
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <FormSingleInput
              id="author_name"
              name="author_name"
              placeholder="John Doe"
              type="author_name"
              required
            >
              Author Name:
            </FormSingleInput>
            <FormSingleInput
              id="birth_date"
              name="birth_date"
              type="date"
              required
            >
              Birth Date:
            </FormSingleInput>
          </DialogContent>
          <DialogActions>
            <ButtonBase autoFocus type="submit">
              Save changes
            </ButtonBase>
          </DialogActions>
        </Form>
      </Formik>
    </Dialog>
  );
}

export default EditDialog;
