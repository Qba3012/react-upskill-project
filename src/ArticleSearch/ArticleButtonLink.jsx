import { Button } from "@material-ui/core";

const ArticleButtonLink = ({ url, label }) => {
  return (
    <Button variant="contained" color="primary" href={url} target="_blank">
      {label}
    </Button>
  );
};

export default ArticleButtonLink;
