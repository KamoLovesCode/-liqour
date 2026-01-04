import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import PrototypeContainer from './views/PrototypeContainer';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-text-primary font-sans">
        <PrototypeContainer />
      </div>
    </ThemeProvider>
  );
};

export default App;