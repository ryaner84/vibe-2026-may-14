const REGIONS = [
    { name: 'Singapore', country: 'Singapore', lat: 1.3521, lng: 103.8198 },
    { name: 'United Kingdom', country: 'UK', lat: 55.3781, lng: -3.4360 },
    { name: 'United States', country: 'USA', lat: 37.0902, lng: -95.7129 },
    { name: 'Japan', country: 'Japan', lat: 36.2048, lng: 138.2529 },
    { name: 'Australia', country: 'Australia', lat: -25.2744, lng: 133.7751 },
    { name: 'France', country: 'France', lat: 46.2276, lng: 2.2137 },
    { name: 'Malaysia', country: 'Malaysia', lat: 4.2105, lng: 101.9758 },
    { name: 'UAE', country: 'UAE', lat: 23.4241, lng: 53.8478 },
    { name: 'Thailand', country: 'Thailand', lat: 15.8700, lng: 100.9925 },
    { name: 'China', country: 'China', lat: 35.8617, lng: 104.1954 }
];

const SIMBA_APAC_COUNTRIES = ['Japan', 'Malaysia', 'Thailand', 'Australia', 'China', 'Taiwan', 'Hong Kong', 'Indonesia', 'Philippines', 'Vietnam', 'India', 'South Korea'];
const SIMBA_GLOBAL_COUNTRIES = ['UK', 'USA', 'France', 'UAE', 'Germany', 'Italy', 'Spain', 'Canada'];

const TELCO_DATA = {
    'Singapore': {
        'SIMBA': {
            'categories': {
                'Monthly Plans': {
                    '$10/mo · 50GB': ['SIMBA $10 Monthly Plan'],
                    '$12/mo · 130GB': ['SIMBA $12 130GB Plan'],
                    '$15/mo · 200GB': ['SIMBA $15 200GB Plan']
                },
                'Specialty Plans': {
                    'Senior Package ($8/mo)': ['SIMBA Senior Plan'],
                    'Family Bundle': ['SIMBA MyFamily Plan']
                }
            },
            'roaming': {
                'GroupA': { cost: 'FREE (8GB Roam)', source: 'SIMBA Official (Home)', date: 'May 2026' }
            }
        },
        'Singtel': {
            'categories': {
                'Postpaid (Phone Plans)': {
                    'S / M (~$48–$68/mo)': ['S Plan', 'M Plan'],
                    'L / XL (~$88–$108/mo)': ['L Plan', 'XL Plan']
                },
                'SIM Only Plus': {
                    '$30/mo · 20GB': ['SIM Only Plus 30'],
                    '$45/mo · 50GB': ['SIM Only Plus 45'],
                    '$55/mo · 100GB': ['SIM Only Plus 55']
                },
                'ReadyRoam Add-ons': {
                    '1GB – 18 Countries ($15)': ['ReadyRoam 1GB (18 Countries)'],
                    '2GB – 81 Countries ($25)': ['ReadyRoam 2GB (81 Countries)'],
                    '3GB – 156 Countries ($35)': ['ReadyRoam 3GB (156 Countries)']
                }
            },
            'roaming': {
                'ReadyRoam 1GB (18 Countries)': {
                    'Japan': { zone: 'Zone 1 (A)', cost: 'Included in Bundle ($15)', source: 'Singtel official', date: 'May 2026' },
                    'Malaysia': { zone: 'Zone 1 (A)', cost: 'Included in Bundle ($5)', source: 'Singtel official', date: 'May 2026' }
                },
                'S Plan': {
                    'Japan': { zone: 'Zone 1', cost: '$15 / 1GB (30 days)', source: 'Singtel official', date: 'May 2026' }
                }
            }
        },
        'Starhub': {
            'categories': {
                'Postpaid': {
                    '4G Network Plans': ['Starhub 4G Plan'],
                    '5G Network Plans': ['Starhub 5G Plan']
                },
                'Prepaid': {
                    '$15 Value SIM': ['$15 Prepaid SIM'],
                    '$35 Tourist SIM': ['$35 Prepaid SIM']
                }
            }
        }
    },
    'Malaysia': {
        'Maxis': {
            'categories': {
                'Postpaid': {
                    'RM98/mo Plan': ['Maxis Postpaid 98'],
                    'RM128/mo Plan': ['Maxis Postpaid 128']
                },
                'Prepaid': {
                    'Standard Hotlink': ['Hotlink Prepaid']
                }
            }
        }
    }
};

