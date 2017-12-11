import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

//AIzaSyDPe06Ies7FW9LnxeeA-YfIDcIOVyVILyA

const API_KEY = 'AIzaSyDPe06Ies7FW9LnxeeA-YfIDcIOVyVILyA';


// Create a new comonent
class App extends Component {

	constructor(props) {
		super(props);
 
		this.state = { 
			videos: [],
			selectedVideo: null 
		};

		this.videoSearch('nintendo');
	}

	videoSearch(term) {
		YTSearch({key: API_KEY, term}, (videos) => {
			this.setState({ 
				videos: videos,
				selectedVideo: videos[0]
			});

		});
		
	}

	render() {

		const videoSearch = _.debounce(term => {this.videoSearch(term)}, 300);

		return <div>
			<SearchBar onSearchTermChange={videoSearch}  />
			<VideoDetail video={this.state.selectedVideo} />
			<VideoList videos={this.state.videos} onVideoSelect={selectedVideo => this.setState({selectedVideo})} />
		</div>;
	}
}

//put on page

ReactDOM.render(<App />, document.querySelector('.container'));