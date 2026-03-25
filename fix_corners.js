const fs = require('fs');
const path = require('path');

const files = ['login.html', 'step1.html', 'step2.html', 'step3.html', 'step4.html'];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Remove literal \n right before </body> or anywhere else
    content = content.replace(/\\n<\/body>/g, '\n</body>');
    content = content.replace(/\\n/g, ''); // Sweep any remaining literal \ns just in case

    if (file === 'login.html') {
        // Change rounded-2xl to rounded-full for smoother, pill-shaped aesthetics globally on the login form elements
        content = content.replace(/rounded-2xl/g, 'rounded-full');
    }

    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
});
