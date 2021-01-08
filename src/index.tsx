import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AppComponent from './components/App/App';

ReactDOM.render(
  <React.StrictMode>
    <AppComponent username="nondefyde"/>
  </React.StrictMode>,
  document.getElementById('root')
);
