import { Button } from "@material-ui/core";
import { FC } from "react";

type Props = {
  url: string;
  label: string;
};

const ArticleButtonLink: FC<Props> = ({ url, label }) => {
  return (
    <Button variant="contained" color="primary" href={url} target="_blank">
      {label}
    </Button>
  );
};

export default ArticleButtonLink;