const VISA_RULES = {
    'Singapore': { 
        'UK': { status: 'Visa Free (6 Months)', source: 'UK Govt', date: 'April 2026' },
        'USA': { status: 'ESTA Required', source: 'US Dept of State', date: 'May 2026' },
        'Japan': { status: 'Visa Free', source: 'Japan MOFA', date: 'May 2026' },
        'France': { status: 'Visa Free', source: 'Schengen Visa Info', date: 'May 2026' },
        'Malaysia': { status: 'Visa Free', source: 'MFA Malaysia', date: 'May 2026' }
    },
    'USA': { 
        'UK': { status: 'Visa Free', source: 'UK Govt', date: 'April 2026' },
        'Singapore': { status: 'Visa Free', source: 'ICA Singapore', date: 'May 2026' }
    }
};

const ADAPTER_DATA = {
    'UK': { types: ['G'], source: 'WorldStandards', date: '2026' },
    'Singapore': { types: ['G'], source: 'WorldStandards', date: '2026' },
    'France': { types: ['C'], source: 'WorldStandards', date: '2026' },
    'Japan': { types: ['A', 'B'], source: 'WorldStandards', date: '2026' },
    'USA': { types: ['A', 'B'], source: 'WorldStandards', date: '2026' },
    'Malaysia': { types: ['G'], source: 'WorldStandards', date: '2026' }
};

const DRIVING_DATA = {
    'Japan': { 
        req: 'International Driving Permit (IDP) 1949 Geneva Convention Required.',
        note: 'The IDP must be issued before your trip. Valid for 1 year.',
        source: 'Japan National Tourism Organization',
        date: 'May 2026'
    }
};

class TravelApp {
    constructor() {
        this.map = null;
        this.markers = [];
        this.fromRegion = null;
        this.toRegion = null;
        this.polyline = null;

        this.initMap();
        this.initEventListeners();
    }

    initMap() {
        this.map = L.map('map', {
            scrollWheelZoom: false,
            dragging: !L.Browser.mobile,
            tap: !L.Browser.mobile
        }).setView([20, 0], 2);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);

