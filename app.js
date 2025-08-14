// console.log("rfdg");


async function generateApiSig(method,params,apiKey,SecretApiKey) {
    const rand = "123456";
    const timestamp = Math.floor(Date.now()/1000).toString();
    params.apiKey = apiKey;
    params.time = timestamp;

    const sortedKeys = Object.keys(params).sort();
    const paramStr = sortedKeys.map( k => `${k}=${params[k]}`).join("&");

    const sigBase = `${rand}/${method}?${paramStr}#${SecretApiKey}`;
    const sigHash = await crypto.subtle.digest("SHA-512", new TextEncoder().encode(sigBase));
    const hashArray = Array.from(new Uint8Array(sigHash)).map(b => b.toString(16).padStart(2,"0")).join("");

    params.apiSig = rand + hashArray;
    return params;

}

async function fetcSubmissions(handle,apiKey,SecretApiKey) {
    let allSubs = [];
    let count = 500;
    let start=1;

    while(true){
        let params = {
            handle,
            from:start,
            count
        };

        params = await generateApiSig("user.status", params, apiKey, SecretApiKey);

        const url = "https://codeforces.com/api/user.status?"+ new URLSearchParams(params);
        console.log("API URL:", url);
        const res = await fetch(url);
        const data = await res.json();

        if(data.status != "OK"){
            console.error("API Error:", data);
            throw new Error(data.comment || "Invalid Data");
        }

        allSubs = allSubs.concat(data.result);

        if(data.result.length < count) break;
        start += count;
    }

    return allSubs;
}


function getExtention(language){
    language = language.toLowerCase();
    if(language.includes("c++")) return "cpp";
    if(language.includes("c")) return "c";
    if(language.includes("java")) return "java";
    if(language.includes("python")) return "py";
    if(language.includes("go")) return "go";
    if(language.includes("javascript")) return "js";
    
    return "txt";
}


function SaveReadme(uniqueAccepted){
    let lines = [
    "## Codeforces Submissions\n",

    "*Auto-generated with ❤️ using [Codeforces Submission Fetcher](https://github.com/Andrew-Velox/cf-submission-fetcher)*\n",

    "## Introduction\n",

    "A repository to keep track of problem solving practice, containing solutions from platforms:\n",

    "• **Codeforces**\n",

    "> Codeforces is a website which hosts competitive programming contests: [http://codeforces.com](http://codeforces.com)\n",
    "\n",
    "## Contents\n",
    "\n",
    "| # | Title | Solution | Tags | Submitted |",
    "|:-:|-------|----------|------|-----------|"
    ];

    let total = uniqueAccepted.length;
    uniqueAccepted.forEach((sub, x) =>{
        const problem = sub.problem;
        const contestsId = sub.contestId || "unknown";
        const problemIndex = problem.index;
        const problemName = problem.name;
        const tags = problem.tags || [];
        const rating = problem.rating || null;
        const language = sub.programmingLanguage || "Unknown";
        
        // Format timestamp as "MMM/DD/YYYY HH:MM"
        const date = new Date(sub.creationTimeSeconds * 1000);
        const options = { 
            month: 'short', 
            day: '2-digit', 
            year: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
        };
        const timestamp = date.toLocaleDateString('en-US', options).replace(',', '');

        const problemUrl = `https://codeforces.com/contest/${contestsId}/problem/${problemIndex}`;
        const submissionUrl = `https://codeforces.com/contest/${contestsId}/submission/${sub.id}`;

        // Add rating to tags if available
        const allTags = [...tags];
        if (rating) {
            allTags.push(`*${rating}`);
        }

        lines.push(`| ${total - x} | [${problemIndex} - ${problemName}](${problemUrl}) | [${language}](${submissionUrl}) | ${allTags.map(t => `\`${t}\``).join(" ")} | ${timestamp} |`);
    });

    const markdownContent = lines.join("\n");
    console.log("SaveReadme called, content length:", markdownContent.length);
    
    // Check if we're in a Chrome extension context
    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
        console.log("Using Chrome extension download");
        
        // Send content directly to background script for download
        chrome.runtime.sendMessage({
            action: "downloadReadme",
            content: markdownContent
        }, (response) => {
            if (response && response.success) {
                console.log("Download successful");
            } else {
                console.error("Download failed, using fallback");
                downloadFallback(markdownContent);
            }
        });
    } else {
        console.log("Using direct download");
        downloadFallback(markdownContent);
    }
    
    function downloadFallback(content) {
        const blob = new Blob([content], { type: "text/markdown" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = "README.md";
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}



document.getElementById('generate').addEventListener("click",async () => {
    const handle = document.getElementById("handle").value.trim();
    const apiKey = document.getElementById("apiKey").value.trim();
    const SecretApiKey = document.getElementById("SecretApiKey").value.trim();
    console.log(handle);
    console.log(apiKey);
    console.log(SecretApiKey);

    if(!handle || !apiKey || !SecretApiKey){
        alert("Invalid Input: All fields are required");
        return;
    }

    // Validate handle according to Codeforces requirements
    if(handle.length < 3 || handle.length > 24){
        alert("Invalid Handle: Handle should contain between 3 and 24 characters, inclusive");
        return;
    }

    // Validate handle format (alphanumeric and underscores only)
    if(!/^[a-zA-Z0-9_]+$/.test(handle)){
        alert("Invalid Handle: Handle should only contain letters, numbers, and underscores");
        return;
    }

    try{
        const allSubs = await fetcSubmissions(handle,apiKey,SecretApiKey);
        const problemLatest = {};

        allSubs.forEach(sub => {
            if(sub.verdict !== "OK") return;
            const key = `${sub.contestId}-${sub.problem.index}`;

            if(!problemLatest[key] || sub.creationTimeSeconds > problemLatest[key].creationTimeSeconds){
                problemLatest[key] = sub;
            }
        });

        const uniqueAccepted = Object.values(problemLatest).sort((a,b) => b.creationTimeSeconds - a.creationTimeSeconds);

        console.log("Unique accepted submissions:", uniqueAccepted.length);
        console.log("Calling SaveReadme...");
        SaveReadme(uniqueAccepted);

        document.getElementById("status").textContent = `Generated README.md with ${uniqueAccepted.length} unique accepted submissions.`;
    }
    catch(error){
        document.getElementById("status").textContent = `Error: ${error.message}`;
    }


    // fetch(`https://codeforces.com/api/user.info?handles=${handle}`).then(response => {
    //     if(!response.ok){
    //         throw new Error(`HTTP error! Status: ${response.status}`)
    //     }
    //     return response.json();
    // }).then(data => {
    //     console.log(data);
    // }).catch(error => {
    //     console.error(`Error Fetching Data`, error);
    // });

});

