import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const APIForm = (banList) => {

    return (
        <>
            <div className='BanList'>
                <h2>Ban List</h2>
                <h4>Select an attribute in your listing to ban it.</h4>
                {banList && banList.length > 0 ? (
                banList.map((item, index) => (
                <button type = "banned item"
                    className="banned-button" key={index}>
                        {item}
                </button>
                ))
            ) : (
                <div>
                </div>
            )}
            </div>
        </>
    )
}

export default APIForm;