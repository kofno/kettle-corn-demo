import { observable, computed, action } from 'mobx';
import { Kettle } from 'kettle-corn';
import { reverse } from 'ramda';
import { Maybe, fromNullable } from 'maybeasy';

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
    return this.kettle.videoState.position
      .map(pos => reverse(this.visibleSlides).find(s => s.time <= pos))
      .andThen(fromNullable);
  }

  isCurrent(candidate: Slide): boolean {
    return this.current.map(s => candidate.id === s.id).getOrElseValue(false);
  }

  @action
  seekTo(s: Slide) {
    this.kettle.seekTo(s.time);
  }
}

export default Data;
