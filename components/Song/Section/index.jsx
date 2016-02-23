import React from 'react';
import './song-section.scss';

const renderTabBody = ({markerSizeHint}) => (parts, lineKey) =>
    <div className="line" key={lineKey}>
        {parts.map(({marker, body}, key) =>
            <div key={key} className="marker" style={{width: markerSizeHint + "px"}}>
                <div className="chord">{marker || "\u00a0"}</div>
                <div className="lyrics">{body}</div>
            </div>
        )}
    </div>
;

const renderBody = options => (block, key) =>
    block.type === "text" ?
        <div>{block.body}</div> :
        renderTabBody(options)(block.body, key)
;

const Section = ({section: {name, title, parsedBody}, markerSizeHint}) =>
    <div className="song-section">
        <span className="name">{name}</span>
        <span className="title">{title}</span>
        <div className="body">
            {parsedBody.map(renderBody({markerSizeHint}))}
        </div>
    </div>
;

export default Section;
