import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './lib/theme-provider';
import { FontProvider } from './lib/font-provider';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="synapse-theme-light">
      <FontProvider defaultFont="manrope" storageKey="synapse-font">
        <App />
      </FontProvider>
    </ThemeProvider>
  </React.StrictMode>
);