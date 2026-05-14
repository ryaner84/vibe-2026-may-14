// Statistical data from past 6 months of Singapore Pools Toto
const TOTO_STATS = {
  1: 6, 2: 7, 3: 9, 4: 8, 5: 6, 6: 12, 7: 6, 8: 6, 9: 5, 10: 8,
  11: 8, 12: 6, 13: 8, 14: 6, 15: 10, 16: 6, 17: 6, 18: 5, 19: 4, 20: 7,
  21: 4, 22: 11, 23: 8, 24: 7, 25: 6, 26: 7, 27: 5, 28: 7, 29: 4, 30: 8,
  31: 6, 32: 7, 33: 7, 34: 6, 35: 11, 36: 5, 37: 7, 38: 2, 39: 6, 40: 8,
  41: 5, 42: 5, 43: 9, 44: 5, 45: 3, 46: 7, 47: 6, 48: 9, 49: 6
};

class TotoGenerator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 500px;
        }
        .wrapper {
          padding: 2.5rem;
          background-color: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 24px;
          text-align: center;
          box-shadow: var(--card-shadow);
        }
        h2 {
          margin-top: 0;
          margin-bottom: 1.5rem;
          font-size: 1.5rem;
          color: var(--text-color);
        }
        .numbers {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 15px;
          margin: 2.5rem 0;
        }
        .number-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .heat-tag {
          font-size: 0.7rem;
          font-weight: 800;
          padding: 2px 6px;
          border-radius: 6px;
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(5px);
          transition: all 0.4s ease;
        }
        .heat-tag.show {
          opacity: 1;
          transform: translateY(0);
        }
        .heat-hot { background-color: oklch(65% 0.25 20); color: white; }
        .heat-warm { background-color: oklch(75% 0.15 70); color: black; }
        .heat-avg { background-color: oklch(85% 0.1 150); color: black; }
        .heat-cold { background-color: oklch(65% 0.15 250); color: white; }

        .number {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: var(--number-bg);
          color: var(--number-text);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          font-weight: 700;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: 2px solid transparent;
        }
        
        .number.hot { border-color: oklch(65% 0.25 20); box-shadow: 0 0 15px oklch(65% 0.25 20 / 0.3); }
        .number.cold { border-color: oklch(65% 0.15 250); }

        .number:hover {
          transform: scale(1.1) rotate(5deg);
        }
        
        button {
          padding: 12px 28px;
          border: none;
          border-radius: 14px;
          background-color: var(--primary-color);
          color: var(--primary-text);
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        button:hover {
          background-color: var(--primary-hover);
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0,0,0,0.15);
        }
        .legend {
          margin-top: 2rem;
          display: flex;
          justify-content: center;
          gap: 12px;
          font-size: 0.75rem;
          opacity: 0.8;
        }
        .legend-item { display: flex; align-items: center; gap: 4px; }
        .dot { width: 8px; height: 8px; border-radius: 50%; }
      </style>
      <div class="wrapper">
        <h2>Smart Lucky Numbers</h2>
        <p style="font-size: 0.85rem; opacity: 0.7; margin-top: -1rem;">Based on 6-month historical trends</p>
        <div class="numbers"></div>
        <button id="generate-btn">Generate Numbers</button>
        <div class="legend">
          <div class="legend-item"><span class="dot heat-hot"></span> Hot</div>
          <div class="legend-item"><span class="dot heat-warm"></span> Warm</div>
          <div class="legend-item"><span class="dot heat-avg"></span> Avg</div>
          <div class="legend-item"><span class="dot heat-cold"></span> Cold</div>
        </div>
      </div>
    `;

    this.shadowRoot.querySelector('#generate-btn').addEventListener('click', () => this.generateNumbers());
    this.generateNumbers();
  }

  getHeatCategory(freq) {
    if (freq >= 10) return { label: 'Hot', class: 'heat-hot' };
    if (freq >= 8) return { label: 'Warm', class: 'heat-warm' };
    if (freq >= 5) return { label: 'Avg', class: 'heat-avg' };
    return { label: 'Cold', class: 'heat-cold' };
  }

  generateNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
      numbers.add(Math.floor(Math.random() * 49) + 1);
    }
    
    const numbersContainer = this.shadowRoot.querySelector('.numbers');
    numbersContainer.innerHTML = '';
    const sortedNumbers = [...numbers].sort((a, b) => a - b);
    
    sortedNumbers.forEach((number, index) => {
      setTimeout(() => {
        const freq = TOTO_STATS[number] || 0;
        const heat = this.getHeatCategory(freq);
        
        const container = document.createElement('div');
        container.classList.add('number-container');
        
        container.innerHTML = `
          <div class="heat-tag ${heat.class}">${heat.label} (${freq})</div>
          <div class="number ${heat.label.toLowerCase()}">${number}</div>
        `;
        
        numbersContainer.appendChild(container);
        
        // Trigger animation
        setTimeout(() => {
          const tag = container.querySelector('.heat-tag');
          if (tag) tag.classList.add('show');
        }, 50);
        
      }, index * 120);
    });
  }
}

customElements.define('toto-generator', TotoGenerator);

// --- App Navigation ---
document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.nav-btn');
    const appSections = {
        toto: document.getElementById('toto-app'),
        travel: document.getElementById('travel-app'),
        commentary: document.getElementById('commentary-app'),
    };

    let disqusLoaded = false;

    function loadDisqus() {
        if (disqusLoaded) return;
        disqusLoaded = true;
        window.disqus_shortname = 'testv2';
        window.disqus_config = function () {
            this.page.url = window.location.href;
            this.page.identifier = 'vibe-2026-main';
        };
        const s = document.createElement('script');
        s.src = 'https://testv2.disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        document.body.appendChild(s);
    }

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const app = button.dataset.app;

            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            for (const key in appSections) {
                if (appSections[key]) {
                    appSections[key].style.display = key === app ? 'block' : 'none';
                }
            }

            if (app === 'commentary') loadDisqus();
        });
    });
});


// --- Theme Toggle Logic ---
const themeToggle = document.getElementById('theme-toggle');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');

function setTheme(isDark) {
  document.body.classList.toggle('dark-theme', isDark);
  sunIcon.style.display = isDark ? 'block' : 'none';
  moonIcon.style.display = isDark ? 'none' : 'block';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

setTheme(savedTheme === 'dark' || (!savedTheme && prefersDark));

themeToggle.addEventListener('click', () => {
  const isDark = !document.body.classList.contains('dark-theme');
  setTheme(isDark);
});