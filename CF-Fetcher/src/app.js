document.addEventListener('DOMContentLoaded', function() {
    const handleInput = document.getElementById('handle');
    const apiKeyInput = document.getElementById('apiKey');
    const secretApiKeyInput = document.getElementById('SecretApiKey');

    // Function to save data to chrome storage
    function saveData() {
        if (typeof chrome !== 'undefined' && chrome.storage) {
            chrome.storage.local.set({
                'cf_handle': handleInput.value,
                'cf_apiKey': apiKeyInput.value,
                'cf_secretApiKey': secretApiKeyInput.value
            });
        } else {
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
            const savedHandle = localStorage.getItem('cf_handle');
            const savedApiKey = localStorage.getItem('cf_apiKey');
            const savedSecretApiKey = localStorage.getItem('cf_secretApiKey');
            if (savedHandle) handleInput.value = savedHandle;
            if (savedApiKey) apiKeyInput.value = savedApiKey;
            if (savedSecretApiKey) secretApiKeyInput.value = savedSecretApiKey;
        }
    }

    handleInput.addEventListener('input', saveData);
    apiKeyInput.addEventListener('input', saveData);
    secretApiKeyInput.addEventListener('input', saveData);
    restoreData();

    document.getElementById('generate').addEventListener('click', async function(e) {
        e.preventDefault();
        const handle = handleInput.value.trim();
        const apiKey = apiKeyInput.value.trim();
        const SecretApiKey = secretApiKeyInput.value.trim();

        if(!handle || !apiKey || !SecretApiKey){
            document.getElementById('status').textContent = 'Invalid Input: All fields are required';
            return;
        }

        try {
            const allSubs = await fetcSubmissions(handle, apiKey, SecretApiKey);
            const problemLatest = {};
            allSubs.forEach(sub => {
                if(sub.verdict !== 'OK') return;
                const key = `${sub.contestId}-${sub.problem.index}`;
                if(!problemLatest[key] || sub.creationTimeSeconds > problemLatest[key].creationTimeSeconds){
                    problemLatest[key] = sub;
                }
            });
            const uniqueAccepted = Object.values(problemLatest).sort((a,b) => b.creationTimeSeconds - a.creationTimeSeconds);

            // Create ZIP
            const zip = new JSZip();
            zip.file('README.md', SaveReadme(uniqueAccepted));

            // Group solutions by rating and create per-rating README
            const ratingMap = {};
            uniqueAccepted.forEach(sub => {
                const rating = sub.problem.rating || 'unknown';
                if (!ratingMap[rating]) ratingMap[rating] = [];
                ratingMap[rating].push(sub);
            });
            Object.entries(ratingMap).forEach(([rating, subs]) => {
                let readmeLines = [
                    `# Codeforces ${rating} Rating Submissions`,
                    '',
                    formatReadme(subs)
                ];
                zip.file(`codeforces/${rating}/README.md`, readmeLines.join('\n'));
            });

            zip.generateAsync({type:'blob'}).then(function(content) {
                const url = URL.createObjectURL(content);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'codeforces_submissions.zip';
                a.style.display = 'none';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            });

            document.getElementById('status').textContent = `Generated ZIP with ${uniqueAccepted.length} unique accepted submissions.`;
        } catch(error) {
            document.getElementById('status').textContent = `Error: ${error.message}`;
        }
    });
});


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


function formatReadme(subs) {
    let lines = [
        '| # | Title | Solution | Tags | Submitted |',
        '|:-:|-------|----------|------|-----------|'
    ];
    let total = subs.length;
    subs.forEach((sub, x) => {
        const problem = sub.problem;
        const contestsId = sub.contestId || 'unknown';
        const problemIndex = problem.index;
        const problemName = problem.name;
        const tags = problem.tags || [];
        const language = sub.programmingLanguage || 'Unknown';
        const date = new Date(sub.creationTimeSeconds * 1000);

        // Format date as 'Jul/10/2024 02:35 PM' (12-hour)
        const month = date.toLocaleString('en-US', { month: 'short' });
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        let hour = date.getHours();
        const minute = String(date.getMinutes()).padStart(2, '0');
        const ampm = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12;
        hour = hour ? hour : 12; // the hour '0' should be '12'
        const hourStr = String(hour).padStart(2, '0');
        const timestamp = `${month}/${day}/${year} ${hourStr}:${minute} ${ampm}`;

        
        const problemUrl = `https://codeforces.com/contest/${contestsId}/problem/${problemIndex}`;
        const submissionUrl = `https://codeforces.com/contest/${contestsId}/submission/${sub.id}`;
        const allTags = [...(problem.tags || [])];
        if (problem.rating) {
            allTags.push(`*${problem.rating}`);
        }
        lines.push(`| ${total - x} | [${problemIndex} - ${problemName}](${problemUrl}) | [${language}](${submissionUrl}) | ${allTags.map(t => `\`${t}\``).join(' ')} | ${timestamp} |`);
    });
    return lines.join('\n');
}

function SaveReadme(uniqueAccepted){
    let lines = [
    '## Codeforces Submissions\n',
    '*Auto-generated with ❤️ using [Codeforces Submission Fetcher](https://github.com/Andrew-Velox/Codeforces-Submission-Fetcher-Extension)*\n',
    '## Introduction\n',
    'A repository to keep track of problem solving practice, containing solutions from platforms:\n',
    '• **Codeforces**\n',
    '> Codeforces is a website which hosts competitive programming contests: [http://codeforces.com](http://codeforces.com)\n',
    '\n',
    '## Contents\n',
    '\n',
    ];
    lines.push(formatReadme(uniqueAccepted));
    const markdownContent = lines.join('\n');
    console.log('SaveReadme called, content length:', markdownContent.length);
    return markdownContent;
}
