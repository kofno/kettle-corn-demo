import { Seconds } from './../Types';
import { Maybe, nothing } from 'maybeasy';

export interface Timings {
  position: Maybe<Seconds>;
  duration: Maybe<Seconds>;
}

export interface Cata<T> {
  initialized: () => T;
  ready: (timings: Timings) => T;
  playing: (timings: Timings) => T;
  paused: (timings: Timings) => T;
  ended: (timings: Timings) => T;
  buffering: (timings: Timings) => T;
}

abstract class VideoState {
  readonly position: Maybe<Seconds>;
  readonly duration: Maybe<Seconds>;

  constructor(position: Maybe<Seconds>, duration: Maybe<Seconds>) {
    this.position = position;
    this.duration = duration;
  }

  abstract cata<T>(fold: Cata<T>): T;
}

export default VideoState;

export class Initialized extends VideoState {
  constructor() {
    super(nothing(), nothing());
  }

  cata<T>(fold: Cata<T>): T {
    return fold.initialized();
  }
}

export class Ready extends VideoState {
  cata<T>(fold: Cata<T>): T {
    return fold.ready({ position: this.position, duration: this.duration });
  }
}

export class Playing extends VideoState {
  cata<T>(fold: Cata<T>): T {
    return fold.playing({ position: this.position, duration: this.duration });
  }
}

export class Paused extends VideoState {
  cata<T>(fold: Cata<T>): T {
    return fold.paused({ position: this.position, duration: this.duration });
  }
}

export class Ended extends VideoState {
  cata<T>(fold: Cata<T>): T {
    return fold.ended({ position: this.position, duration: this.duration });
  }
}

export class Buffering extends VideoState {
  cata<T>(fold: Cata<T>): T {
    return fold.buffering({ position: this.position, duration: this.duration });
  }
}
