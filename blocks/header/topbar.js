const countries = [
    {
        icon: 'US',
        name: 'United States',
        languages: [
            'EN-US',
            'ES-US'
        ],
    },
    {
        icon: 'CA',
        name: 'Canada',
        languages: [
            'EN-CA',
            'FR-CA'
        ],
    },
    {
        icon: 'CH',
        name: 'Switzerland',
        languages: [
            'DE-CH',
            'FR-CH',
            'IT-CH'
        ],
    },
    {
        icon: 'DE',
        name: 'Switzerland',
        languages: [
            'DE-DE'
        ],
    },
    {
        icon: 'FR',
        name: 'France',
        languages: [
            'FR-FR'
        ],
    },
    {
        icon: 'ES',
        name: 'Spain',
        languages: [
            'ES-ES'
        ],
    },
    {
        icon: 'IT',
        name: 'Italy',
        languages: [
            'IT-IT'
        ],
    },
];

const ICONS_CACHE = {};

async function getIcon(iconName) {
    if (!ICONS_CACHE[iconName]) {
        ICONS_CACHE[iconName] = true;
        const iconRes = await fetch(`${window.hlx.codeBasePath}/icons/${iconName}.svg`);
        if (!iconRes.ok) {
            ICONS_CACHE[iconName] = false;
            return;
        }
        const svg = await iconRes.text();
        ICONS_CACHE[iconName] = svg;
        return ICONS_CACHE[iconName];
    } else {
        return ICONS_CACHE[iconName];
    }
}

function createLanguageDropdown() {
    const langDropdown = document.createElement('select');
    countries.forEach(item => {
        const opt = document.createElement('option');
        langDropdown.append(opt);

        const img = document.createElement('img');
        const icon = getIcon(item.icon);
        img.src = icon;
        opt.append(img);

        const div = document.createElement('div');
        const p = document.createElement('p');
        p.innerHTML = item.name;
        div.append(p);

        item.languages.forEach(lang => {
            const langEl = document.createElement('div');
            langEl.innerHTML = lang;
            div.append(langEl);
        });

        opt.append(div);
    });
    return langDropdown;
}

export function createTopBar() {
    const $topBar = document.createElement('div');
    $topBar.classList.add('top-bar');

    const welcomeMsg = document.createElement('p');
    welcomeMsg.innerHTML = 'Welcome';
    $topBar.append(welcomeMsg);

    const langDropdown = createLanguageDropdown();
    $topBar.append(langDropdown);
}
