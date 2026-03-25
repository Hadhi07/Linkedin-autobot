const fs = require('fs');

const toastHtml = `
<div id="toast-container" class="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 transition-all pointer-events-none"></div>
<script>
function showToast(message, type = 'error') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    const isError = type === 'error';
    const bg = isError ? 'bg-red-500/10 border-red-500/50 text-red-400' : 'bg-primary-container/10 border-primary-container/50 text-primary-container';
    const icon = isError ? 'error' : 'check_circle';
    
    toast.className = \`flex items-center gap-3 px-6 py-4 rounded-2xl border backdrop-blur-md shadow-2xl transform transition-all duration-300 translate-y-[-100%] opacity-0 \${bg}\`;
    toast.innerHTML = \`<span class="material-symbols-outlined">\${icon}</span><p class="font-bold text-sm">\${message}</p>\`;
    
    container.appendChild(toast);
    
    // Animate in
    requestAnimationFrame(() => {
        toast.classList.remove('translate-y-[-100%]', 'opacity-0');
    });
    
    // Auto remove
    setTimeout(() => {
        toast.classList.add('opacity-0', 'scale-95');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}
</script>
`;

function injectToast(file) {
    if(!fs.existsSync(file)) return;
    let html = fs.readFileSync(file, 'utf8');
    if(!html.includes('id="toast-container"')) {
        html = html.replace('</body>', toastHtml + '\\n</body>');
        fs.writeFileSync(file, html);
    }
}

['login.html', 'step1.html', 'step2.html', 'step3.html', 'step4.html'].forEach(f => injectToast(f));

