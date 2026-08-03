import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Disable context menu (right-click)
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

// Disable developer tools and view-source keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // Disable F12
  if (e.key === 'F12') {
    e.preventDefault();
  }
  
  // Disable Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
  if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) {
    e.preventDefault();
  }
  
  // Disable Cmd+Option+I, Cmd+Option+J, Cmd+Option+C (Mac shortcuts)
  if (e.metaKey && e.altKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) {
    e.preventDefault();
  }
  
  // Disable Ctrl+U or Cmd+U (View Source)
  if ((e.ctrlKey || e.metaKey) && (e.key === 'U' || e.key === 'u')) {
    e.preventDefault();
  }
});

// DevTools Open Detection & Auto-Close Protection for Security
let isTriggered = false;

function closeSiteForSafety() {
  if (isTriggered) return;
  isTriggered = true;
  document.body.innerHTML = `
    <div style="background: #090d16; color: #ef4444; height: 100vh; width: 100vw; display: flex; flex-direction: column; justify-content: center; align-items: center; font-family: sans-serif; text-align: center; padding: 20px; box-sizing: border-box;">
      <h2 style="margin-bottom: 12px; font-size: 1.5rem; font-weight: 700;">Security Notice</h2>
      <p style="color: #94a3b8; font-size: 0.95rem; max-width: 450px; line-height: 1.5;">Browser Developer Tools are restricted on this website for security reasons. Closing session...</p>
    </div>
  `;
  setTimeout(() => {
    window.location.href = 'about:blank';
  }, 800);
}

function checkDevTools() {
  const widthDiff = window.outerWidth - window.innerWidth > 160;
  const heightDiff = window.outerHeight - window.innerHeight > 160;

  if (widthDiff || heightDiff) {
    closeSiteForSafety();
  }
}

// Monitor resize and interval
window.addEventListener('resize', checkDevTools);
setInterval(checkDevTools, 1000);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

