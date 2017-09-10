import * as React from 'react';
import { observer } from 'mobx-react';
import SlideData from './Data';

interface Props {
  data: SlideData;
}

const imageClass = (current: boolean) => (current ? 'current' : 'not-current');

const Slides: React.StatelessComponent<Props> = ({ data }) => {
  return (
    <div className="container">
      {data.visibleSlides.map(s => (
        <img
          key={s.id}
          className={imageClass(data.isCurrent(s))}
          src={s.url}
          onClick={() => data.seekTo(s)}
        />
      ))}
    </div>
  );
};

export default observer(Slides);
