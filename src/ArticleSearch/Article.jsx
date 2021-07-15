import React from "react";
import classes from "./Article.css";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import ArticleButtonLink from "./ArticleButtonLink";

const Article = ({ title, snippet, url }) => {
  return (
    <Grid item xs={12}>
      <Card variant="outlined">
        <Grid container alignItems="center">
          <Grid item xs={12} sm={9} md={10}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {title}
              </Typography>
              <Typography
                align="justify"
                variant="body2"
                dangerouslySetInnerHTML={{ __html: snippet }}
              />
              {/* <Typography
                  align="justify"
                  variant="body2"
                >{snippet}</Typography> */}
            </CardContent>
          </Grid>
          <Grid item xs={12} sm={3} md={2}>
            <CardContent>
              <ArticleButtonLink url={url} label="Open" />
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

Article.propTypes = {};

export default Article;
