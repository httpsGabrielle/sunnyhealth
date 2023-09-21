import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// routes
import Router from './routes';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
          <Router />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;