import { createElement } from 'react';
import { render } from 'react-dom';
import { hot } from 'react-hot-loader/root';

import App from './App';

render(createElement(hot(App)), document.getElementById('app'));