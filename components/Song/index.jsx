import React from 'react';
import {connect} from 'react-redux';
import Section from './Section';

const Song = ({song}) => <div className="song-view">
    {song ?
        song.sections.map((section, key) => <Section key={key} section={section}/>) :
        'Please wait while your song is loading...'
    }
</div>;

export default connect(({songRepository: {songsById}}, {params: {songId}}) => {
    return {
        song: songsById[songId]
    };
})(Song);
