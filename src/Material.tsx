import * as React from 'react';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/IconButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {grey700} from 'material-ui/styles/colors';

import DeleteIcon from 'material-ui/svg-icons/action/delete'
import ContentAdd from 'material-ui/svg-icons/content/add';

export const CircleBtn = (props) => <FloatingActionButton mini={props.mini} secondary={true} onClick={props.onClick} style={props.style}>
  {props.children}
</FloatingActionButton>;

export const RaisedBtn = (props) => <RaisedButton onClick={props.onClick} style={props.style} icon={props.icon}/>;

export const Delete = (props) => <IconButton onClick={props.onClick}><DeleteIcon color={grey700}/></IconButton>;