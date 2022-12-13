import logo from './logo.svg';
import './App.css';
import MainPage from "./MainPage";
import {Routes, Route, BrowserRouter, Switch} from "react-router-dom";
import TopPage from "./TopPage";
import {FilePage} from "./FilePage";

function App() {
  return (
      <BrowserRouter>
          <Switch>
              <Route path="/" exact component={MainPage} />
              <Route path="/top5" exact component={TopPage}/>
              <Route path="/file/:filename" component={FilePage}/>
          </Switch>
      </BrowserRouter>
  );
}

export default App;
