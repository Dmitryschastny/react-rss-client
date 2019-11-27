import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Rss from '../Rss/Rss';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <BrowserRouter>
        <Route path="/">
          <Rss />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
      </BrowserRouter>
    );
  }
}

export default App;
