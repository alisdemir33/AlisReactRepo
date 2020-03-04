import React from 'react';

import './Post.css';

const post = (props) => (
    <article onClick={props.clicked} className="Post">
        <h1>{props.Title}</h1>
        <div className="Info">
<div className="Author">{props.Author}</div>
        </div>
    </article>
);

export default post;