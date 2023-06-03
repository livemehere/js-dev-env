import { createRoot } from 'react-dom/client';
import App from './components/App';
import '@/styles/index.css';

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
