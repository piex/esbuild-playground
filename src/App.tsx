import React, { FC } from 'react';
import Container from './components/Container';
import Toolbar from './components/Toolbar';
import './style.css';

const App: FC = () => {
  return (
    <>
      <Toolbar />
      <Container />
    </>
  )
}

export default App;
