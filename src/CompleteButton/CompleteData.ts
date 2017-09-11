import Kettle from './../Kettle';
import { observable, action, when } from 'mobx';

class CompleteData {
  @observable enabled: boolean;
  constructor(kettle: Kettle) {
    this.enabled = false;
    when(
      () => {
        return kettle.videoState.position
          .andThen(pos => kettle.videoState.duration.map(dur => dur - 10 < pos))
          .getOrElse(false);
      },
      () => {
        this.enable();
        // Could also post a message to a service somewhere
      },
    );
  }

  @action
  enable() {
    this.enabled = true;
  }
}

export default CompleteData;
