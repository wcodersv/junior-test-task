import React from 'react';
import './Loader.css';

const Loader = () => (
    <div className='container-loader'>
        <div className="lds-ellipsis">
            <div />
            <div />
            <div />
            <div />
        </div>
    </div>
)

export default Loader;