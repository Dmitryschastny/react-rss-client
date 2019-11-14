import React from "react";

import "./App.css";
// import EpisodeList from "../EpisodeList";
// import UserForm from "../UserForm";
// import logo from "../../logo.svg";
import Service from '../../Service';
import Sidebar from '../Sidebar/Sidebar';
import AddSourceDialog from '../AddSourceDialog/AddSourceDialog'

let sourceId = 0;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sources: [
        {
          title: 'tut.by',
          url: 'https://news.tut.by/rss/index.rss'
        }
      ],
      selectedSourcesIds: [],
      isAddDialog: false,
      loading: false,
      sourceAddError: null
    }
  }
  // state = {
  //   episodes: null,
  //   loading: false,
  //   program_title: null,
  //   program_description: null,
  //   program_image: null
  // };

  // getFeed = async e => {
  //   this.setState({ loading: !this.state.loading });

  //   e.preventDefault();

  //   const url = e.target.elements.feed_url.value;

  //   const feed = await Service.getFeed(url);

  //   if (feed) {
  //     this.setState({
  //       episodes: feed.items,
  //       program_title: feed.title,
  //       loading: !this.state.loading,
  //       program_image: feed.image.url,
  //       program_description: feed.description,
  //       error: false
  //     });
  //   } else {
  //     this.setState({ error: true, loading: false });
  //   }
  // };

  // handleClose = () => {
  //   this.setState({
  //     error: false,
  //     loading: false,
  //   });
  // };

  toggleSourceAddDialog() {
    this.setState({ isAddDialog: !this.state.isAddDialog, sourceAddError: null })
  }

  async handleSourceAdd(url) {
    const { sources } = this.state;

    this.setState({ loading: true })

    const isAlreadyExists = sources.find(source => source.url === url);

    if (isAlreadyExists) {
      this.setState({
        sourceAddError: 'Rss with this source has already been added.',
        loading: false
      });
      return;
    }

    if (await Service.getFeed(url)) {
      this.setState({
        sources: [...sources, {
          title: 'test', url
        }],
        isAddDialog: false,
        loading: false
      });

      return;
    }

    this.setState({
      sourceAddError: 'Error occured while parsing RSS, try a new one.',
      loading: false
    });
  }

  render() {
    const { sources, isAddDialog, sourceAddError, loading } = this.state;

    return (
      <>
        <Sidebar
          sources={sources}
          toggleDialog={this.toggleSourceAddDialog.bind(this)}
        />
        <AddSourceDialog
          isAddDialog={isAddDialog}
          onSourceAdd={this.handleSourceAdd.bind(this)}
          toggleDialog={this.toggleSourceAddDialog.bind(this)}
          error={sourceAddError}
          loading={loading}
        />
      </>

      // <div className="App">
      //   <header className="App-header">
      //     <h1 className="App-title">quick-feed</h1>
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
      //       <img src={logo} className="App-logo" alt="App Logo" />
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
