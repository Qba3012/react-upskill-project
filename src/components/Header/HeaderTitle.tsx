import { Typography } from "@material-ui/core";
import { FC } from "react";
import { Route, Switch } from "react-router-dom";
import classes from "./HeaderTitle.module.css";

const HeaderTitle:FC = () => {
    return (
      <Switch>
        <Route path="/" exact>
          <Typography variant="h5" className={classes.header}>
            Home
          </Typography>
        </Route>
        <Route path="/wiki-search" exact>
          <Typography variant="h5" className={classes.header}>
            Wiki search
          </Typography>
        </Route>
        <Route path="/location-search" exact>
          <Typography variant="h5" className={classes.header}>
            Location search
          </Typography>
        </Route>
      </Switch>
    );
}

export default HeaderTitle;