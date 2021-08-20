import { FC } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import ArticleSearchContainer from "./pages/ArticleSearchContainer";
import CustomDialog from "./components/UI/CustomDialog";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Address from "./pages/Address";

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
        <Address />
      </Route>
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
    <CustomDialog />
  </Layout>
);

export default App;
