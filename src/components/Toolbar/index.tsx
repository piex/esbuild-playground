import React, { FC } from 'react';
import './style.css';

interface ToolbarProps {

}

const Toolbar: FC<ToolbarProps> = () => {
  return (
    <nav className="toolbar">
      <ul>
        <li className="logo">
          <a
            href="https://esbuild.github.io/"
            title='esbuild'
          >
            esbuild
          </a>
          <span>playground</span>
        </li>
      </ul>
      <ul>
        <a
          className="github"
          title='Github'
          href="https://github.com/piex/esbuild-playground"
        ></a>
      </ul>
    </nav>
  );
};

export default Toolbar;
