import React from 'react';
import {connect} from 'react-redux';
import Section from './Section';
import Transposer from '../Transposer';

import {transpose} from '../../actions';

const songBody = ({song, transpose}) => <div>
    <div>
        <Transposer transpose={transpose}/>
    </div>
    {song.sections.map((section, key) =>
        <Section key={key} section={section} markerSizeHint={song.markerSizeHint}/>
    )}
</div>;

const Song = ({song, transpose}) => <div className="song-view">
    {song ? songBody({song, transpose}) : 'Please wait while your song is loading...'}
</div>;

const mapStateToProps = ({
        songRepository: {songsById}
    }, {
        params: {songId}
    }) => {
    return {
        song: songsById[songId]
    };
};

const mapDispatchToProps = dispatch => {
    return {
        transpose: semitones => () => dispatch(transpose({semitones}))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Song);