// Auto-save and restore functionality
document.addEventListener('DOMContentLoaded', function() {
    const handleInput = document.getElementById("handle");
    const apiKeyInput = document.getElementById("apiKey");
    const secretApiKeyInput = document.getElementById("SecretApiKey");

    // Function to save data to chrome storage
    function saveData() {
        if (typeof chrome !== 'undefined' && chrome.storage) {
            chrome.storage.local.set({
                'cf_handle': handleInput.value,
                'cf_apiKey': apiKeyInput.value,
                'cf_secretApiKey': secretApiKeyInput.value
            });
        } else {
            // Fallback to localStorage if chrome storage is not available
            localStorage.setItem('cf_handle', handleInput.value);
            localStorage.setItem('cf_apiKey', apiKeyInput.value);
            localStorage.setItem('cf_secretApiKey', secretApiKeyInput.value);
        }
    }

    // Function to restore data from chrome storage
    function restoreData() {
        if (typeof chrome !== 'undefined' && chrome.storage) {
            chrome.storage.local.get(['cf_handle', 'cf_apiKey', 'cf_secretApiKey'], function(result) {
                if (result.cf_handle) handleInput.value = result.cf_handle;
                if (result.cf_apiKey) apiKeyInput.value = result.cf_apiKey;
                if (result.cf_secretApiKey) secretApiKeyInput.value = result.cf_secretApiKey;
            });
        } else {
            // Fallback to localStorage
            const savedHandle = localStorage.getItem('cf_handle');
            const savedApiKey = localStorage.getItem('cf_apiKey');
            const savedSecretApiKey = localStorage.getItem('cf_secretApiKey');
            
            if (savedHandle) handleInput.value = savedHandle;
            if (savedApiKey) apiKeyInput.value = savedApiKey;
            if (savedSecretApiKey) secretApiKeyInput.value = savedSecretApiKey;
        }
    }

    // Add event listeners to save data on input
    handleInput.addEventListener('input', saveData);
    apiKeyInput.addEventListener('input', saveData);
    secretApiKeyInput.addEventListener('input', saveData);

    // Restore data when popup opens
    restoreData();

    // Add functionality for "Open in New Tab" button
    const openInTabButton = document.getElementById("openInTab");
    if (openInTabButton) {
        openInTabButton.addEventListener('click', function() {
            // Save current data before opening new tab
            saveData();
            
            if (typeof chrome !== 'undefined' && chrome.tabs) {
                chrome.tabs.create({
                    url: chrome.runtime.getURL('index.html')
                });
            } else {
                // Fallback: open in new window if chrome.tabs is not available
                window.open('index.html', '_blank', 'width=400,height=600');
            }
        });
    }
});