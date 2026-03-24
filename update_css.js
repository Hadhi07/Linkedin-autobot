const fs = require('fs');
const files = ['login.html', 'step1.html', 'step2.html', 'step3.html', 'step4.html', 'success.html'];
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/styles\.css/g, 'input.css');
  fs.writeFileSync(file, content);
});
console.log('Updated links to input.css');
