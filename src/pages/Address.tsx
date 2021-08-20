import { Grid } from "@material-ui/core";
import { FC } from "react";
import LocationSearchBar from "../components/LocationSearch/LocationSearchBar";

const Address: FC = () => {
  return (
    <Grid item container xs={10} md={8} spacing={5}>
      <LocationSearchBar />
    </Grid>
  );
};

export default Address;
