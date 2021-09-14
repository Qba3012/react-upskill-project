import { Grid, Typography } from "@material-ui/core";
import { FC, useContext } from "react";
import AddressContext from "../../store/address-context";
import AddressCard from "./AddressCard";

const AddressesList: FC = () => {
  const { addresses } = useContext(AddressContext);

  const addressesSection =
    addresses.length > 0 ? (
      addresses.map((address) => <AddressCard key={address.firstName + address.lastName} address={address} />)
    ) : (
      <Grid item container xs={12}>
        <Typography color="textSecondary" variant="subtitle2">
          Nothing to show
        </Typography>
      </Grid>
    );

  return (
    <Grid item container xs={12} spacing={2} component="ul">
      {addressesSection}
    </Grid>
  );
};

export default AddressesList;
