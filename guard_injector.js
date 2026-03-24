const fs = require('fs');

const protectScript = `
<script>
  (function() {
    const dataStr = localStorage.getItem('onboarding_data');
    if (!dataStr) {
      window.location.replace('/login.html');
      return;
    }
    try {
      const data = JSON.parse(dataStr);
      if (!data.name || !data.phone) {
        window.location.replace('/login.html');
      }
    } catch(e) {
      window.location.replace('/login.html');
    }
  })();
</script>
`;

const files = ['step1.html', 'step2.html', 'step3.html', 'step4.html', 'success.html'];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes('localStorage.getItem(\\'onboarding_data\\')')) {
    // Inject right after the head opening tag
    content = content.replace('<head>', '<head>\\n' + protectScript);
    fs.writeFileSync(file, content);
  }
});

console.log('Route guards injected successfully');
