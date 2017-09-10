import * as React from 'react';
import Kettle from './../Kettle';
import { observer } from 'mobx-react';

interface Props {
  kettle: Kettle;
}

const VideoData: React.StatelessComponent<Props> = ({ kettle }): JSX.Element => {
  const { videoState } = kettle;
  switch (videoState.kind) {
    case 'initialized':
      return <div>Initialized</div>;

    case 'ready':
      return <div>Ready to play</div>;

    case 'playing':
      return (
        <div>
          <div>Playing: {videoState.position.toFixed(0)}</div>
          <div>Length: {videoState.duration.map(n => n.toFixed(0)).getOrElse('unknown')}</div>
        </div>
      );

    case 'paused':
      return (
        <div>
          <div>Paused: {videoState.position.toFixed(0)}</div>
          <div>Length: {videoState.duration.map(n => n.toFixed(0)).getOrElse('unknown')}</div>
        </div>
      );

    case 'ended':
      return <div>Ended</div>;

    case 'buffering':
      return <div>Buffering</div>;
  }
};

export default observer(VideoData);
