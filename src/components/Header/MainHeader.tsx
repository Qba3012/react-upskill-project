import { AppBar, Button, Toolbar } from "@material-ui/core";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import ContactsIcon from "@material-ui/icons/Contacts";
import classes from "./MainHeader.module.css";
import HeaderTitle from "./HeaderTitle";

const MainHeader: FC = () => {
  return (
    <AppBar position="sticky" className={classes.header}>
      <Toolbar component="nav">
        <HeaderTitle />
        <NavLink to={"/"} className={classes.button} activeClassName={classes.active} exact>
          <Button startIcon={<HomeIcon />}>Home</Button>
        </NavLink>
        <NavLink to={"/wiki-search"} className={classes.button} activeClassName={classes.active}>
          <Button startIcon={<SearchIcon />}>Wiki search</Button>
        </NavLink>
        <NavLink to={"/addresses"} className={classes.button} activeClassName={classes.active}>
          <Button startIcon={<ContactsIcon />}>Addresses</Button>
        </NavLink>
      </Toolbar>
    </AppBar>
  );
};

export default MainHeader;
