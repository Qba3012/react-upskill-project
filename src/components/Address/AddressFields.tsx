import { CardContent, Card, Grid, CardHeader, TextField, Button, Typography } from "@material-ui/core";
import { FC, useContext } from "react";
import AddressField from "./AddressField";
import SaveIcon from "@material-ui/icons/Save";
import AddressContext from "../../store/address-context";
import { indigo } from "@material-ui/core/colors";

const AddressFields: FC = () => {
  const { address, onFirstNameChange, onLastNameChange, isFormValidated, onSubmit } = useContext(AddressContext);

  return (
    <>
      {address && (
        <>
          <Grid item container xs={12}>
            <Typography style={{ color: indigo[300] }} variant="h6">
              2. Fill-up personal info
            </Typography>
          </Grid>
          <Grid item container xs={12} spacing={5} style={{ margin: 0 }}>
            <Grid item xs={6}>
              <TextField
                id="Imię"
                variant="outlined"
                error={isFormValidated && address.firstName === ""}
                fullWidth
                label="Imię"
                size={"medium"}
                value={address.firstName}
                onChange={onFirstNameChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="Nazwisko"
                variant="outlined"
                error={isFormValidated && address.lastName === ""}
                fullWidth
                label="Nazwisko"
                size={"medium"}
                value={address.lastName}
                onChange={onLastNameChange}
              />
            </Grid>
            <Grid item xs={6}>
              <AddressField label="Ulica" value={address.street} />
            </Grid>
            <Grid item xs={6}>
              <AddressField label="Numer" value={address.number} />
            </Grid>
            <Grid item xs={6}>
              <AddressField label="Miasto" value={address.city} />
            </Grid>
            <Grid item xs={6}>
              <AddressField label="Kod pocztowy" value={address.postalCode} />
            </Grid>
            <Grid item xs={6}>
              <AddressField label="Państwo" value={address.country} />
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                onClick={onSubmit}
                color="primary"
                style={{ width: "100%", height: "100%" }}
                endIcon={<SaveIcon />}
              >
                Save Contact
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default AddressFields;
