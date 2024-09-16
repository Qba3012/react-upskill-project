import { Card, CardContent, CardHeader, Grid, TextField, Typography } from "@material-ui/core";
import { FC } from "react";
import Address from "../../models/Address";

type Props = {
  address: Address;
};

const AddressCard: FC<Props> = ({ address }) => {
  return (
    <Grid item xs={12} component="li" style={{ listStyleType: "none", width: "100%" }}>
      <Card>
        <CardHeader
          title={address.firstName + " " + address.lastName}
          titleTypographyProps={{ variant: "h5", color: "primary" }}
        />
        <CardContent>
          <Grid item container xs={12} style={{ margin: 0 }}>
            <Grid item xs={4}>
              <Typography display="inline" variant="subtitle1">
                Street:{" "}
              </Typography>
              <Typography display="inline" variant="h6">
                {address.street}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography display="inline" variant="subtitle1">
                Number:{" "}
              </Typography>
              <Typography display="inline" variant="h6">
                {address.number}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography display="inline" variant="subtitle1">
                Postal code:{" "}
              </Typography>
              <Typography display="inline" variant="h6">
                {address.postalCode}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography display="inline" variant="subtitle1">
                City:{" "}
              </Typography>
              <Typography display="inline" variant="h6">
                {address.city}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography display="inline" variant="subtitle1">
                Country:{" "}
              </Typography>
              <Typography display="inline" variant="h6">
                {address.country}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default AddressCard;
