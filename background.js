chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action === "downloadReadme" && msg.content) {
        // Create blob and download
        const blob = new Blob([msg.content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        
        chrome.downloads.download({
            url: url,
            filename: "README.md"
        }, (downloadId) => {
            // Clean up the URL
            setTimeout(() => URL.revokeObjectURL(url), 1000);
            
            if (chrome.runtime.lastError) {
                sendResponse({ success: false, error: chrome.runtime.lastError.message });
            } else {
                sendResponse({ success: true, downloadId: downloadId });
            }
        });
        
        return true; // Async response
    }
    
    sendResponse({ success: false, error: "Invalid request" });
});
