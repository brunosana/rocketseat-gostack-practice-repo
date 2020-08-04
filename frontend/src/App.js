import React, { useState } from 'react';

import './App.css';
import backgroundImage from './assets/background.jpg';

import Head from './components/Head';

function App(){
    const [projects, setProjects] = useState(['DoneList', 'SteamStoreBR']);

    function handleAddProject(){
        setProjects([...projects, `Projeto ${Date.now()}`]);
        console.log(projects);
    }
    return(
        <>
        <Head title="HomeSana"/>
        <img width={500} src={backgroundImage} />
        <ul>
            {projects.map(project => <li key={project}>{project}</li>)}
        </ul>
        <button type="button" onClick={handleAddProject} >Add Projeto</button>
        </>
    );
}

export default App;