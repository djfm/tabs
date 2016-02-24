import React from 'react';
import './song-transposer.scss';

const message = offset => {
    const numberString = offset >= 0 ? `+${offset}` : offset;
    return (offset === 1 || offset === -1) ? `${numberString} semitone` : `${numberString} semitones`;
};

const Transposer = ({offset, transpose}) => {
    offset = offset || 0;

    return (<div className="song-transposer">
        <i onClick={transpose(offset - 1)} className="material-icons">{'arrow_downward'}</i>
        <span>{message(offset)}</span>
        <i onClick={transpose(offset + 1)} className="material-icons">{'arrow_upward'}</i>
    </div>);
} ;

export default Transposer;
