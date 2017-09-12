import * as React from 'react';
import { observer } from 'mobx-react';
import Kettle from './../Kettle';
import { SeekTo } from './../Kettle/Messages';

const skipBack = (kettle: Kettle) => (): void => {
  kettle.videoState.position
    .map(now => Math.max(0, now - 25))
    .map(skipTo => kettle.sendMessage(new SeekTo(skipTo)));
};

interface Props {
  kettle: Kettle;
}

const SkipBack: React.StatelessComponent<Props> = ({ kettle }) => {
  return <button onClick={skipBack(kettle)}>Skip Back</button>;
};

export default observer(SkipBack);
