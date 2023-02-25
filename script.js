// ==UserScript==
// @name         mapgenie.io - unofficial custom presets
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  ''
// @author       github.com/crashbone
// @match        https://mapgenie.io/elden-ring/maps/the-lands-between
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const customFilterConfiguration = {
        "PRESET 1": ['dungeon', 'site of grace', 'legacy dungeon', 'merchant', 'boss', 'great boss', 'elite enemy', 'enemy', 'legendary boss']
    };
    const categories = document.querySelector('#categories');

    // create PRESETS
    const presets = document.createElement('div');
    presets.classList.toggle('header', true);
    presets.innerText = 'unofficial presets';

    // create PRESETS -> Group
    const group = document.createElement('div');
    group.classList.toggle('group-categories', true);
    presets.appendChild(group);

    const customFilters = [];
    Object.entries(customFilterConfiguration).forEach(([filterName, filterObject], index) => {
        // create PRESETS -> Group -> FILTER
        const customFilter = document.createElement('div');
        customFilters.push(customFilter);
        customFilter.classList.toggle('category-item', true);
        customFilter.classList.toggle('category-hidden', true);
        // icon
        const icon = document.createElement('div');
        icon.classList.toggle('icon', true);
        icon.innerText = index + 1;
        customFilter.appendChild(icon);
        // title
        const title = document.createElement('div');
        title.classList.toggle('title', true);
        title.innerText = filterName;
        customFilter.appendChild(title);
        // bubble
        const bubble = document.createElement('div');
        bubble.classList.toggle('bubble', true);
        bubble.innerText = filterObject.length;
        customFilter.appendChild(bubble);

        // click
        const filterNames = filterObject;
        const foundFilters = [];
        filterNames.forEach((filter, index) => { filterNames[index] = filter.toLowerCase() });
        filterNames.forEach(filterName => {
            console.log(filterName);
            const filter = [...categories.querySelectorAll('.title')].find(f => f.innerText.toLowerCase() === filterName);
            if (!filter) {
                console.log(`${filterName} not found!`);
                return;
            }
            foundFilters.push(filter);
        });
        console.log(foundFilters);
        const hideAll = document.querySelector('#hide-all');
        customFilter.addEventListener('click', () => {
           hideAll.click();
           foundFilters.forEach(foundFilter => foundFilter.click());
           customFilter.classList.toggle('category-hidden', false);
           setTimeout(() => { customFilter.classList.toggle('category-hidden', true); }, 1000);
        })

        // add it to custom presets list
        group.appendChild(customFilter);
    })

    categories.insertBefore(presets, categories.firstChild);
    // click first custom filter right-away
    customFilters[0].click();
})();
