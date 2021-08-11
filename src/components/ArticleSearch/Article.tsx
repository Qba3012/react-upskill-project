import { FC } from "react";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import classes from "./Article.module.css"
import ArticleButtonLink from "./ArticleButtonLink";

type Props = {
  title: string,
  snippet: string,
  url: string
}

const Article: FC<Props> = ({ title, snippet, url }) => {
  return (
    <Grid item xs={12} component="li" className={classes.article}>
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

export default Article;