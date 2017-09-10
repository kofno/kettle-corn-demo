import Kettle from './../Kettle';
import { observable, action, when } from 'mobx';

class CompleteData {
  @observable enabled: boolean;
  constructor(kettle: Kettle) {
    this.enabled = false;
    when(
      () => {
        if (kettle.videoState.kind === 'initialized') return false;
        const pos = kettle.videoState.position;
        return kettle.videoState.duration.map(d => d - 10 < pos).getOrElse(false);
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
