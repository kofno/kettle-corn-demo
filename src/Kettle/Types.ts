import { Maybe } from 'maybeasy';

export type Seconds = number;

export interface Initialized {
  kind: 'initialized';
}

export interface Ready {
  kind: 'ready';
  position: Seconds;
  duration: Maybe<Seconds>;
}

export interface Playing {
  kind: 'playing';
  position: Seconds;
  duration: Maybe<Seconds>;
}

export interface Paused {
  kind: 'paused';
  position: Seconds;
  duration: Maybe<Seconds>;
}

export interface Ended {
  kind: 'ended';
  position: Seconds;
  duration: Maybe<Seconds>;
}

export interface Buffering {
  kind: 'buffering';
  position: Seconds;
  duration: Maybe<Seconds>;
}

export type VideoState = Initialized | Ready | Playing | Paused | Ended | Buffering;

export interface Play {
  kind: 'play';
}

export interface Pause {
  kind: 'pause';
}

export interface SeekTo {
  kind: 'seek-to';
  position: Seconds;
}

export type VideoMessage = Play | Pause | SeekTo;

// -- Helpers
export const initialized = (): VideoState => ({ kind: 'initialized' });
export const ready = (position: Seconds, duration: Maybe<Seconds>): VideoState => ({
  kind: 'ready',
  position,
  duration,
});
export const buffering = (position: Seconds, duration: Maybe<Seconds>): VideoState => ({
  kind: 'buffering',
  position,
  duration,
});
export const ended = (position: Seconds, duration: Maybe<Seconds>): VideoState => ({
  kind: 'ended',
  position,
  duration,
});
export const playing = (position: Seconds, duration: Maybe<Seconds>): VideoState => ({
  kind: 'playing',
  position,
  duration,
});
export const paused = (position: Seconds, duration: Maybe<Seconds>): VideoState => ({
  kind: 'paused',
  position,
  duration,
});

// -- message helpers
export const seekTo = (position: Seconds): VideoMessage => ({
  kind: 'seek-to',
  position,
});
