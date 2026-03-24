const fs = require('fs');

function updateFile(file, edits) {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    edits.forEach(({search, replace}) => {
        content = content.replace(search, replace);
    });
    fs.writeFileSync(file, content);
}

// 1. Text Changes
updateFile('step1.html', [{ search: 'Initialize Your AI Architect', replace: 'Create your AI architect' }]);
updateFile('step2.html', [{ search: 'Calibrate Your Narrative Voice', replace: 'How you want to express yourself' }]);
updateFile('step3.html', [{ search: 'Establish Core Content Pillars', replace: 'Select your core content' }]);
updateFile('step4.html', [{ search: 'Finalize Identity Integration', replace: 'One last step' }]);

// 2. Fix Back Buttons (They lack onclicks right now)
function addBackButton(file, targetHref) {
    let html = fs.readFileSync(file, 'utf8');
    html = html.replace(
        '<button class="text-[#00ff88] hover:bg-[#2a2a2a] transition-colors duration-300 scale-95 active:scale-90 transition-transform p-2 rounded-full">',
        `<button class="text-[#00ff88] hover:bg-[#2a2a2a] transition-colors duration-300 scale-95 active:scale-90 transition-transform p-2 rounded-full" onclick="window.location.href='${targetHref}'">`
    );
    html = html.replace(
        '<button class="text-on-surface hover:text-primary-container transition-colors duration-300 active:scale-90 p-2 rounded-full">',
        `<button class="text-on-surface hover:text-primary-container transition-colors duration-300 active:scale-90 p-2 rounded-full" onclick="window.location.href='${targetHref}'">`
    );
    fs.writeFileSync(file, html);
}
addBackButton('step1.html', 'login.html');
addBackButton('step2.html', 'step1.html');
addBackButton('step3.html', 'step2.html');
addBackButton('step4.html', 'step3.html');

// 3. Form Validation (Modify saveStep functions)
let step1 = fs.readFileSync('step1.html', 'utf8');
step1 = step1.replace('function saveStep1AndProceed() {', `function saveStep1AndProceed() {
      // Validate
      const role = document.getElementById('userRole').value;
      const audience = document.getElementById('targetAudience').value;
      if (!role) { alert("Please provide your role before continuing."); return; }
      if (!audience) { alert("Please define your target audience before continuing."); return; }
`);
fs.writeFileSync('step1.html', step1);

let step2 = fs.readFileSync('step2.html', 'utf8');
step2 = step2.replace('function saveStep2AndProceed() {', `function saveStep2AndProceed() {
      // Validate
      const style = document.getElementById('writingStyle').value;
      const sentence = document.getElementById('sentenceStyle').value;
      const humor = document.getElementById('humor').value;
      if (!style || !sentence || !humor) { alert("Please fill out all style options before continuing."); return; }
`);
fs.writeFileSync('step2.html', step2);

let step3 = fs.readFileSync('step3.html', 'utf8');
step3 = step3.replace('function saveStep3AndProceed() {', `function saveStep3AndProceed() {
      // Validate
      const expertise = document.getElementById('expertiseArea').value;
      const themes = document.getElementById('recurringThemes').value;
      const disagreed = document.getElementById('disagreedBeliefs').value;
      if (!expertise || !themes || !disagreed) { alert("Please fill out all content pillars before continuing."); return; }
`);
fs.writeFileSync('step3.html', step3);

