// import { useState } from 'react';
import classes from './App.module.css'
import Header from './components/Header';

function App() {
  return (
    <>
      <Header />
      <main className={classes['background-image']}>
        Initial Page
      </main>
    </>
  );
};

export default App;
