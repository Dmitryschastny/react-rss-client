import React from 'react';
import {
  CssBaseline,
  CircularProgress,
  Typography,
} from '@material-ui/core';

import styles from './App.module.css';
// import EpisodeList from '../EpisodeList';
// import UserForm from '../UserForm';
// import logo from '../../logo.svg';
import Service from '../../Service';
import Sidebar from '../Sidebar/Sidebar';
import AddSourceDialog from '../AddSourceDialog/AddSourceDialog';
import SourceView from '../SourceView/SourceView';

let sourceId = 3;

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
      sourceAddErrors: {},
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

    if (selectedSourceId !== null) {
      const currentSource = sources.find((source) => source.id === selectedSourceId);

      this.setState({ loading: true }, async () => {
        const rss = await Service.getFeed(currentSource.url);

        this.setState({
          rssItems: rss.items || [],
          loading: false,
          selectedSourceId: currentSource.id,
        });
      });
    } else {
      const results = [];

      for (let i = 0; i < sources.length; i += 1) {
        results.push(Service.getFeed(sources[i].url));
      }

      this.setState({ loading: true }, async () => {
        const rsses = await Promise.all(results);

        const rssesItems = rsses.reduce((prev, rss) => [...prev, ...rss.items], []);

        rssesItems.sort((a, b) => {
          if (new Date(a.isoDate) < new Date(b.isoDate)) {
            return 1;
          }

          if (new Date(a.isoDate) > new Date(b.isoDate)) {
            return -1;
          }

          return 0;
        });

        this.setState({
          rssItems: rssesItems,
          loading: false,
        });
      });
    }
  }

  setSource(id) {
    this.setState({ selectedSourceId: id });
  }

  async handleSourceAdd(url) {
    const { sources } = this.state;
    const errors = {};
    const isAlreadyExists = sources.find((source) => source.url === url);

    this.setState({ loading: true });

    if (isAlreadyExists) {
      errors.url = 'Rss with this source has already been added.';
    }

    const rss = await Service.getFeed(url);

    if (!rss) {
      errors.url = 'Error occured while parsing RSS, try a new one.';
    }

    if (!Object.getOwnPropertyNames(errors).length) {
      this.setState({
        sources: [...sources, {
          id: sourceId,
          title: rss.title,
          url,
        }],
        isAddDialog: false,
        loading: false,
      });

      sourceId += 1;

      return;
    }

    this.setState({
      sourceAddErrors: errors,
      loading: false,
    });
  }

  toggleSourceAddDialog() {
    this.setState((prevState) => ({ isAddDialog: !prevState.isAddDialog, sourceAddErrors: {} }));
  }

  render() {
    const {
      sources, isAddDialog, sourceAddErrors, loading, selectedSourceId, rssItems,
    } = this.state;

    const currentSource = sources.find((source) => source.id === selectedSourceId);
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
            errors={sourceAddErrors}
            loading={loading}
          />
          <main className={styles.main}>
            {loading && (
              <div className={styles.progress}><CircularProgress size={80} /></div>
            )}
            <div className={loading ? styles.progressBlock : ''}>
              <div className={styles.contentContainer}>
                <Typography variant="h1" component="h2" gutterBottom>
                  {currentSource ? currentSource.title : 'Rss from all sources'}
                </Typography>
                <SourceView
                  rssItems={rssItems}
                  onCardClick={this.setArticleId}
                />
              </div>
            </div>
          </main>
        </div>
      </>
    );
  }
}

export default App;