// 4. Tone Carousel Implementation in step3.html
let step3Html = fs.readFileSync('step3.html', 'utf8');
const oldToneGrid = `<div class="grid md:grid-cols-2 gap-6" id="toneCalibrationGrid">`;
const oldToneEnd = `</section>`;
if (step3Html.includes(oldToneGrid)) {
    const startIndex = step3Html.indexOf(oldToneGrid);
    const endIndex = step3Html.indexOf(oldToneEnd, startIndex);
    
    const newCarouselHtml = `
<div class="relative w-full overflow-hidden" id="toneCarousel">
    <div class="flex transition-transform duration-500 ease-in-out w-[400%]" id="toneTrack">
        <!-- Option 1 -->
        <div class="w-1/4 p-4">
            <div class="p-8 rounded-2xl bg-surface-container-low border border-primary-container/20 ToneOption active-tone h-full" data-tone="Analytical/VC">
                <div class="flex justify-between items-center mb-4">
                    <span class="text-[10px] font-black uppercase tracking-widest text-primary-container">Option 1: The Analyst</span>
                    <div class="w-5 h-5 rounded-full border-2 border-primary-container flex items-center justify-center tone-radio"><div class="w-2.5 h-2.5 rounded-full bg-primary-container indicator"></div></div>
                </div>
                <p class="italic text-on-surface leading-relaxed">"The data doesn't lie. Most startups fail because they prioritize vanity metrics over unit economics. If you aren't obsessed with your CAC, you're just burning venture cash on a hobby."</p>
            </div>
        </div>
        <!-- Option 2 -->
        <div class="w-1/4 p-4">
            <div class="p-8 rounded-2xl bg-surface-container-lowest border border-outline-variant/10 ToneOption opacity-60 hover:opacity-100 transition-opacity h-full" data-tone="Storyteller">
                <div class="flex justify-between items-center mb-4">
                    <span class="text-[10px] font-black uppercase tracking-widest text-outline-variant">Option 2: The Storyteller</span>
                    <div class="w-5 h-5 rounded-full border-2 border-outline-variant/30 flex items-center justify-center tone-radio"><div class="w-2.5 h-2.5 rounded-full bg-transparent indicator"></div></div>
                </div>
                <p class="italic text-on-surface leading-relaxed">"Building a company is about storytelling. People don't buy what you do; they buy why you do it. Forget the spreadsheets for a second—what's the soul of your product?"</p>
            </div>
        </div>
        <!-- Option 3 -->
        <div class="w-1/4 p-4">
            <div class="p-8 rounded-2xl bg-surface-container-lowest border border-outline-variant/10 ToneOption opacity-60 hover:opacity-100 transition-opacity h-full" data-tone="Tactical/Guide">
                <div class="flex justify-between items-center mb-4">
                    <span class="text-[10px] font-black uppercase tracking-widest text-outline-variant">Option 3: The Tactician</span>
                    <div class="w-5 h-5 rounded-full border-2 border-outline-variant/30 flex items-center justify-center tone-radio"><div class="w-2.5 h-2.5 rounded-full bg-transparent indicator"></div></div>
                </div>
                <p class="italic text-on-surface leading-relaxed">"Here is the exact 3-step framework I used to double conversions: 1) Rewrite the hero hook. 2) Slice the onboarding friction in half. 3) Automate the follow-up sequences. Stop guessing, start executing."</p>
            </div>
        </div>
        <!-- Option 4 -->
        <div class="w-1/4 p-4">
            <div class="p-8 rounded-2xl bg-surface-container-lowest border border-outline-variant/10 ToneOption opacity-60 hover:opacity-100 transition-opacity h-full" data-tone="Provocative">
                <div class="flex justify-between items-center mb-4">
                    <span class="text-[10px] font-black uppercase tracking-widest text-outline-variant">Option 4: The Provocateur</span>
                    <div class="w-5 h-5 rounded-full border-2 border-outline-variant/30 flex items-center justify-center tone-radio"><div class="w-2.5 h-2.5 rounded-full bg-transparent indicator"></div></div>
                </div>
                <p class="italic text-on-surface leading-relaxed">"Why are you still using cold email in 2026? It's dead. Instead of spamming inboxes, you should be building undeniable leverage in public spaces where your audience already lives. Wake up."</p>
            </div>
        </div>
    </div>
</div>
<script>
    let currentToneIndex = 0;
    const tonesCount = 4;
    const toneTrack = document.getElementById('toneTrack');
    const toneOptions = document.querySelectorAll('.ToneOption');
    let selectedTone = 'Analytical/VC';

    function updateCarousel() {
        toneTrack.style.transform = \`translateX(-\${currentToneIndex * 25}%)\`;
    }

    // Left chevron
    document.querySelectorAll('button:has(span:contains("chevron_left")), .material-symbols-outlined:contains("chevron_left")').forEach(btn => {
        let parent = btn.tagName === 'BUTTON' ? btn : btn.parentElement;
        parent.onclick = () => { if (currentToneIndex > 0) { currentToneIndex--; updateCarousel(); } }
    });
    // Right chevron
    document.querySelectorAll('button:has(span:contains("chevron_right")), .material-symbols-outlined:contains("chevron_right")').forEach(btn => {
        let parent = btn.tagName === 'BUTTON' ? btn : btn.parentElement;
        parent.onclick = () => { if (currentToneIndex < tonesCount - 1) { currentToneIndex++; updateCarousel(); } }
    });

    // Make options selectable
    toneOptions.forEach(opt => {
        opt.onclick = () => {
            // Reset all
            toneOptions.forEach(o => {
                o.classList.remove('active-tone', 'bg-surface-container-low', 'border-primary-container/20');
                o.classList.add('bg-surface-container-lowest', 'border-outline-variant/10', 'opacity-60');
                o.querySelector('span').classList.remove('text-primary-container');
                o.querySelector('span').classList.add('text-outline-variant');
                o.querySelector('.tone-radio').classList.replace('border-primary-container', 'border-outline-variant/30');
                o.querySelector('.indicator').classList.replace('bg-primary-container', 'bg-transparent');
            });
            // Activate clicked
            opt.classList.remove('bg-surface-container-lowest', 'border-outline-variant/10', 'opacity-60');
            opt.classList.add('active-tone', 'bg-surface-container-low', 'border-primary-container/20');
            opt.querySelector('span').classList.remove('text-outline-variant');
            opt.querySelector('span').classList.add('text-primary-container');
            opt.querySelector('.tone-radio').classList.replace('border-outline-variant/30', 'border-primary-container');
            opt.querySelector('.indicator').classList.replace('bg-transparent', 'bg-primary-container');
            
            selectedTone = opt.getAttribute('data-tone');
        };
    });
</script>
`;
    step3Html = step3Html.substring(0, startIndex) + newCarouselHtml + step3Html.substring(endIndex);
    
    // Inject saving selectedTone to database mapping
    step3Html = step3Html.replace('data.tone = window.selectedToneValue;', 'data.tone = typeof selectedTone !== "undefined" ? selectedTone : "Analytical/VC";');
    fs.writeFileSync('step3.html', step3Html);
}

