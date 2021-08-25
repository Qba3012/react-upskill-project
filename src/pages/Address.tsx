import { Grid } from "@material-ui/core";
import { FC, useContext } from "react";
import AddressFields from "../components/LocationSearch/AddressFields";
import LocationSearchBar from "../components/LocationSearch/LocationSearchBar";
import LocationContext from "../store/location-context";

const Address: FC = () => {
  const locationCtx = useContext(LocationContext);

  return (
    <Grid item container xs={10} md={8} spacing={5}>
      <LocationSearchBar />
      {locationCtx.address && <AddressFields address={locationCtx.address}/>}
    </Grid>
  );
};

export default Address;
