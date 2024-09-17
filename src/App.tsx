import { FC } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import ArticleSearchContainer from "./pages/ArticleSearchContainer";
import CustomDialog from "./components/Dialog/CustomDialog";
import Layout from "./layout/Layout";
import Home from "./pages/Home";

const App: FC = () => (
  <Layout>
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/wiki-search" exact>
        <ArticleSearchContainer />
      </Route>
      <Route path="/location-search" exact>
        <Redirect to="/" />
      </Route>
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
    <CustomDialog />
  </Layout>
);

export default App;
