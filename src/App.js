import logo from './logo.svg';
import './App.css';
import MainPage from "./MainPage";
import {Route, BrowserRouter, Switch} from "react-router-dom";
import TopPage from "./TopPage";
import {FilePage} from "./FilePage";
import {ArticlePage} from "./ArticlePage";

function App() {
  return (
      <BrowserRouter>
          <Switch>
              <Route path="/" exact component={MainPage} />
              <Route path="/top5" exact component={TopPage}/>
              <Route path="/article/:aid" component={ArticlePage}/>
              <Route path="/file/:filename" component={FilePage}/>
          </Switch>
      </BrowserRouter>
  );
}

export default App;