// 5. Button Sizes in Step 4
let step4 = fs.readFileSync('step4.html', 'utf8');
// The linkedin button:
// <button id="linkedin-connect-btn" class="flex mx-auto mt-6 items-center px-6 py-3 bg-[#0a66c2] text-white rounded-full font-semibold hover:bg-[#004182] transition-colors gap-3 transform hover:scale-105 active:scale-95" style="">
// The complete setup button (currently doesn't exist or is a smaller button, actually wait, complete setup is the main 'Launch Sequence' button in step 4!)
// "Complete setup icon... Make the Complete setup button the same size as the current LinkedIn account button."
step4 = step4.replace(
    '<a href="success.html" class="flex mx-auto mt-6 items-center px-12 py-4 bg-primary-container text-on-primary rounded-2xl font-bold hover:scale-105 transition-transform">',
    '<a href="success.html" class="flex mx-auto mt-6 items-center justify-center px-6 py-3 w-[260px] bg-primary-container text-on-primary rounded-full font-semibold hover:bg-[#00cc66] transition-colors gap-3 transform hover:scale-105 active:scale-95">'
);
// Standardize linkedin button width
step4 = step4.replace(
    'class="flex mx-auto mt-6 items-center px-6 py-3 bg-[#0a66c2] text-white rounded-full font-semibold hover:bg-[#004182] transition-colors gap-3 transform hover:scale-105 active:scale-95"',
    'class="flex mx-auto mt-6 items-center justify-center px-6 py-3 w-[260px] bg-[#0a66c2] text-white rounded-full font-semibold hover:bg-[#004182] transition-colors gap-3 transform hover:scale-105 active:scale-95"'
);
fs.writeFileSync('step4.html', step4);

console.log("UX Polish #2 Applied!");
