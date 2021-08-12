import { Grid } from "@material-ui/core";
import { FC } from "react";
import MainHeader from "../components/Header/MainHeader";

const Layout: FC = ({ children }) => {
  return (
    <>
      <MainHeader />
      <Grid container justify="center" component="main">
        {children}
      </Grid>
    </>
  );
};

export default Layout;
