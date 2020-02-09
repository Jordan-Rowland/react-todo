import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./service-worker.js');
    console.log('Service Worker Registered')
  });
}

ReactDOM.render(<App />, document.getElementById('root'));
