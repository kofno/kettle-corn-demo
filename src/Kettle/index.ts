/**
 * Kettle - Tracks the video stats and progress. Stores requests for interaction
 * with a currently playing video.
 */
import { observable, action } from 'mobx';
import { VideoState, VideoMessage, Seconds, seekTo } from './Types';
import { Maybe, fromNullable } from 'maybeasy';

class Kettle {
  @observable videoState: VideoState = { kind: 'initialized' };
  @observable videoMessage: VideoMessage[] = [];

  @action
  setVideoState(state: VideoState) {
    this.videoState = state;
  }

  @action
  sendMessage(msg: VideoMessage) {
    this.videoMessage.push(msg);
  }

  @action
  popMessage(): Maybe<VideoMessage> {
    return fromNullable(this.videoMessage.pop());
  }

  @action
  seekTo(time: Seconds) {
    this.sendMessage(seekTo(time));
  }
}

export default Kettle;