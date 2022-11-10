import ReactDOM from 'react-dom/client';
import { App } from './App';
import './sass/Index.scss';

const $root = document.querySelector('#root');

ReactDOM.createRoot($root).render(<App />);
