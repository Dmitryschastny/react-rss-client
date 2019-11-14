import React from 'react';
import { GridList, GridListTile, ListSubheader } from '@material-ui/core';

export default function SourcesView() {
  return (
    <GridList cellHeight={180}>
      <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
        <ListSubheader component="div">December</ListSubheader>
      </GridListTile>
    </GridList>
  );
}
