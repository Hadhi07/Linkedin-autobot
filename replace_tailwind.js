const fs = require('fs');
const files = ['login.html', 'step1.html', 'step2.html', 'step3.html', 'step4.html', 'success.html'];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/<script src="https:\/\/cdn\.tailwindcss\.com[^>]*"><\/script>/, '<link href="styles.css" rel="stylesheet"/>');
  content = content.replace(/<script id="tailwind-config">[\s\S]*?<\/script>/, '');
  fs.writeFileSync(file, content);
});
console.log('HTML files updated successfully!');
