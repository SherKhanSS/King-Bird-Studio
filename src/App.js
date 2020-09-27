import React from 'react';
import Photos from './components/photos';
import Study from './components/study';
import Rover from './components/rover';
import Specifications from './components/specifications';
import './sass/style.scss';

const App = () => {
  return (
    <main className="main">
    <div className="main__wrap">
      <h1 className="main__title">
        Mars
      </h1>
      <Specifications />
      <Rover />
      <Photos />
      <Study />
    </div>
  </main>      
  );
}

export default App;
