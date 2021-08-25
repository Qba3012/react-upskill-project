import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { useContext, FC } from "react";
import UIContext from "../../store/ui-context";

const CustomDialog: FC = () => {
  const uiCtx = useContext(UIContext);

  return (
    <Dialog open={uiCtx.isError} onClose={uiCtx.closeDialog}>
      <DialogTitle>Something went wrong...</DialogTitle>
      <DialogContent>
        <DialogContentText>{uiCtx.error}</DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
