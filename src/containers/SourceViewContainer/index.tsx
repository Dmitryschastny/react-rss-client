import { connect } from 'react-redux';

import SourceView from '../../components/SourceView';
import { ApplicationState } from '../../store';

export default connect((state: ApplicationState) => {
  if (state.sources.selectedSourceId !== null) {
    const currentSource = state.sources.byId[state.sources.selectedSourceId];

    if (state.feeds.feedsByUrl[currentSource.url]) {
      return {
        items: state.feeds.feedsByUrl[currentSource.url],
        title: currentSource.title,
        isLoading: state.feeds.isFetching
      }
    }
  }

  return {
    items: [],
    title: '',
    isLoading: state.feeds.isFetching,
  };
})(SourceView);