        REGIONS.forEach(region => {
            const marker = L.marker([region.lat, region.lng]).addTo(this.map);
            marker.bindTooltip(region.name, { permanent: false, direction: 'top' });
            marker.on('click', () => this.handleRegionClick(region, marker));
            this.markers.push({ region, marker });
        });
    }

    initEventListeners() {
        document.getElementById('reset-map').addEventListener('click', () => this.resetSelection());
        document.getElementById('back-to-map').addEventListener('click', () => this.showSection('map-selection'));
        
        document.getElementById('telco').addEventListener('change', (e) => {
            this.updateCategoryOptions(e.target.value);
        });

        document.getElementById('category').addEventListener('change', (e) => {
            const provider = document.getElementById('telco').value;
            this.updateTierOptions(provider, e.target.value);
        });

        document.getElementById('tier').addEventListener('change', (e) => {
            const provider = document.getElementById('telco').value;
            const category = document.getElementById('category').value;
            this.updatePlanOptions(provider, category, e.target.value);
        });

        document.getElementById('travel-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.generateReport();
        });

        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const app = btn.getAttribute('data-app');
                this.switchApp(app);
            });
        });
    }

    handleRegionClick(region, marker) {
        if (!this.fromRegion) {
            this.fromRegion = region;
            marker.getElement().style.filter = "hue-rotate(120deg) brightness(1.2) drop-shadow(0 0 5px green)";
            document.getElementById('from-display').textContent = region.name;
            document.getElementById('selection-title').textContent = "Select Destination Region";
        } else if (!this.toRegion && region !== this.fromRegion) {
            this.toRegion = region;
            marker.getElement().style.filter = "hue-rotate(340deg) brightness(1.2) drop-shadow(0 0 5px red)";
            document.getElementById('to-display').textContent = region.name;
            
            this.polyline = L.polyline([
                [this.fromRegion.lat, this.fromRegion.lng],
                [this.toRegion.lat, this.toRegion.lng]
            ], { color: 'var(--primary-color)', dashArray: '10, 10', weight: 3 }).addTo(this.map);
            
            setTimeout(() => {
                this.setupAdditionalInfo();
                this.showSection('additional-info');
            }, 600);
        }
    }

    resetSelection() {
        this.fromRegion = null;
        this.toRegion = null;
        if (this.polyline) {
            this.map.removeLayer(this.polyline);
            this.polyline = null;
        }
        this.markers.forEach(m => {
            if (m.marker.getElement()) m.marker.getElement().style.filter = "";
        });
        document.getElementById('from-display').textContent = "---";
        document.getElementById('to-display').textContent = "---";
        document.getElementById('selection-title').textContent = "Select Departure Region";
        this.map.setView([20, 0], 2);
    }

    setupAdditionalInfo() {
        const telcoSelect = document.getElementById('telco');
        const categorySelect = document.getElementById('category');
        const tierSelect = document.getElementById('tier');
        const planSelect = document.getElementById('plan');
        const country = this.fromRegion.country;

        telcoSelect.innerHTML = '<option value="" disabled selected>Select provider</option>';
        categorySelect.innerHTML = '<option value="" disabled selected>Select Provider First</option>';
        tierSelect.innerHTML = '<option value="" disabled selected>Select Plan Type First</option>';
        planSelect.innerHTML = '<option value="" disabled selected>Select Tier First</option>';

        if (TELCO_DATA[country]) {
            Object.keys(TELCO_DATA[country]).forEach(provider => {
                const opt = document.createElement('option');
                opt.value = provider;
                opt.textContent = provider;
                telcoSelect.appendChild(opt);
            });
        } else {
            const opt = document.createElement('option');
            opt.value = 'Global Provider';
            opt.textContent = 'Global Provider';
            telcoSelect.appendChild(opt);
        }
    }

    updateCategoryOptions(provider) {
        const categorySelect = document.getElementById('category');
        const tierSelect = document.getElementById('tier');
        const planSelect = document.getElementById('plan');
        const country = this.fromRegion.country;

        categorySelect.innerHTML = '<option value="" disabled selected>Select plan type</option>';
        tierSelect.innerHTML = '<option value="" disabled selected>Select Plan Type First</option>';
        planSelect.innerHTML = '<option value="" disabled selected>Select Tier First</option>';

        if (TELCO_DATA[country] && TELCO_DATA[country][provider] && TELCO_DATA[country][provider].categories) {
            Object.keys(TELCO_DATA[country][provider].categories).forEach(cat => {
                const opt = document.createElement('option');
                opt.value = cat;
                opt.textContent = cat;
                categorySelect.appendChild(opt);
            });
        } else {
            const opt = document.createElement('option');
            opt.value = 'General';
            opt.textContent = 'General Plans';
            categorySelect.appendChild(opt);
        }
    }

    updateTierOptions(provider, category) {
        const tierSelect = document.getElementById('tier');
        const planSelect = document.getElementById('plan');
        const country = this.fromRegion.country;

        tierSelect.innerHTML = '<option value="" disabled selected>Select tier</option>';
        planSelect.innerHTML = '<option value="" disabled selected>Select Tier First</option>';

        const tiers = TELCO_DATA[country]?.[provider]?.categories?.[category];
        if (tiers) {
            Object.keys(tiers).forEach(tier => {
                const opt = document.createElement('option');
                opt.value = tier;
                opt.textContent = tier;
                tierSelect.appendChild(opt);
            });
        } else {
            const opt = document.createElement('option');
            opt.value = 'Standard';
            opt.textContent = 'Standard';
            tierSelect.appendChild(opt);
        }
    }

    updatePlanOptions(provider, category, tier) {
        const planSelect = document.getElementById('plan');
        const country = this.fromRegion.country;

        planSelect.innerHTML = '<option value="" disabled selected>Select plan</option>';

        const plans = TELCO_DATA[country]?.[provider]?.categories?.[category]?.[tier];
        if (plans) {
            plans.forEach(plan => {
                const opt = document.createElement('option');
                opt.value = plan;
                opt.textContent = plan;
                planSelect.appendChild(opt);
            });
        } else {
            const opt = document.createElement('option');
            opt.value = 'Standard Plan';
            opt.textContent = 'Standard Plan';
            planSelect.appendChild(opt);
        }
    }

    generateReport() {
        const citizenship = document.getElementById('citizenship').value;
        const provider = document.getElementById('telco').value;
        const plan = document.getElementById('plan').value;

        const visa = (VISA_RULES[citizenship] && VISA_RULES[citizenship][this.toRegion.country]) 
            ? VISA_RULES[citizenship][this.toRegion.country] 
            : { status: "Check Embassy", source: "External", date: "N/A" };

        let roaming = { cost: "Standard Rates Apply", source: "Telco Portal", date: "May 2026" };
        let zoneInfo = "";
        
        // Advanced Telco Logic
        if (provider === 'SIMBA') {
            const isAPAC = SIMBA_APAC_COUNTRIES.includes(this.toRegion.name);
            const isGlobal = SIMBA_GLOBAL_COUNTRIES.includes(this.toRegion.name);
            if (plan === 'SIMBA $12 130GB Plan') {
                if (isAPAC) {
                    roaming = { cost: 'FREE (18GB APAC Roam)', source: 'SIMBA Official', date: 'May 2026' };
                    zoneInfo = 'APAC Zone';
                } else if (isGlobal) {
                    roaming = { cost: 'FREE (8GB Global Roam)', source: 'SIMBA Official', date: 'May 2026' };
                    zoneInfo = 'Global Zone';
                }
            } else if (plan === 'SIMBA $15 200GB Plan') {
                if (isAPAC) {
                    roaming = { cost: 'FREE (25GB APAC Roam)', source: 'SIMBA Official', date: 'May 2026' };
                    zoneInfo = 'APAC Zone';
                } else if (isGlobal) {
                    roaming = { cost: 'FREE (10GB Global Roam)', source: 'SIMBA Official', date: 'May 2026' };
                    zoneInfo = 'Global Zone';
                }
            } else if (isAPAC || isGlobal) {
                roaming = { cost: 'FREE (8GB Roam)', source: 'SIMBA Official', date: 'May 2026' };
                zoneInfo = isAPAC ? 'APAC Zone' : 'Global Zone';
            }
        } else if (TELCO_DATA[this.fromRegion.country] && TELCO_DATA[this.fromRegion.country][provider] && TELCO_DATA[this.fromRegion.country][provider].roaming) {
            const roamData = TELCO_DATA[this.fromRegion.country][provider].roaming[plan];
            if (roamData && roamData[this.toRegion.name]) {
                roaming = roamData[this.toRegion.name];
                zoneInfo = roaming.zone ? `${this.toRegion.name} - ${roaming.zone}` : "";
            }
        }

        const adapter = ADAPTER_DATA[this.toRegion.country] || { types: ['Standard'], source: 'General', date: '2026' };
        const driving = DRIVING_DATA[this.toRegion.country];

        const adapterHtml = adapter.types.map(t => {
            let socketInner = '';
            if (t === 'A') socketInner = '<div class="socket-hole hole-1"></div><div class="socket-hole hole-2"></div>';
            if (t === 'B') socketInner = '<div class="socket-hole hole-1"></div><div class="socket-hole hole-2"></div><div class="socket-hole ground"></div>';
            if (t === 'C') socketInner = '<div class="socket-hole hole-1"></div><div class="socket-hole hole-2"></div>';
            if (t === 'G') socketInner = '<div class="socket-hole top-hole"></div><div class="bottom-pins"><div class="socket-hole"></div><div class="socket-hole"></div></div>';
            
            return `
                <div class="adapter-box">
                    <span class="type-label">Type ${t} Socket</span>
                    <div class="plug-face type-${t.toLowerCase()}">
                        ${socketInner}
                    </div>
                </div>
            `;
        }).join('');

        const reportHtml = `
            <div class="report-content">
                <div class="report-header">
                    <div class="report-route">
                        <span>${this.fromRegion.name}</span>
                        <span class="route-arrow">✈️</span>
                        <span>${this.toRegion.name}</span>
                    </div>
                    <p>Intelligence Report for ${citizenship} Passport Holders</p>
                </div>
                
                <div class="report-grid">
                    <div class="report-item">
                        <h3>🛂 Visa Status</h3>
                        <div class="status-badge">${visa.status}</div>
                        <div class="data-meta">
                            <span>Source: ${visa.source}</span>
                            <span>Updated: ${visa.date}</span>
                        </div>
                    </div>
                    
                    <div class="report-item">
                        <h3>📶 Data Roaming (${provider})</h3>
                        <div class="status-badge">${roaming.cost}</div>
                        <p style="font-size: 0.75rem; margin-top: 0.5rem;">
                            Plan: <strong>${plan}</strong><br>
                            ${zoneInfo ? `Destination: <strong>${zoneInfo}</strong>` : ''}
                        </p>
                        <div class="data-meta">
                            <span>Source: ${roaming.source}</span>
                            <span>Updated: ${roaming.date}</span>
                        </div>
                    </div>

                    <div class="report-item">
                        <h3>🔌 Destination Wall Sockets</h3>
                        <div class="adapter-visual">
                            ${adapterHtml}
                        </div>
                        <div class="data-meta">
                            <span>Source: ${adapter.source}</span>
                            <span>Updated: ${adapter.date}</span>
                        </div>
                    </div>

                    ${driving ? `
                    <div class="report-item">
                        <h3>🚗 Driving Requirements</h3>
                        <div class="status-badge" style="background-color: oklch(60% 0.15 30);">IDP Required</div>
                        <p style="font-size: 0.8rem; margin-top: 0.5rem;">${driving.req} ${driving.note}</p>
                        <div class="data-meta">
                            <span>Source: ${driving.source}</span>
                            <span>Updated: ${driving.date}</span>
                        </div>
                    </div>
                    ` : `
                    <div class="report-item">
                        <h3>💡 Travel Tip</h3>
                        <p style="font-size: 0.85rem; opacity: 0.8;">Always keep a digital copy of your ${citizenship} passport in a secure cloud storage.</p>
                        <div class="data-meta">
                            <span>Source: Vibe Intelligence</span>
                            <span>Updated: May 2026</span>
                        </div>
                    </div>
                    `}
                </div>

                <button id="restart-travel" class="btn-primary" style="margin-top: 2rem;">Explore Another Region</button>
            </div>
        `;

        const reportContainer = document.getElementById('travel-report');
        reportContainer.innerHTML = reportHtml;
        this.showSection('travel-report');

        document.getElementById('restart-travel').addEventListener('click', () => {
            this.resetSelection();
            this.showSection('map-selection');
        });
    }

    showSection(id) {
        ['map-selection', 'additional-info', 'travel-report'].forEach(sid => {
            const el = document.getElementById(sid);
            if (el) el.style.display = (sid === id) ? 'block' : 'none';
        });
        if (id === 'map-selection' && this.map) {
            setTimeout(() => this.map.invalidateSize(), 100);
        }
    }

    switchApp(app) {
        document.getElementById('toto-app').style.display = app === 'toto' ? 'block' : 'none';
        document.getElementById('travel-app').style.display = app === 'travel' ? 'block' : 'none';
        
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-app') === app);
        });

        if (app === 'travel' && this.map) {
            setTimeout(() => this.map.invalidateSize(), 100);
        }
    }
}

window.addEventListener('load', () => {
    window.travelApp = new TravelApp();
});
