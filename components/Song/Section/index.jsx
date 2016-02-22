import React from 'react';
import './song-section.scss';

const renderTabBody = ({markerSizeHint}) => parts =>
    <div className="line">
        {parts.map(({marker, body}, key) =>
            <div key={key} className="marker" style={{width: markerSizeHint + "px"}}>
                <div className="chord">{marker || "\u00a0"}</div>
                <div>{body}</div>
            </div>
        )}
    </div>
;

const renderBody = options => (block, key) =>
    <div key={key}>
        {
            block.type === "text" ?
                block.body :
                renderTabBody(options)(block.body)
        }
    </div>
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
