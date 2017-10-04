import React from 'react';
import ReactDOM from 'react-dom';
import Visualizer from './components/Visualizer'; 

// Import CSS 
import './styles/index.css';

//Here is where i put the category, 
//if you change follow string category'll change everywhere
const category = "English-language film directors"

ReactDOM.render(<Visualizer category={category} />
    , document.getElementById('root'));


