import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./Components/LandingPage/LandingPage";
import Home from "./Components/Home/Home";
import ActivityCreate from "./Components/ActivityCreate/ActivityCreate";
import Detail from "./Components/Detail/Detail";
import NavBar from "./Components/NavBar/NavBar";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={LandingPage} />
        <Route path="/countries" component={NavBar} />
        <Route exact path="/countries" component={Home} />
        <Route exact path="/countries/:id" component={Detail} />
        <Route exact path="/activities">
          <NavBar />
          <ActivityCreate />
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
