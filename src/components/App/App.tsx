import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import Rss from '../Rss/Rss';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';

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
            <SignIn />
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
