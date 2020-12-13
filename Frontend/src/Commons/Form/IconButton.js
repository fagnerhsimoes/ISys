import React from 'react';
import If from '../Operator/If';

const IButton = (props) => (
    <If test={!props.hide}>
        <button className={'btn btn-' + props.style}
            onClick={props.onClick}>
            <i className={'fa fa-' + props.icon}></i>
        </button>
    </If>
);

export default IButton;