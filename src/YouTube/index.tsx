import * as React from 'react';
import { reaction } from 'mobx';
import { observer } from 'mobx-react';
import { Maybe, nothing, just } from 'maybeasy';
import loadYouTube from './../YouTubeLoader';
import Kettle from './../Kettle';
import {
  VideoState,
  initialized,
  ready,
  buffering,
  playing,
  paused,
  ended,
} from './../Kettle/Types';

export const assertNever = (x: never): never => {
  throw new Error(`Unexpected object: ${x}`);
};

export interface Props {
  id: string;
  className: string;
  videoId: string;
  kettle: Kettle;
}

@observer
class YouTube extends React.Component<Props, {}> {
  private container: HTMLDivElement | null;

  mapState = (state: YT.PlayerState, position: number, duration: Maybe<number>): VideoState => {
    switch (state) {
      case YT.PlayerState.BUFFERING:
        return buffering(position, duration);
      case YT.PlayerState.CUED:
        return ready(position, duration);
      case YT.PlayerState.ENDED:
        return ended(position, duration);
      case YT.PlayerState.PAUSED:
        return paused(position, duration);
      case YT.PlayerState.PLAYING:
        return playing(position, duration);
      case YT.PlayerState.UNSTARTED:
        return initialized();
    }
  };

  updateKettle = (player: YT.Player) => {
    // tslint:disable-next-line:no-console
    console.log('update kettle');
    const { kettle } = this.props;
    const state = player.getPlayerState();
    const time = player.getCurrentTime();
    const d = player.getDuration();
    const duration = d === 0 ? nothing() : just(d);
    return kettle.setVideoState(this.mapState(state, time, duration));
  };

  registerKettleReactions = (kettle: Kettle, player: YT.Player) => {
    reaction(
      () => kettle.videoMessage.length,
      (_length: number) => {
        kettle.popMessage().map(msg => {
          switch (msg.kind) {
            case 'play':
              return player.playVideo();
            case 'pause':
              return player.pauseVideo();
            case 'seek-to':
              return player.seekTo(msg.position, true);
            default:
              return assertNever(msg);
          }
        });
      },
    );
  };

  componentDidMount() {
    const { videoId, kettle } = this.props;
    loadYouTube.fork(
      err => console.warn(err),
      () => {
        if (!this.container) return;
        const player = new YT.Player(this.container, {
          videoId,
          playerVars: {
            enablejsapi: YT.JsApi.Enable,
          },
        });
        player.addEventListener('onReady', ({ target }) => {
          this.registerKettleReactions(kettle, target);
          this.updateKettle(target);
          // YouTube doesn't fire continual updates while playing or scrubbing
          setInterval(() => {
            this.updateKettle(target);
          }, 250);
        });
        player.addEventListener('onStateChange', ({ target }) => this.updateKettle(target));
      },
    );
  }

  refContainer = (container: HTMLDivElement | null) => {
    this.container = container;
  };

  render() {
    const { id, className } = this.props;
    return (
      <span>
        <div id={id} className={className} ref={this.refContainer} />
      </span>
    );
  }
}

export default YouTube;