import {
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import FormSingleInput from "../atoms/FormSingleInput";
import CloseIcon from "@mui/icons-material/Close";
import { Author } from "../../model";
import { convertDateToDateString } from "../../utils/DateConversion";

type DetailsDialogProps = {
  author: Author;
  open: boolean;
  onClose: () => void;
};

function DetailsDialog({
  onClose,
  open,
  author: { author_name, birth_date },
}: DetailsDialogProps) {
  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
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
      <DialogTitle>{author_name}</DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1">
          Birth Date: {convertDateToDateString(birth_date)}
        </Typography>
      </DialogContent>
    </Dialog>
  );
}

export default DetailsDialog;
