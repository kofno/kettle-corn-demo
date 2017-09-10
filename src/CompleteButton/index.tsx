import * as React from 'react';
import { observer } from 'mobx-react';
import CompleteData from './CompleteData';

interface Props {
  store: CompleteData;
}

const CompleteButton: React.StatelessComponent<Props> = ({ store }) => {
  return (
    <button onClick={() => alert('Done!')} disabled={!store.enabled}>
      Complete
    </button>
  );
};

export default observer(CompleteButton);
