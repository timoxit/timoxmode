import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Function to handle automatic site closure when DevTools are opened
const closeWebsiteOnDevTools = () => {
  document.documentElement.innerHTML = '<div style="background:#090d16;color:#ef4444;height:100vh;display:flex;justify-content:center;align-items:center;font-family:sans-serif;font-weight:700;font-size:1.5rem;">Access Denied: Developer Tools are restricted.</div>';
  window.location.href = 'about:blank';
  try {
    window.close();
  } catch (e) {
    // Ignore error if browser prevents script window.close
  }
};

// 1. Check window outer/inner dimension differences (detects docked DevTools in all browsers)
const threshold = 100;
const checkWindowDimensions = () => {
  const widthDiff = window.outerWidth - window.innerWidth > threshold;
  const heightDiff = window.outerHeight - window.innerHeight > threshold;
  if (widthDiff || heightDiff) {
    closeWebsiteOnDevTools();
  }
};

// 2. Debugger timing analysis (detects floating or separate window DevTools)
const checkDebuggerTiming = () => {
  const start = performance.now();
  (function() { return false; })["constructor"]("debugger")();
  if (performance.now() - start > 100) {
    closeWebsiteOnDevTools();
  }
};

// 3. RegExp toString getter trick (detects Sources, Console, Network inspector tabs)
const checkConsoleInspection = () => {
  const reg = /./;
  reg.toString = function() {
    closeWebsiteOnDevTools();
    return '';
  };
  console.log(reg);
};

// High-frequency DevTools polling check (every 100ms)
setInterval(() => {
  checkWindowDimensions();
  checkDebuggerTiming();
  checkConsoleInspection();
}, 100);

window.addEventListener('resize', checkWindowDimensions);
window.addEventListener('load', checkWindowDimensions);

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
  
  // Disable Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+Shift+K, Ctrl+Shift+E
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


