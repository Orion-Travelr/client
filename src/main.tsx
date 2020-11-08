import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import Spinner from "@/common/Spinner";
import {store} from "@/context/store";
import PlanetContainer from "@/components/planet-container";
import PlanetsContainer from "@/components/planets-container";
import HomeContainer from "@/components/home-container";

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Spinner/>
      <Router>
        <Switch>
          <Route exact path="/" component={HomeContainer} />
          <Route exact path="/planets" component={PlanetsContainer} />
          <Route exact path="/planets/:id" component={PlanetContainer} />
        </Switch>
      </Router>
    </div>
  </Provider>,
  document.getElementById('app')
);
