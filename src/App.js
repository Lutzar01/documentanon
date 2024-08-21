import React, { useEffect, useState } from 'react';
import pdfToText from 'react-pdftotext';
import logo from './logo.svg';
import './App.css';
import { usersMockData } from './data/mock_jsons/users';

function App() {
  return (
    <div className="App">
      <h2>Users:</h2>
      <ListUsers />
      <input type="file" accept="application/pdf" onChange={extractText}/>
    </div>
  );
}

function ListUsers () {

    const listItems = usersMockData.map(user =>
        <li key={user.id}>
            <h3>{user.name}</h3>
            <h3>{user.age}</h3>
            <h3>{user.email}</h3>
        </li>
    );
    return <ul>{listItems}</ul>
}

function extractText(event) {
    const file = event.target.files[0]
    pdfToText(file)
        .then(text => console.log(text))
        .catch(error => console.error("Failed to extract text from pdf"))
}

export default App;
