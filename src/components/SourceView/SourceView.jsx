import React from 'react';
import {
  Card, CardActionArea, CardMedia, CardContent, Typography, Grid, CardActions, Button,
} from '@material-ui/core';

import styles from './SourceView.module.css';

export default function SourceView({ rssItems }) {
  if (!rssItems) return null;

  console.log(rssItems);
  return (
    <div className={styles.container}>
      <Typography variant="h1" component="h2" gutterBottom>
        Nasa
      </Typography>
      <Grid container spacing={4}>
        {rssItems.map((item, index) => (
          <Grid key={index} item className={styles.gridItem}>
            <Card className={styles.card}>
              <CardActionArea>
                {item.enclosure && (
                  <CardMedia
                    component="img"
                    alt={item.title}
                    image={item.enclosure.url}
                    title={item.title}
                  />
                )}
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {item.contentSnippet}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary" className={styles.cardButton}>
                  Read
                </Button>
                <Button size="small" color="primary" className={styles.cardButton}>
                  Source
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
