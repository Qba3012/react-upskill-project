import { Dialog, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";

const CustomDialog = ({ open, message, onClose}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Something went wrong...</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
