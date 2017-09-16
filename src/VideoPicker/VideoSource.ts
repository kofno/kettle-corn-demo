export interface Cata<T> {
  youtube: () => T;
  vimeo: () => T;
}

export abstract class VideoSource {
  abstract cata<T>(fold: Cata<T>): T;
}

export class YouTube extends VideoSource {
  cata<T>(fold: Cata<T>) {
    return fold.youtube();
  }
}

export class Vimeo extends VideoSource {
  cata<T>(fold: Cata<T>) {
    return fold.vimeo();
  }
}
