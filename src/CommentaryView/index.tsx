import * as React from 'react';
import { observer } from 'mobx-react';
import CommentaryData from './../CommentaryData';
import CommentaryItem from './CommentaryItem';

interface Props {
  commentary: CommentaryData;
}

const CommentaryView: React.StatelessComponent<Props> = ({ commentary }) => {
  return <ul>{commentary.current.map(c => <CommentaryItem key={c.key} commentary={c} />)}</ul>;
};

export default observer(CommentaryView);
