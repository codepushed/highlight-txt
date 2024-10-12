chrome.runtime.onInstalled.addListener(() => {
    console.log("Highlight Saver extension installed");
  });
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'highlightText') {
      chrome.storage.local.get(["highlights"], (result) => {
        const highlights = result.highlights || [];
        highlights.push({ type: "text", content: message.text, url: message.url });
        chrome.storage.local.set({ highlights });
      });
    } else if (message.action === 'highlightImage') {
      chrome.storage.local.get(["highlights"], (result) => {
        const highlights = result.highlights || [];
        highlights.push({ type: "image", content: message.src, url: message.url });
        chrome.storage.local.set({ highlights });
      });
    } else if (message.action === 'highlightVideo') {
      chrome.storage.local.get(["highlights"], (result) => {
        const highlights = result.highlights || [];
        highlights.push({ type: "video", content: message.src, url: message.url });
        chrome.storage.local.set({ highlights });
      });
    }
  });
  