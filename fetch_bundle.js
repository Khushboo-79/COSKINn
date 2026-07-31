const https = require('https');
const fs = require('fs');

https.get('https://beauty-duo-design.preview.emergentagent.com/static/js/bundle.js', (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        fs.writeFileSync('C:/Users/lenovo/.gemini/antigravity-ide/brain/b91bd31f-c6b4-4a16-aae9-8e7d5fc22a7d/bundle.js', data);
        console.log('Bundle downloaded, length:', data.length);
        
        // Find the index of "Painted like a Fairytale"
        const targetStr = "Painted like a Fairytale";
        const idx = data.indexOf(targetStr);
        if (idx !== -1) {
            console.log("Found target string at index:", idx);
            // Print a large chunk around the target string to see the React JSX compiled code
            console.log(data.substring(idx - 2000, idx + 4000));
        } else {
            console.log("Target string not found in bundle.js");
        }
    });
}).on('error', (err) => {
    console.error('Error:', err.message);
});
