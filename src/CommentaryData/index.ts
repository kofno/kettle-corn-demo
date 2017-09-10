import { computed } from 'mobx';
import Kettle from './../Kettle';

type Seconds = number;

export interface Commentary {
  key: string;
  content: string;
  start: Seconds;
  end: Seconds;
}

const isCurrent = (time: Seconds) => (c: Commentary): boolean => c.start <= time && c.end > time;
const revSort = (c1: Commentary, c2: Commentary): number => {
  if (c1.start > c2.start) return -1;
  if (c1.start < c2.start) return 1;
  return 0;
};

class CommentaryData {
  private kettle: Kettle;
  private commentaries: Commentary[];

  constructor(kettle: Kettle, commentaries: Commentary[]) {
    this.kettle = kettle;
    this.commentaries = commentaries;
  }

  @computed
  get current(): Commentary[] {
    if (this.kettle.videoState.kind === 'initialized') {
      return [];
    }
    const time = this.kettle.videoState.position;
    return this.commentaries.filter(isCurrent(time)).sort(revSort);
  }
}

export default CommentaryData;
