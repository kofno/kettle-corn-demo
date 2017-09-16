import { observable, action } from 'mobx';
import { VideoSource, YouTube, Vimeo } from './VideoSource';

class VideoPicker {
  @observable source: VideoSource = new Vimeo();

  @action
  youTube() {
    this.source = new YouTube();
  }

  @action
  vimeo() {
    this.source = new Vimeo();
  }
}

export default VideoPicker;
