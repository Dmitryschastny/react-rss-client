import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import Rss from '../Rss';
import SignInContainer from '../../containers/SignInContainer';
import SignUp from '../SignUp';

class App extends React.Component<{}> {
  constructor(props: {}) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/signin">
            <SignInContainer />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/">
            <Rss />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
