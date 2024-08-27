import React, { useEffect, useState } from 'react';
import pdfToText from 'react-pdftotext';
import logo from './logo.svg';
import './App.css';
import { usersMockData } from './data/mock_jsons/users';
import PdfTextExtractor from './PDFExtraction/PdfTextExtractor.js';
import { Document } from 'react-pdf';

const App = () => {
    return (
        <div>
            <h1>PDF Text Extractor</h1>
            <PdfTextExtractor />
        </div>
    );
};

function ListUsers () {

    const listItems = usersMockData.map(user =>
        <li key={user.id} style={{backgroundColor: 'black', color: 'pink'}}>
            <h3>{user.name}</h3>
            <h3>{user.age}</h3>
            <h3>{user.email}</h3>
        </li>
    );
    return <ul>{listItems}</ul>
}




export default App;
