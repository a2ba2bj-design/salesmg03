import React from 'react';

export default (params) => (<span className="missionSpan">
        {<img alt={`${params.value}`} src={`/${params.value ? 'tick' : 'cross'}.png`} className="w-4 h-4"/>}
    </span>);
