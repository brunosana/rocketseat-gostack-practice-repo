import React, { useState, useEffect } from 'react';
import api from './services/api';

import './App.css';

import Head from './components/Head';

function App(){
    const [users, setUsers] = useState([]);

    //Par1 - Qual função disparar | Par2 - QUando disparar
    useEffect(() => {
        api.get('/users').then(response => {
            setUsers(response.data);
            console.log(response.data)
        })
    }, []);

    function handleAddProject(){
        setUsers([...users, `User ${Date.now()}`]);
        console.log(users);
    }
    return(
        <>
        <Head title="HomeSana Projects"/>
        <ul>
            {users.map(u => <li key={u.id}>{u.login} | {u.password} | {u.profile}</li>)}
        </ul>
        <button type="button" onClick={handleAddProject} >Add Projeto</button>
        </>
    );
}

export default App;