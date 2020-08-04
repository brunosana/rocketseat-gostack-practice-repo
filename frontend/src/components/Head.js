import React from 'react';

export default function Head({ title, children }){
    return(
        <>
        <h2>{title}</h2>
        {children}
        </>
    );
}