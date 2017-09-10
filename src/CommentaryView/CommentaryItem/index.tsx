import * as React from 'react';
import { observer } from 'mobx-react';
import { Commentary } from './../../CommentaryData';

interface Props {
  commentary: Commentary;
}

const CommentaryItem: React.StatelessComponent<Props> = ({ commentary }) => {
  return (
    <li>
      <pre>{commentary.content}</pre>
    </li>
  );
};

export default observer(CommentaryItem);
