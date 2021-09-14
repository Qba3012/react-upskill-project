import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import { indigo } from "@material-ui/core/colors";
import { FC } from "react";
import AddressesList from "../components/Address/AddressesList";
import AddressFields from "../components/Address/AddressFields";
import LocationSearchBar from "../components/Address/LocationSearchBar";

const Address: FC = () => {
  return (
    <Grid item container xs={10} md={8} spacing={5}>
      <Grid item container xs={12}>
        <Card variant="outlined" style={{ width: "100%" }}>
          <CardContent>
            <Grid item container xs={12} spacing={2}>
              <Grid item xs={12}>
                <Typography color="primary" variant="h5">
                  Add new address
                </Typography>
              </Grid>
              <Grid item>
                <Typography style={{ color: indigo[300] }} variant="h6">
                  1. Find location
                </Typography>
              </Grid>
              <LocationSearchBar />
              <AddressFields />
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item container xs={12}>
        <Typography color="primary" variant="h5">
          Saved addresses
        </Typography>
      </Grid>
      <AddressesList />
    </Grid>
  );
};

export default Address;
