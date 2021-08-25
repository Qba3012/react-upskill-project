import { CardContent, Card, Grid, CardHeader } from "@material-ui/core";
import { FC } from "react";
import Address from "../../models/Address";
import AddressField from "./AddressField";

type Props = {
  address: Address;
};

const AddressFields: FC<Props> = ({ address }) => {
  return (
    <Card>
      <CardHeader title="Selected Address" titleTypographyProps={{ variant: "h5", color: "primary" }} />
      <CardContent>
        <Grid item container xs={12} spacing={5} style={{ margin: 0 }}>
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
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AddressFields;
