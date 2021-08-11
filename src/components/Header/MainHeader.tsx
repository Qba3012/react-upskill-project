import { AppBar, Button, Toolbar } from "@material-ui/core";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LocationSearchingIcon from "@material-ui/icons/LocationSearching";
import classes from "./MainHeader.module.css";
import HeaderTitle from "./HeaderTitle";

const MainHeader: FC = () => {
  return (
    <AppBar position="sticky" className={classes.header}>
      <Toolbar component="nav">
        <HeaderTitle />
        <NavLink
          to={"/"}
          className={classes.button}
          activeClassName={classes.active}
          exact
        >
          <Button startIcon={<HomeIcon />}>Home</Button>
        </NavLink>
        <NavLink
          to={"/wiki-search"}
          className={classes.button}
          activeClassName={classes.active}
        >
          <Button startIcon={<SearchIcon />}>Wiki search</Button>
        </NavLink>
        <NavLink
          to={"/location-search"}
          className={classes.button}
          activeClassName={classes.active}
        >
          <Button startIcon={<LocationSearchingIcon />}>Location search</Button>
        </NavLink>
      </Toolbar>
    </AppBar>
  );
};

export default MainHeader;
