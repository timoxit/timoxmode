import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Function to handle automatic site closure when DevTools are opened
const closeWebsiteOnDevTools = () => {
  document.body.innerHTML = '<div style="background:#090d16;color:#ef4444;height:100vh;display:flex;justify-content:center;align-items:center;font-family:sans-serif;font-weight:600;font-size:1.2rem;">Access Denied: Developer Tools are restricted.</div>';
  window.location.href = 'about:blank';
  try {
    window.close();
  } catch (e) {
    // Ignore error if browser prevents script window.close
  }
};

// 1. Check window outer/inner dimension differences (detects docked DevTools in Chrome, Firefox, Edge, Safari)
const threshold = 160;
const checkWindowDimensions = () => {
  const widthDiff = window.outerWidth - window.innerWidth > threshold;
  const heightDiff = window.outerHeight - window.innerHeight > threshold;
  if (widthDiff || heightDiff) {
    closeWebsiteOnDevTools();
  }
};

// 2. Console element getter trick (detects console tab inspection)
const checkConsoleInspection = () => {
  const element = new Image();
  Object.defineProperty(element, 'id', {
    get: function () {
      closeWebsiteOnDevTools();
    }
  });
  console.log('%c', element);
};

// Periodically run DevTools detection checks
setInterval(() => {
  checkWindowDimensions();
  checkConsoleInspection();
}, 500);

window.addEventListener('resize', checkWindowDimensions);

// Disable context menu (right-click Inspect)
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

// Disable developer tools and view-source keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // Disable F12
  if (e.key === 'F12') {
    e.preventDefault();
    closeWebsiteOnDevTools();
  }
  
  // Disable Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+Shift+K
  if (e.ctrlKey && e.shiftKey && ['I', 'i', 'J', 'j', 'C', 'c', 'K', 'k', 'E', 'e'].includes(e.key)) {
    e.preventDefault();
    closeWebsiteOnDevTools();
  }
  
  // Disable Cmd+Option+I, Cmd+Option+J, Cmd+Option+C, Cmd+Option+K (Mac shortcuts)
  if (e.metaKey && e.altKey && ['I', 'i', 'J', 'j', 'C', 'c', 'K', 'k', 'E', 'e'].includes(e.key)) {
    e.preventDefault();
    closeWebsiteOnDevTools();
  }
  
  // Disable Ctrl+U or Cmd+U (View Source)
  if ((e.ctrlKey || e.metaKey) && (e.key === 'U' || e.key === 'u')) {
    e.preventDefault();
    closeWebsiteOnDevTools();
  }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

