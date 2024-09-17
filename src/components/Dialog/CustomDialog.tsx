import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { useContext, FC } from "react";
import ApiContext from "../../store/api-context";

const CustomDialog: FC = () => {
  const apiCtx = useContext(ApiContext);

  return (
    <Dialog open={apiCtx.isError} onClose={apiCtx.onDialogClose}>
      <DialogTitle>Something went wrong...</DialogTitle>
      <DialogContent>
        <DialogContentText>{apiCtx.error}</DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
