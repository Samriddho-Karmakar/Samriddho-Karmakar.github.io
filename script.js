// ---- nav toggle ----
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
}));

document.getElementById('emailLink').addEventListener('click', function(e){
  e.preventDefault();
  window.location.href = 'mailto:your.email@example.com';
});

// ---- project data (fill in the blanks marked TODO) ----
const projects = [
  {
    id: 'mithu',
    filename: 'mithu-web-ide.tsx',
    tag: 'flagship',
    name: 'Mithu Web IDE',
    shortDesc: 'A web-based code editor built from scratch — my most ambitious build to date.',
    about: 'TODO: Mithu Web IDE is a browser-based coding environment designed for students, beginners, and developers who want a simple place to write and test code. It supports multiple web languages, provides file management, and includes a live preview so users can see their work instantly without constantly switching tools. It solves the problem of needing separate software for editing, organizing, and previewing web projects.',
    tech: ['TODO: HTML/CSS, JavaScript, Node.js'],
    shotCount: 4,
    visitUrl: 'https://mwide.pages.dev',
    visitLabel: 'Visit Site',
    downloadUrl: null,
    img: 'Templates/mwide.png'
  },
  {
    id: 'drawtools',
    filename: 'sk-drawtools.tsx',
    tag: 'tool',
    name: 'SK Drawtools',
    shortDesc: 'A drawing / design utility, part of my personal suite of dev tools.',
    about: 'TODO: SK DrawTools is a creative drawing application that lets users create digital sketches, diagrams, and simple visual designs using an easy-to-use interface. It is aimed at students, hobbyists, and anyone who needs a lightweight tool for quickly turning ideas into drawings. The project focuses on making basic digital creation accessible without the complexity of professional design software.',
    tech: ['TODO: Python, CustomTkinter'],
    shotCount: 4,
    visitUrl: 'https://samriddho-karmakar.blogspot.com/2025/10/welcome-to-portal-to-samriddho-karmakar_11.html',
    visitLabel: 'View Portal',
    downloadUrl: null,
    img: 'Templates/drawtools.png'
  },
  {
    id: 'sce',
    filename: 'sce-academy.tsx',
    tag: 'client',
    name: 'Samriddho Computer Education',
    shortDesc: 'Website built for a computer education institute — from brief to live deployment.',
    about: "TODO: This project involved building a website for Samriddho Computer Education, a computer training institute that needed an online presence for showcasing courses, providing admission information, sharing contact details, and managing student-related information. I designed and developed the website, including features such as student details and QR-based certificates, to make the institute's services more accessible online. My role covered the overall web development, functionality, and user experience of the platform.",
    tech: ['TODO: HTML/CSS, JavaScript, Node.js, SQLite'],
    shotCount: 4,
    visitUrl: 'https://sceacademy.pages.dev',
    visitLabel: 'Visit Site',
    downloadUrl: null,
    img: 'Templates/sce.png'
  }
];

// ---- render project cards ----
const grid = document.getElementById('projectGrid');
projects.forEach(p => {
  const card = document.createElement('div');
  card.className = 'ide-window project-card';
  card.innerHTML = `
    <div class="ide-titlebar"><span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span><span class="ide-filename">${p.filename}</span></div>
    <div class="ide-body">
      <div class="project-thumb"><img src="${p.img}" placeholder="Project Screenshot" width=80%></img></div>
      <span class="project-tag">${p.tag}</span>
      <h3>${p.name}</h3>
      <p class="desc">${p.shortDesc}</p>
      <div class="project-actions">
        <button class="btn btn-primary btn-small" data-project="${p.id}">View Details</button>
        <a href="${p.visitUrl}" target="_blank" rel="noopener" class="btn btn-ghost btn-small">${p.visitLabel}</a>
      </div>
    </div>
  `;
  grid.appendChild(card);
});

// ---- modal logic ----
const overlay = document.getElementById('modalOverlay');
const modalContent = document.getElementById('modalContent');
const modalFilename = document.getElementById('modalFilename');
let lastFocused = null;

function openModal(id){
  const p = projects.find(x => x.id === id);
  if(!p) return;
  modalFilename.textContent = p.filename;

  let shots = '';
  for(let i=0;i<p.shotCount;i++){
    shots += `<div class="shot-placeholder">screenshot ${i+1}<br>(replace with image)</div>`;
  }

  let techHtml = p.tech.map(t => `<span class="tech-pill">${t}</span>`).join('');

  let actions = `<a href="${p.visitUrl}" target="_blank" rel="noopener" class="btn btn-primary">${p.visitLabel}</a>`;
  if(p.downloadUrl){
    actions += `<a href="${p.downloadUrl}" target="_blank" rel="noopener" class="btn btn-ghost">Download</a>`;
  }

  modalContent.innerHTML = `
    <span class="modal-tag">${p.tag}</span>
    <h2 id="modalTitle">${p.name}</h2>

    <!-- <div class="modal-section-label">Screenshots</div>
    <div class="shot-grid">${shots}</div> -->

    <div class="modal-section-label">About the Project</div>
    <p class="about">${p.about}</p>

    <div class="modal-section-label">Technologies Used</div>
    <div class="tech-row">${techHtml}</div>

    <div class="modal-actions">${actions}</div>
  `;

  lastFocused = document.activeElement;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('modalCloseBtn').focus();
}

function closeModal(){
  overlay.classList.remove('open');
  document.body.style.overflow = '';
  if(lastFocused) lastFocused.focus();
}

grid.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-project]');
  if(btn) openModal(btn.dataset.project);
});

document.getElementById('modalCloseBtn').addEventListener('click', closeModal);
overlay.addEventListener('click', (e) => { if(e.target === overlay) closeModal(); });
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
});

// ---- contact form (Formspree) ----
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', async function(e){
  e.preventDefault();

  const submitBtn = contactForm.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';
  formStatus.textContent = '';
  formStatus.className = 'form-status';

  try{
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { 'Accept': 'application/json' }
    });

    if(response.ok){
      formStatus.textContent = 'Message sent — thanks! I\'ll get back to you soon.';
      formStatus.className = 'form-status success';
      contactForm.reset();
    } else {
      formStatus.textContent = 'Something went wrong. Please try the direct email link below instead.';
      formStatus.className = 'form-status error';
    }
  } catch(err){
    formStatus.textContent = 'Could not send — check your connection, or use the direct email link below.';
    formStatus.className = 'form-status error';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';
  }
});
