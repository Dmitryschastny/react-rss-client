import React from 'react';
import {
  CssBaseline,
} from '@material-ui/core';

import styles from './Rss.module.css';
import Sidebar from '../Sidebar/Sidebar';
import SourceView from '../../containers/SourceView/SourceView';
import Header from '../Header/Header';

export default class Rss extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDrawerOpen: true,
    };

    this.handleToggleDrawer = this.handleToggleDrawer.bind(this);
  }

  handleToggleDrawer() {
    this.setState((prevState) => ({ isDrawerOpen: !prevState.isDrawerOpen }));
  }

  render() {
    const { isDrawerOpen } = this.state;

    return (
      <>
        <CssBaseline />
        <Header isDrawerOpen={isDrawerOpen} onToggleDrawer={this.handleToggleDrawer} />
        <div className={styles.container}>
          <nav className={styles.nav} hidden={!isDrawerOpen}>
            <Sidebar toggleDrawer={this.handleToggleDrawer} />
          </nav>
          <main className={styles.main}>
            <SourceView />
          </main>
        </div>
      </>
    );
  }
}


  // async setNews() {
  //   const { selectedSourceId, items } = this.state;

  //   if (selectedSourceId !== null) {
  //     const currentSource = items.find((source) => source.id === selectedSourceId);

  //     this.setState({ isLoading: true }, async () => {
  //       const rss = await Service.getFeed(currentSource.url);

  //       this.setState({
  //         rssItems: rss.items || [],
  //         isLoading: false,
  //         selectedSourceId: currentSource.id,
  //       });
  //     });
  //   } else {
  //     const results = [];

  //     for (let i = 0; i < items.length; i += 1) {
  //       results.push(Service.getFeed(items[i].url));
  //     }

  //     this.setState({ isLoading: true }, async () => {
  //       const rsses = await Promise.all(results);

  //       const rssesItems = rsses.reduce((prev, rss) => [...prev, ...rss.items], []);

  //       rssesItems.sort((a, b) => {
  //         if (new Date(a.isoDate) < new Date(b.isoDate)) {
  //           return 1;
  //         }

  //         if (new Date(a.isoDate) > new Date(b.isoDate)) {
  //           return -1;
  //         }

  //         return 0;
  //       });

  //       this.setState({
  //         rssItems: rssesItems,
  //         isLoading: false,
  //       });
  //     });
  //   }
  // }
