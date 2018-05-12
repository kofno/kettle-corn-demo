import * as React from 'react';
import { Kettle } from 'kettle-corn';
import { observer } from 'mobx-react';

interface Props {
  kettle: Kettle;
}

const VideoData: React.StatelessComponent<Props> = ({ kettle }): JSX.Element => {
  const { videoState } = kettle;
  return videoState.cata({
    initialized: () => <div>Initialized</div>,
    ready: () => <div>Ready to play</div>,
    playing: ({ position, duration }) => {
      return (
        <div>
          <div>Playing: {position.map(n => n.toFixed(0)).getOrElseValue('unknown')}</div>
          <div>Length: {duration.map(n => n.toFixed(0)).getOrElseValue('unknown')}</div>
        </div>
      );
    },
    paused: ({ position, duration }) => {
      return (
        <div>
          <div>Paused: {position.map(n => n.toFixed(0)).getOrElseValue('unknown')}</div>
          <div>Length: {duration.map(n => n.toFixed(0)).getOrElseValue('unknown')}</div>
        </div>
      );
    },
    ended: () => <div>Ended</div>,
    buffering: () => <div>Buffering</div>,
  });
};

export default observer(VideoData);
