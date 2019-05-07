import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');

  const title = document.createElement(
    'h1',
    { id: 'main-title', title: 'This is a title.' },
    'My First React Element!'
  );


  ReactDOM.render(<App />, title);
  ReactDOM.unmountComponentAtNode(title);


  //ReactDOM.render(<App />, div);
 // ReactDOM.unmountComponentAtNode(div);
});
