chrome.action.onClicked.addListener((tab) => {
    if (tab.url.includes("picoctf.org")) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: saveProblemUrl
        });
    } else {
        alert("Please use this extension on a PicoCTF page!");
    }
});  

function saveProblemUrl() {
    // Extract problem name and URL
    const problemName = document.querySelector("[class='mb-1']")?.innerText || "Unnamed Problem";
    const url = window.location.href;

    // Prepare file content
    const fileName = `${problemName.replace(/\s+/g, "_")}.txt`;
    const fileContent = `Problem Name:\t${problemName}\nURL:\t${url}\nflag:\t\n\nHints:\t`;

    // Use Chrome's downloads API to save the file
    const blob = new Blob([fileContent], { type: "text/plain" });
    const blobUrl = URL.createObjectURL(blob);

    chrome.runtime.sendMessage({
        action: "download",
        fileName: fileName,
        blobUrl: blobUrl
    });
}

// Listen for download requests
chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "download") {
        chrome.downloads.download({
            url: message.blobUrl,
            filename: message.fileName,
            saveAs: true
        });
    }
});

