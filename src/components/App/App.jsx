import React from 'react';
import {
  AppBar,
  Toolbar,
  CssBaseline,
  CircularProgress,
} from '@material-ui/core';

import styles from './App.module.css';
// import EpisodeList from '../EpisodeList';
// import UserForm from '../UserForm';
// import logo from '../../logo.svg';
import Service from '../../Service';
import Sidebar from '../Sidebar/Sidebar';
import AddSourceDialog from '../AddSourceDialog/AddSourceDialog';
import SourceView from '../SourceView/SourceView';

let sourceId = 0;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sources: [
        {
          id: 0,
          title: 'tut by',
          url: 'https://news.tut.by/rss/index.rss',
        },
        {
          id: 1,
          title: 'nasa',
          url: 'https://www.nasa.gov/rss/dyn/breaking_news.rss',
        },
        {
          id: 2,
          title: 'Yandex auto',
          url: 'https://news.yandex.ru/auto.rss',
        },
      ],
      selectedSourceId: 1,
      isAddDialog: false,
      loading: false,
      sourceAddError: null,
      rssItems: null,
    };

    this.setSource = this.setSource.bind(this);
    this.toggleSourceAddDialog = this.toggleSourceAddDialog.bind(this);
    this.handleSourceAdd = this.handleSourceAdd.bind(this);
  }

  async componentDidMount() {
    this.setNews();
  }

  componentDidUpdate(prevProps, prevState) {
    const { selectedSourceId } = this.state;

    if (selectedSourceId !== prevState.selectedSourceId) {
      this.setNews();
    }
  }

  async setNews() {
    const { selectedSourceId, sources } = this.state;

    if (selectedSourceId === null) return;

    const currentSource = sources.find((source) => source.id === selectedSourceId);

    this.setState({ loading: true, selectedSourceId: currentSource.id }, async () => {
      const rss = await Service.getFeed(currentSource.url);

      this.setState({ rssItems: rss.items || [], loading: false });
    });
  }

  setSource(sourceId) {
    this.setState({ selectedSourceId: sourceId });
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
      sources, isAddDialog, sourceAddError, loading, selectedSourceId, rssItems,
    } = this.state;

    return (
      <>
        <CssBaseline />
        <div className={styles.container}>
          <nav className={styles.nav}>
            <Sidebar
              sources={sources}
              toggleDialog={this.toggleSourceAddDialog}
              onSourceClick={this.setSource}
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
          <main className={styles.main}>
            {loading && (
              <div className={styles.progress}><CircularProgress size={80} /></div>
            )}
            <div className={loading ? styles.progressBlock : ''}><SourceView rssItems={rssItems} /></div>
          </main>
        </div>
        {/* <AppBar position="fixed">
          <Toolbar>
          </Toolbar>
        </AppBar> */}
        {/* {!selectedSourceId && <SourceView />} */}
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
