document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get(["highlights"], (result) => {
      const highlights = result.highlights || [];
      const highlightsContainer = document.getElementById('highlights');
      highlights.forEach((highlight) => {
        const highlightElement = document.createElement('div');
        highlightElement.className = 'highlight';
        if (highlight.type === 'text') {
          highlightElement.innerText = highlight.content;
        } else if (highlight.type === 'image') {
          const img = document.createElement('img');
          img.src = highlight.content;
          img.style.maxWidth = '100%';
          highlightElement.appendChild(img);
        } else if (highlight.type === 'video') {
          const video = document.createElement('video');
          video.src = highlight.content;
          video.controls = true;
          video.style.maxWidth = '100%';
          highlightElement.appendChild(video);
        }
        const sourceLink = document.createElement('a');
        sourceLink.href = highlight.url;
        sourceLink.innerText = 'Source';
        highlightElement.appendChild(document.createElement('br'));
        highlightElement.appendChild(sourceLink);
        highlightsContainer.appendChild(highlightElement);
      });
    });
  });
  