document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('terminal-toggle-btn');
  const closeBtn = document.getElementById('terminal-close-btn');
  const terminalDrawer = document.getElementById('terminal-drawer');
  const terminalForm = document.getElementById('terminal-form');
  const inputField = document.getElementById('terminal-input');
  const outputDiv = document.getElementById('terminal-output');
  const menuToggle = document.getElementById('menu-toggle');
  const siteNav = document.getElementById('site-nav');

  function setTerminalOpen(isOpen) {
    terminalDrawer.classList.toggle('hidden', !isOpen);
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('terminal-open', isOpen);
    if (isOpen) {
      inputField.focus();
    }
  }

  function setMenuOpen(isOpen) {
    siteNav.classList.toggle('is-open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  }

  toggleBtn.addEventListener('click', () => {
    const willOpen = terminalDrawer.classList.contains('hidden');
    setTerminalOpen(willOpen);
  });

  closeBtn.addEventListener('click', () => {
    setTerminalOpen(false);
  });

  menuToggle.addEventListener('click', () => {
    setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      setMenuOpen(false);
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') {
      return;
    }
    setMenuOpen(false);
    if (!terminalDrawer.classList.contains('hidden')) {
      setTerminalOpen(false);
    }
  });

  function appendCommandLine(command) {
    const line = document.createElement('div');
    line.className = 'term-line';
    const prompt = document.createElement('span');
    prompt.className = 'term-prompt';
    prompt.textContent = 'Aarin@portfolio:~$';
    line.append(prompt, document.createTextNode(' ' + command));
    outputDiv.appendChild(line);
  }

  function runCommand(command) {
    appendCommandLine(command);

    if (command === 'clear') {
      outputDiv.replaceChildren();
      return;
    }

    if (command === '') {
      return;
    }

    const response = document.createElement('div');
    response.className = 'term-line';

    switch (command) {
      case 'help':
        response.innerHTML = 'Available commands:<br>&nbsp;&nbsp;- <strong>skills</strong>: List key technical skills<br>&nbsp;&nbsp;- <strong>projects</strong>: Show featured projects<br>&nbsp;&nbsp;- <strong>github</strong>: Link to GitHub profile<br>&nbsp;&nbsp;- <strong>clear</strong>: Clear terminal screen';
        break;
      case 'skills':
        response.textContent = 'Languages & Web: C, Python, JavaScript, HTML5, CSS3, SQL | Frameworks & Libraries: Node.js, Express, Pandas, NumPy, Matplotlib, Tkinter | Tools & Databases: Figma, Git, GitHub, MySQL, SSMS';
        break;
      case 'projects':
        response.textContent = '1. Breakfast Boost — Morning Made Better | 2. Sensor Anomaly Monitor (TelemetryIQ) | 3. Collaborative Project Management Dashboard (confidential)';
        break;
      case 'github': {
        response.append(document.createTextNode('GitHub: '));
        const link = document.createElement('a');
        link.href = 'https://github.com/aarinfarande';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = 'github.com/aarinfarande';
        response.append(link);
        break;
      }
      default:
        response.textContent = `Command not recognized: '${command}'. Type 'help' for available commands.`;
    }

    outputDiv.appendChild(response);
    outputDiv.scrollTop = outputDiv.scrollHeight;
  }

  function submitCommand(event) {
    event.preventDefault();
    const command = inputField.value.trim().toLowerCase();
    inputField.value = '';
    runCommand(command);
  }

  inputField.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      submitCommand(event);
    }
  });

  terminalForm.addEventListener('submit', submitCommand);
});
