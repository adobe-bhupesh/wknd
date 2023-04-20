import { decorateIcons } from '../../scripts/lib-franklin.js';

export function createHeader(htmlStr) {
    debugger;
    const menuEl = document.createElement('div');
    menuEl.classList.add('wknd-header-wrapper');
    menuEl.innerHTML = htmlStr;

    const menuItems = menuEl.querySelectorAll(':scope > div');
    menuItems[0].classList.add('wknd-logo');

    menuItems[1].classList.add('wknd-menu');

    const searchItem = menuItems[2];
    searchItem.classList.add('search-item');

    const searchInputField = document.createElement('input');
    searchInputField.type = 'text';
    searchInputField.name = 'search';
    searchInputField.classList.add('search-input');
    searchInputField.placeholder = 'Search';

    searchItem.append(searchInputField);

    decorateIcons(searchItem);
    return menuEl;
}
