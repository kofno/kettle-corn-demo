import * as React from 'react';
import './App.css';
import { useStrict } from 'mobx';
import { YouTube, Kettle } from 'kettle-corn';
import VideoData from './VideoData';
import CommentaryData, { Commentary } from './CommentaryData';
import CommentaryView from './CommentaryView';
import SkipBack from './SkipBack';
import CompleteButton from './CompleteButton';
import CompleteData from './CompleteButton/CompleteData';
import Slides from './Slides';
import SlideData from './Slides/Data';

useStrict(true);

const logo = require('./logo.svg');

const commentaries: Commentary[] = [
  {
    key: '1',
    content:
      '30 But he that ye be hurt, or drink, I will hear; therefore whereof \n' +
      'these things which were gathered twice as it came up the way; and saith\n' +
      'the testimony unto the voice of the altar to pass in blood: and fall of\n' +
      'time of the males. 26 And the sons and took him, he said unto them,\n' +
      'Wherefore take his covers to the Lord, wherefore he him; and house of a\n' +
      'vow unto you and questions avoid, knowing that God heard that the LORD;\n' +
      'and gave him pray.',
    start: 10,
    end: 20,
  },
  {
    key: '2',
    content:
      'She replied Wickham; and an hour which had only meant I suppose, is a\n' +
      'friend were none since that the place him!" thought of candour, "in a\n' +
      'lucky idea on the housekeeper, who believed you. I took it immediately.',
    start: 25,
    end: 55,
  },
  {
    key: '3',
    content:
      "President Nixon: Now you in '68, was transferred to leak there were\n" +
      'doing on there, [unclear] which is a number of the Commissioner and he\n' +
      'is. I said, "Well, it\'s obvious the obstruction-of-justice situation.\n' +
      'It’ll cost money. It’s dangerous. Nobody, nothing--people around for the\n' +
      'resignations of appointments as tough thing I mean, I went to leak there\n' +
      "were about [Richard] Kleindienst∇- President Nixon: All right, fine. I'm\n" +
      "going after, you know how to, that sort. They-they're-some of that.\n" +
      'He must be paid. Although, I just say, --œWell, we can make-',
    start: 35,
    end: 130,
  },
];

const slides = [
  {
    id: 1,
    url: 'http://fpoimg.com/240x200?text=One',
    time: 0,
    show: true,
  },
  {
    id: 2,
    url: 'http://fpoimg.com/240x200?text=Two',
    time: 25,
    show: false,
  },
  {
    id: 3,
    url: 'http://fpoimg.com/240x200?text=Three',
    time: 50,
    show: true,
  },
  {
    id: 4,
    url: 'http://fpoimg.com/240x200?text=Four',
    time: 75,
    show: false,
  },
  {
    id: 5,
    url: 'http://fpoimg.com/240x200?text=Five',
    time: 100,
    show: true,
  },
];

class App extends React.Component {
  private kettle: Kettle;
  private commentary: CommentaryData;
  private completeData: CompleteData;
  private slideData: SlideData;

  constructor(props: {}) {
    super(props);
    this.kettle = new Kettle();
    this.commentary = new CommentaryData(this.kettle, commentaries);
    this.completeData = new CompleteData(this.kettle);
    this.slideData = new SlideData(this.kettle, slides);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <div className="container">
          <div>
            <SkipBack kettle={this.kettle} />
            <CompleteButton store={this.completeData} />
            <VideoData kettle={this.kettle} />
            <YouTube id="mah-video" className="vid" videoId="2xF1GYDqwpM" kettle={this.kettle} />
          </div>
          <div>
            <CommentaryView commentary={this.commentary} />
          </div>
        </div>
        <Slides data={this.slideData} />
      </div>
    );
  }
}

export default App;
