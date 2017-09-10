import { observable, computed, action } from 'mobx';
import Kettle from './../Kettle';
import { reverse } from 'ramda';
import { Maybe, fromNullable, nothing } from 'maybeasy';

export interface Slide {
  id: number;
  url: string;
  time: number;
  show: boolean;
}

class Data {
  @observable allSlides: Slide[];
  private kettle: Kettle;

  constructor(kettle: Kettle, slides: Slide[]) {
    this.kettle = kettle;
    this.allSlides = slides;
  }

  @computed
  get visibleSlides(): Slide[] {
    return this.allSlides.filter(s => s.show);
  }

  @computed
  get current(): Maybe<Slide> {
    if (this.kettle.videoState.kind === 'initialized') return nothing();
    const videoPos = this.kettle.videoState.position;
    const current = reverse(this.visibleSlides).find(s => s.time <= videoPos);
    return fromNullable(current);
  }

  isCurrent(candidate: Slide): boolean {
    return this.current.map(s => candidate.id === s.id).getOrElse(false);
  }

  @action
  seekTo(s: Slide) {
    this.kettle.seekTo(s.time);
  }
}

export default Data;
