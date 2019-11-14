import React from 'react';
import {
  AppBar,
  Toolbar,
  CssBaseline,
} from '@material-ui/core';

import styles from './App.module.css';
// import EpisodeList from '../EpisodeList';
// import UserForm from '../UserForm';
// import logo from '../../logo.svg';
import Service from '../../Service';
import Sidebar from '../Sidebar/Sidebar';
import AddSourceDialog from '../AddSourceDialog/AddSourceDialog';
import SourcesView from '../SourcesView/SourcesView';

let sourceId = 0;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sources: [],
      selectedSourceId: null,
      isAddDialog: false,
      loading: false,
      sourceAddError: null,
    };

    this.toggleSourceAddDialog = this.toggleSourceAddDialog.bind(this);
    this.handleSourceAdd = this.handleSourceAdd.bind(this);
  }

  setSource(source) {
    this.setState({ selectedSourceId: source.id });
  }

  toggleSourceAddDialog() {
    this.setState((prevState) => ({ isAddDialog: !prevState.isAddDialog, sourceAddError: null }));
  }

  async handleSourceAdd(url) {
    const { sources } = this.state;

    this.setState({ loading: true });

    const isAlreadyExists = sources.find((source) => source.url === url);

    if (isAlreadyExists) {
      this.setState({
        sourceAddError: 'Rss with this source has already been added.',
        loading: false,
      });
      return;
    }

    if (await Service.getFeed(url)) {
      this.setState({
        sources: [...sources, {
          id: sourceId,
          title: 'test',
          url,
        }],
        isAddDialog: false,
        loading: false,
      });

      sourceId += 1;

      return;
    }

    this.setState({
      sourceAddError: 'Error occured while parsing RSS, try a new one.',
      loading: false,
    });
  }

  render() {
    const {
      sources, isAddDialog, sourceAddError, loading, selectedSourceId,
    } = this.state;

    return (
      <>
        <CssBaseline />
        <div className={styles.container}>
          <nav className={styles.nav}>
            <Sidebar
              sources={sources}
              toggleDialog={this.toggleSourceAddDialog}
              onSourceClick={this.setSource.bind(this)}
              selectedSourceId={selectedSourceId}
            />
          </nav>
          <AddSourceDialog
            isAddDialog={isAddDialog}
            onSourceAdd={this.handleSourceAdd}
            toggleDialog={this.toggleSourceAddDialog}
            error={sourceAddError}
            loading={loading}
          />
          <main>
            <SourcesView />
          </main>
        </div>
        {/* <AppBar position="fixed">
          <Toolbar>
          </Toolbar>
        </AppBar> */}
        {/* {!selectedSourceId && <SourcesView />} */}
      </>

      // <div className='App'>
      //   <header className='App-header'>
      //     <h1 className='App-title'>quick-feed</h1>
      //   </header>
      //   <UserForm
      //     getFeed={this.getFeed}
      //     onClick={() => this.setState({ loading: true })}
      //   />
      //   {this.state.error ? this.renderAlert() : <div />}
      //   {!this.state.loading ? (
      //     <p>Please enter an RSS feed</p>
      //   ) : (
      //     <div>
      //       <img src={logo} className='App-logo' alt='App Logo' />
      //     </div>
      //   )}
      //   <EpisodeList
      //     episodes={this.state.episodes}
      //     program_title={this.state.program_title}
      //     program_description={this.state.program_description}
      //     program_image={this.state.program_image}
      //     loading={this.props.loading}
      //   />
      // </div>
    );
  }
}

export default App;
