import * as React from 'react';
import { observer } from 'mobx-react';
import Kettle from './../Kettle';
import { seekTo } from './../Kettle/Types';

const skipBack = (kettle: Kettle) => (): void => {
  if (kettle.videoState.kind === 'initialized') return;
  const now = kettle.videoState.position;
  const skipTo = Math.max(0, now - 25);
  // tslint:disable-next-line:no-console
  console.log('Skip click!', skipTo);
  kettle.sendMessage(seekTo(skipTo));
};

interface Props {
  kettle: Kettle;
}

const SkipBack: React.StatelessComponent<Props> = ({ kettle }) => {
  return <button onClick={skipBack(kettle)}>Skip Back</button>;
};

export default observer(SkipBack);
