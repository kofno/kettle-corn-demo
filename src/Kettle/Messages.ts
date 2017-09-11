export type Seconds = number;

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
export const seekTo = (position: Seconds): VideoMessage => ({
  kind: 'seek-to',
  position,
});

export const play = (): VideoMessage => ({ kind: 'play' });
export const pause = (): VideoMessage => ({ kind: 'pause' });
