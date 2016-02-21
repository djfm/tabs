import React from 'react';
import {connect} from 'react-redux';

import SongRow from './SongRow';

const SongList = ({songs}) => songs.length > 0 ?
    <div>{songs.map((song, key) => <SongRow key={key} song={song}/>)}</div> :
    <div>{'Please wait while the song library is loading...'}</div>
;

export default connect(state => {
    return {songs: state.songRepository.songs};
})(SongList);
