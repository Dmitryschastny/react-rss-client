import React from 'react';
import { connect } from 'react-redux';
import {
  Card, CardActionArea, CardMedia, CardContent, Typography, Grid, CircularProgress,
} from '@material-ui/core';

import styles from './SourceView.module.css';

function SourceView({ items, title, isLoading }) {
  const dateOptions = {
    year: 'numeric', month: 'long', day: 'numeric',
  };

  return (
    <>
      {isLoading && (
        <div className={`${styles.progress} containerSidebarOffest`}><CircularProgress size={80} /></div>
      )}
      <div className={isLoading ? styles.progressBlock : ''}>
        <div className={styles.contentContainer}>
          <Typography variant="h1" component="h2" gutterBottom>
            {title}
          </Typography>
          <Grid container spacing={4}>
            {items.map((item, index) => (
              <Grid key={index} item className={styles.gridItem}>
                <Card className={styles.card}>
                  <CardActionArea className={styles.activeArea} onClick={() => window.open(item.link, '_blank')}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {item.title}
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary" component="p" align="right">
                        {(new Date(item.isoDate)).toLocaleDateString('en-US', dateOptions)}
                      </Typography>
                    </CardContent>
                    {item.enclosure && (
                      <CardMedia
                        component="img"
                        alt={item.title}
                        image={item.enclosure.url}
                        title={item.title}
                      />
                    )}
                    <CardContent>
                      <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
                        {item.contentSnippet}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </>
  );
}

export default connect((state) => {
  const currentSource = state.sources.items.find(
    (item) => (item.id === state.sources.selectedSourceId),
  );

  let items = [];

  if (currentSource && state.feeds.feedsByUrl[currentSource.url]) {
    items = state.feeds.feedsByUrl[currentSource.url];
  }

  return {
    items,
    title: currentSource ? currentSource.title : '',
    isLoading: state.feeds.isFetching,
  };
})(SourceView);
