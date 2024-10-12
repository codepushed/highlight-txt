// Function to create and show the highlight button for text selection
function createHighlightButton(x, y, text, url) {
    console.log('Creating highlight button for text');
    const highlightButton = document.createElement('button');
    highlightButton.innerText = 'Highlight';
    highlightButton.style.position = 'absolute';
    highlightButton.style.top = `${y}px`;
    highlightButton.style.left = `${x}px`;
    highlightButton.style.zIndex = 1000;
    highlightButton.className = 'highlight-button';
    highlightButton.onclick = () => {
      chrome.runtime.sendMessage({ action: 'highlightText', text: text, url: url });
      document.body.removeChild(highlightButton);
    };
    document.body.appendChild(highlightButton);
  }
  
  // Function to create and show the highlight button for images and videos
  function createHighlightMediaButton(x, y, src, url, type) {
    console.log(`Creating highlight button for ${type}`);
    const highlightButton = document.createElement('button');
    highlightButton.innerText = 'Highlight';
    highlightButton.style.position = 'absolute';
    highlightButton.style.top = `${y}px`;
    highlightButton.style.left = `${x}px`;
    highlightButton.style.zIndex = 1000;
    highlightButton.className = 'highlight-button';
    highlightButton.onclick = () => {
      chrome.runtime.sendMessage({ action: `highlight${type}`, src: src, url: url });
      document.body.removeChild(highlightButton);
    };
    document.body.appendChild(highlightButton);
  }
  
  // Event listener for text selection
  document.addEventListener('mouseup', (event) => {
    const selectedText = window.getSelection().toString();
    if (selectedText) {
      const x = event.pageX;
      const y = event.pageY;
      const url = window.location.href;
      createHighlightButton(x, y, selectedText, url);
    }
  });
  
  // Event listener for right-click on images
  document.addEventListener('contextmenu', (event) => {
    const element = event.target;
    const url = window.location.href;
    if (element.tagName === 'IMG') {
      event.preventDefault();
      const x = event.pageX;
      const y = event.pageY;
      createHighlightMediaButton(x, y, element.src, url, 'Image');
    }
  });
  
  // Event listener for right-click on videos
  document.addEventListener('contextmenu', (event) => {
    const element = event.target;
    const url = window.location.href;
    if (element.tagName === 'VIDEO') {
      event.preventDefault();
      const x = event.pageX;
      const y = event.pageY;
      createHighlightMediaButton(x, y, element.src, url, 'Video');
    }
  });
  