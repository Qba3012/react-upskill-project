import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { uiActions } from "../store/ui-slice";

const CustomDialog: FC = () => {
  const dispatch = useDispatch();
  const error = useSelector((state: RootState) => state.ui.error);

  const onDialogClose = () => {
    dispatch(uiActions.closeDialog());
  };

  return (
    <Dialog open={error !== ""} onClose={onDialogClose}>
      <DialogTitle>Something went wrong...</DialogTitle>
      <DialogContent>
        <DialogContentText>{error}</DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
