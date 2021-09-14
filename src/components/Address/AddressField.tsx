import { TextField } from "@material-ui/core";
import { FC } from "react";

type Props = {
  label: string;
  value: string;
};

const AddressField: FC<Props> = ({ label, value }) => {
  return (
    <TextField
      id={label}
      variant="outlined"
      fullWidth
      label={label}
      size={"medium"}
      value={value}
      InputProps={{
        readOnly: true,
      }}
    />
  );
};

export default AddressField;
