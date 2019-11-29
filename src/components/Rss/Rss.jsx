import React from 'react';
import {
  CssBaseline,
} from '@material-ui/core';

import styles from './Rss.module.css';
import Sidebar from '../Sidebar/Sidebar';
import SourceView from '../SourceView/SourceView';
import Header from '../Header/Header';

let sourceId = 3;

export default class Rss extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // isAddDialog: false,
      // isDeleteDialog: false,
      // deleteSourceId: null,
      // selectedSourceId: 1,
      isLoading: false,
      // sourceAddErrors: {},
      rssItems: null,
      isDrawerOpen: true,
    };

    this.setSource = this.setSource.bind(this);
    this.handleToggleDrawer = this.handleToggleDrawer.bind(this);
  }

  async componentDidMount() {
    // this.setNews();
  }

  componentDidUpdate(prevProps, prevState) {
    // const { selectedSourceId } = this.state;

    // if (selectedSourceId !== prevState.selectedSourceId) {
    //   this.setNews();
    // }
  }

  setSource(id) {
    this.setState({ selectedSourceId: id });
  }

  handleToggleDrawer() {
    this.setState((prevState) => ({ isDrawerOpen: !prevState.isDrawerOpen }));
  }

  render() {
    const {
      sources, isAddDialog, sourceAddErrors, isLoading, selectedSourceId, rssItems, isDeleteDialog,
      isDrawerOpen,
    } = this.state;

    // const currentSource = sources.find((source) => source.id === selectedSourceId);

    return (
      <>
        <CssBaseline />
        <Header isDrawerOpen={isDrawerOpen} onToggleDrawer={this.handleToggleDrawer} />
        <div className={styles.container}>
          <nav className={styles.nav} hidden={!isDrawerOpen}>
            <Sidebar
              sources={sources}
              toggleAddDialog={this.toggleSourceAddDialog}
              toggleDeleteDialog={this.toggleSourceDeleteDialog}
              onSourceClick={this.setSource}
              selectedSourceId={selectedSourceId}
              toggleDrawer={this.handleToggleDrawer}
            />
          </nav>
          <main className={styles.main}>
            <SourceView
              rssItems={rssItems}
              // title={currentSource ? currentSource.title : 'Rss from all sources'}
              isLoading={isLoading}
            />
          </main>
        </div>
      </>
    );
  }
}
