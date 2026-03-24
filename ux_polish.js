const fs = require('fs');

function updateFile(file, replacements) {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    replacements.forEach(([search, replace]) => {
        content = content.split(search).join(replace);
    });
    fs.writeFileSync(file, content);
}

// 1. Update Premium Headers
updateFile('step1.html', [
    [`Let's build your clone`, 'Initialize Your AI Architect'],
    ['Business Goals', 'Business Growth']
]);

updateFile('step2.html', [
    ['How do you sound?', 'Calibrate Your Narrative Voice']
]);

updateFile('step3.html', [
    ['What do you talk about?', 'Establish Core Content Pillars']
]);

updateFile('step4.html', [
    ['One last step', 'Finalize Identity Integration']
]);

// 2. Fix Back Buttons (Replace history.back with explicit URLs)
updateFile('step1.html', [
    [`onclick="window.history.back()"`, `onclick="window.location.href='login.html'"`]
]);
updateFile('step2.html', [
    [`onclick="window.history.back()"`, `onclick="window.location.href='step1.html'"`]
]);
updateFile('step3.html', [
    [`onclick="window.history.back()"`, `onclick="window.location.href='step2.html'"`]
]);
updateFile('step4.html', [
    [`onclick="window.history.back()"`, `onclick="window.location.href='step3.html'"`]
]);

// 3. Disable Forward Pagination Clicking
// Step 1: No forward clicks
updateFile('step1.html', [
    [`onclick="window.location.href='step2.html'"`, ''],
    [`onclick="window.location.href='step3.html'"`, ''],
    [`onclick="window.location.href='step4.html'"`, '']
]);

// Step 2: Can only click step 1
updateFile('step2.html', [
    [`onclick="window.location.href='step3.html'"`, ''],
    [`onclick="window.location.href='step4.html'"`, '']
]);

// Step 3: Can only click step 1, 2
updateFile('step3.html', [
    [`onclick="window.location.href='step4.html'"`, '']
]);

console.log("UX Polish and Routing Fixes Applied!");
