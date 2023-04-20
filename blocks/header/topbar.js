const countries = [
    {
        langCode: 'US',
        name: 'United States',
        languages: [
            'EN-US',
            'ES-US'
        ],
    },
    {
        langCode: 'CA',
        name: 'Canada',
        languages: [
            'EN-CA',
            'FR-CA'
        ],
    },
    {
        langCode: 'CH',
        name: 'Switzerland',
        languages: [
            'DE-CH',
            'FR-CH',
            'IT-CH'
        ],
    },
    {
        langCode: 'DE',
        name: 'Switzerland',
        languages: [
            'DE-DE'
        ],
    },
    {
        langCode: 'FR',
        name: 'France',
        languages: [
            'FR-FR'
        ],
    },
    {
        langCode: 'ES',
        name: 'Spain',
        languages: [
            'ES-ES'
        ],
    },
    {
        langCode: 'IT',
        name: 'Italy',
        languages: [
            'IT-IT'
        ],
    },
];

const ICONS_CACHE = {};

const SELECTED_LANG = {
    langData: countries[0],
};

let $langElButton = null;
let $topBar = null;
const $langNav = document.createElement('nav');

async function getIcon(iconName) {
    if (!ICONS_CACHE[iconName]) {
        // ICONS_CACHE[iconName] = true;
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
    const langDropdown = document.createElement('ul');
    langDropdown.classList.add('lang-list');
    countries.forEach(async item => {
        const opt = document.createElement('li');
        opt.classList.add('lang-list-item');
        opt.setAttribute('data-lang-code', item.langCode);
        langDropdown.append(opt);

        opt.addEventListener('click', (evt) => {
            const langCode = evt.currentTarget.getAttribute('data-lang-code');
            const langData = countries.filter(item => item.langCode === langCode);
            SELECTED_LANG.langData = langData[0];
            createLangButton();
            $langNav.classList.remove('show');
            $langNav.classList.add('hide')
        });

        const iconEl = document.createElement('div');
        iconEl.classList.add('lang-list-icon');
        const icon = await getIcon(item.langCode);
        iconEl.innerHTML = icon;
        opt.append(iconEl);

        const div = document.createElement('div');
        div.classList.add('lang-list-desc')
        const p = document.createElement('p');
        p.innerHTML = item.name;
        div.append(p);

        const langEl = document.createElement('div');
        langEl.classList.add('lang-code');
        let languages = [];
        item.languages.forEach(lang => {
            languages.push(lang);
        });
        langEl.innerHTML = languages.join(' | ');
        div.append(langEl);
        opt.append(div);
    });
    return langDropdown;
}

async function createLangButton() {
    if (SELECTED_LANG.langData) {
        if (!$langElButton) {
            $langElButton = document.createElement('button');
            $langElButton.classList.add('lang-button');

            $langElButton.addEventListener('click', () => {
                $langNav.classList.remove('hide');
                $langNav.classList.add('show');
            });

            const iconEl = document.createElement('span');
            iconEl.classList.add('lang-list-icon');
            const icon = await getIcon(SELECTED_LANG.langData.langCode);
            iconEl.innerHTML = icon;
            $langElButton.append(iconEl);
            $topBar.append($langElButton);

            const desc = document.createElement('span');
            desc.classList.add('lang-list-desc');
            const descTxt = document.createElement('span');
            descTxt.classList.add('desc-txt');
            descTxt.innerHTML = SELECTED_LANG.langData.name;
            desc.append(descTxt);
            $langElButton.append(desc);

            const langEl = document.createElement('span');
            langEl.classList.add('lang-code');
            let languages = [];
            SELECTED_LANG.langData.languages.forEach(lang => {
                languages.push(lang);
            });
            langEl.innerHTML = languages.join(' | ');
            desc.append(langEl);
        } else {
            const iconEl = $langElButton.querySelector('.lang-list-icon');
            // const descEl = $langElButton.querySelector('.lang-list-desc');
            const descTxt = $langElButton.querySelector('.desc-txt');
            const langCodeEl = $langElButton.querySelector('.lang-code');

            const icon = await getIcon(SELECTED_LANG.langData.langCode);
            iconEl.innerHTML = icon;

            descTxt.innerHTML = SELECTED_LANG.langData.name;

            let languages = [];
            SELECTED_LANG.langData.languages.forEach(lang => {
                languages.push(lang);
            });
            langCodeEl.innerHTML = languages.join(' | ');
        }
    }
}

export function createTopBar() {
    const $topBarWrapper = document.createElement('div');
    $topBarWrapper.classList.add('top-bar-wrapper');
    $topBar = document.createElement('div');
    $topBar.classList.add('top-bar');

    const welcomeMsg = document.createElement('p');
    welcomeMsg.classList.add('welcome-msg');
    welcomeMsg.innerHTML = 'Welcome';
    $topBar.append(welcomeMsg);

    createLangButton();

    $langNav.classList.add('lang-nav');
    $langNav.classList.add('hide');
    const langDropdown = createLanguageDropdown();
    $langNav.append(langDropdown);
    $topBar.append($langNav);
    $topBarWrapper.append($topBar);
    return $topBarWrapper;
}
