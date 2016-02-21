import React from 'react';
import './song-section.scss';

const renderTabBody = parts => <div className="line">
    {parts.map(({marker, body}, key) =>
        <div key={key} className="marker">
            <div>{marker}</div>
            <div>{body}</div>
        </div>
    )}
</div>;

const renderBody = (block, key) => <div key={key}>
    {
        block.type === "text" ?
            block.body :
            renderTabBody(block.body)
    }
</div>;

const Section = ({section: {name, title, parsedBody}}) => (<div className="song-section">
    <span className="name">{name}</span>
    <span className="title">{title}</span>
    <div className="body">
        {parsedBody.map(renderBody)}
    </div>
</div>);

export default Section;
