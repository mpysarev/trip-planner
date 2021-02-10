import React from 'react';
import './Loader.css';

function Loader() {
    return <>
        <div className="loader_container">
            <h2>
                Please Sign In/Up <br/>
                or <br/> 
                click '+ADD NEW' to create new trip
            </h2>
            <div className="loader">
                <div /><div />
            </div>
        </div>
    </>
}

export default Loader
