import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import { FC } from "react";
import classes from "./Home.module.css";

const Home: FC = () => {
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h4" color="primary">Welcome to</Typography>
        <Typography variant="h2">Wikipedia Finder</Typography>
      </CardContent>
      <CardMedia
        image="./images/wikipedia.png"
        component="img"
        alt="Wikipedia"
        title="Wikipedia"
        className={classes.image}
      ></CardMedia>
    </Card>
  );
};

export default Home;