// Step 1 Validation Fix
let s1 = fs.readFileSync('step1.html', 'utf8');
s1 = s1.replace(/function saveStep1AndProceed\(\) \{[\s\S]*?localStorage\.setItem/, `function saveStep1AndProceed() {
        const fullName = document.getElementById('fullName')?.value.trim() || '';
        const roleTitle = document.getElementById('roleTitle')?.value.trim() || '';
        const companyName = document.getElementById('companyName')?.value.trim() || '';
        const industry = document.getElementById('industrySelect')?.value || '';
        const targetAudience = document.getElementById('targetAudience')?.value.trim() || '';
        const activeBtn = document.querySelector('#linkedinGoalBtns button.bg-primary-container');
        const linkedinGoal = activeBtn ? activeBtn.innerText : '';

        if(!fullName || !roleTitle || !industry || !targetAudience || !linkedinGoal) {
            showToast("Please complete all required fields vividly before advancing.");
            return;
        }

        const data = JSON.parse(localStorage.getItem('onboarding_data') || '{}');
        data.fullName = fullName;
        data.roleTitle = roleTitle;
        data.companyName = companyName;
        data.industry = industry;
        data.targetAudience = targetAudience;
        data.linkedinGoal = linkedinGoal;

        localStorage.setItem`);
fs.writeFileSync('step1.html', s1);

// Step 2 Validation Fix
let s2 = fs.readFileSync('step2.html', 'utf8');
s2 = s2.replace(/function saveStep2AndProceed\(\) \{[\s\S]*?localStorage\.setItem/, `function saveStep2AndProceed() {
        const wsBtn = document.querySelector('#writingStyleGrid button.bg-primary-container');
        const ssBtn = document.querySelector('#sentenceStyleDiv button.bg-primary-container');
        const hBtn = document.querySelector('#humorDiv button.bg-primary-container');
        
        if(!wsBtn || !ssBtn || !hBtn) {
            showToast("Please select your writing style, sentence structure, and humor preferences.");
            return;
        }

        const data = JSON.parse(localStorage.getItem('onboarding_data') || '{}');
        data.writingStyle = wsBtn.innerText;
        data.sentenceStyle = ssBtn.innerText;
        data.humor = hBtn.innerText;

        localStorage.setItem`);
fs.writeFileSync('step2.html', s2);

// Step 3 Validation & Tone Fix
let s3 = fs.readFileSync('step3.html', 'utf8');
s3 = s3.replace(/function updateCarousel\(\) \{[\s\S]*?toneTrack\.style\.transform = `translateX\(-\$\{currentToneIndex \* 25\}%\)`;\n    \}/, `function updateCarousel() {
        toneTrack.style.transform = \\\`translateX(-\\\${currentToneIndex * 25}%)\\\`;
    }`);
// Fix the chevron selectors that crash:
s3 = s3.replace(/document\.querySelectorAll\('button:has[\s\S]*?\)\.forEach[\s\S]*?updateCarousel\(\); \} \}\n    \}\);/g, `
    const leftBtns = document.querySelectorAll('button:has(span:contains("chevron_left")), .material-symbols-outlined:contains("chevron_left")'); // Note: querySelectorAll does not support :contains. We will use a safe generic approach:
    const controls = document.querySelectorAll('button.p-2.rounded-lg');
    if(controls.length >= 2) {
        controls[0].onclick = () => { if (currentToneIndex > 0) { currentToneIndex--; updateCarousel(); } }
        controls[1].onclick = () => { if (currentToneIndex < tonesCount - 1) { currentToneIndex++; updateCarousel(); } }
    }
`);
// Let's just hard replace the exact block cleanly.
// Since the previous string replacement is dirty, let's write a pure regex text replacement for the script.
s3 = s3.replace(/<script>\s*let currentToneIndex = 0;[\s\S]*?<\/script>/, `<script>
    let currentToneIndex = 0;
    const tonesCount = 4;
    const toneTrack = document.getElementById('toneTrack');
    const toneOptions = document.querySelectorAll('.ToneOption');
    let selectedTone = 'Analytical/VC';

    function updateCarousel() {
        toneTrack.style.transform = \`translateX(-\${currentToneIndex * 25}%)\`;
    }

    const controls = document.querySelectorAll('.mb-8 button');
    if(controls.length >= 2) {
        controls[0].onclick = () => { if (currentToneIndex > 0) { currentToneIndex--; updateCarousel(); } };
        controls[1].onclick = () => { if (currentToneIndex < tonesCount - 1) { currentToneIndex++; updateCarousel(); } };
    }

    toneOptions.forEach(opt => {
        opt.onclick = () => {
            toneOptions.forEach(o => {
                o.classList.remove('active-tone', 'bg-surface-container-low', 'border-primary-container/20');
                o.classList.add('bg-surface-container-lowest', 'border-outline-variant/10', 'opacity-60');
                o.querySelector('span').classList.remove('text-primary-container');
                o.querySelector('span').classList.add('text-outline-variant');
                o.querySelector('.tone-radio').classList.replace('border-primary-container', 'border-outline-variant/30');
                o.querySelector('.indicator').classList.replace('bg-primary-container', 'bg-transparent');
            });
            opt.classList.remove('bg-surface-container-lowest', 'border-outline-variant/10', 'opacity-60');
            opt.classList.add('active-tone', 'bg-surface-container-low', 'border-primary-container/20');
            opt.querySelector('span').classList.remove('text-outline-variant');
            opt.querySelector('span').classList.add('text-primary-container');
            opt.querySelector('.tone-radio').classList.replace('border-outline-variant/30', 'border-primary-container');
            opt.querySelector('.indicator').classList.replace('bg-transparent', 'bg-primary-container');
            selectedTone = opt.getAttribute('data-tone');
        };
    });
</script>`);

s3 = s3.replace(/function saveStep3AndProceed\(\) \{[\s\S]*?localStorage\.setItem/, `function saveStep3AndProceed() {
        const expertise = document.getElementById('expertiseArea')?.value.trim() || '';
        const themes = document.getElementById('recurringThemes')?.value.trim() || '';
        const disagreed = document.getElementById('disagreedBeliefs')?.value.trim() || '';
        
        if(!expertise || !themes || !disagreed) {
            showToast("Please provide your core content pillars to finalize calibration.");
            return;
        }

        const data = JSON.parse(localStorage.getItem('onboarding_data') || '{}');
        data.expertiseArea = expertise;
        data.recurringThemes = themes;
        data.disagreedBeliefs = disagreed;
        data.tone = typeof selectedTone !== "undefined" ? selectedTone : "Analytical/VC";

        localStorage.setItem`);
fs.writeFileSync('step3.html', s3);

console.log("Validation & UI Bugs Patched!");
