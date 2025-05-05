// Set export mode to prevent infinite loops
window.isExporting = true;

// Wait for DOM and animation to be ready
document.addEventListener('DOMContentLoaded', () => {
  console.log("Prepare script executed - export mode enabled");
  
  // Dispatch event when ready
  window.dispatchEvent(new Event('export-ready'));
}); 