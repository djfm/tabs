import React from 'react';
import {connect} from 'react-redux';
import Section from './Section';
import Transposer from '../Transposer';
import {transposeSong} from '../../lib/song';

import {push} from 'react-router-redux';
import {transpose} from '../../actions';

const songBody = ({song, transpose, offset}) => <div>
    <div>
        <Transposer transpose={transpose} offset={offset}/>
    </div>
    {song.sections.map((section, key) =>
        <Section key={key} section={section} markerSizeHint={song.markerSizeHint}/>
    )}
</div>;

const Song = data => <div className="song-view">
    {data.song ? songBody(data) : 'Please wait while your song is loading...'}
</div>;

const mapStateToProps = (state, ownProps) => {
    const transposeBy = parseInt(ownProps.location.query.semitones || 0, 10);
    const song = transposeSong(
        state.songRepository.songsById[ownProps.routeParams.songId],
        transposeBy
    );
    return {song, offset: transposeBy};
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        transpose: semitones => () => dispatch(
            push({
                pathname: ownProps.location.pathname,
                query: Object.assign({}, ownProps.location.query, {semitones})
            })
        )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Song);
