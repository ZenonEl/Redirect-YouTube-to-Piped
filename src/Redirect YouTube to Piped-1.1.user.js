// ==UserScript==
// @name            Easy way to quickly switch between YouTube and Piped
// @description     Devoted Piped user but sometimes encounter YouTube links? No problem! This extension lets you quickly jump between the two. 🌈
// @version         0.1.0
// @author          ZenonEl (https://github.com/ZenonEl)
// @license         GPL v3
// @match           https://www.youtube.com/*
// @match           https://piped.video/*
// @grant           none
// @icon            https://raw.githubusercontent.com/ZenonEl/Redirect-YouTube-to-Piped/main/assets/icon_64.png
// @namespace       https://github.com/ZenonEl/Redirect-YouTube-to-Piped/
// @supportURL      https://github.com/ZenonEl/Redirect-YouTube-to-Piped/issues
// @updateURL       https://github.com/ZenonEl/Redirect-YouTube-to-Piped/raw/refs/heads/main/src/Redirect%20YouTube%20to%20Piped-1.1.user.js
// @run-at          document-end
// @compatible      chrome
// @compatible      firefox
// @compatible      opera
// @compatible      edge
// @compatible      safari
// ==/UserScript==

(function() {
    'use strict';

    let redirectEnabled = false;
    let youtubeToggle;
    let pipedToggle;

    function manageToggles() {
        if (window.location.hostname === 'www.youtube.com') {
            if (!youtubeToggle) {
                positionYoutubeToggleButton();
            }
        } else if (window.location.hostname === 'piped.video') {
            if (!pipedToggle) {
                positionPipedToggleButton();
            }
        } else {
            if (youtubeToggle) {
                youtubeToggle.remove();
                pipedToggle?.remove();
                youtubeToggle = null;
                pipedToggle = null;
            }
        }
    }

    function toggleRedirect(event) {
        event.preventDefault();
        redirectEnabled = !redirectEnabled;

        if (redirectEnabled) {
            const targetUrl = window.location.hostname === 'www.youtube.com'
                ? window.location.href.replace('www.youtube.com', 'piped.video')
                : window.location.href.replace('piped.video', 'www.youtube.com');
            window.location.href = targetUrl;
        }

        const toggleText = redirectEnabled ? 'Перенаправление...' : 'Просмотреть на YouTube';
        updateToggleButtonText(youtubeToggle, pipedToggle, toggleText);
    }

    function positionYoutubeToggleButton() {
        const videoContainer = document.querySelector('#actions');
        if (!videoContainer) return;

        youtubeToggle = document.createElement('button');
        pipedToggle = document.createElement('button');

        setupCommonStyles(youtubeToggle, pipedToggle);

        youtubeToggle.textContent = 'Перейти на Piped';
        pipedToggle.textContent = 'Перейти на YouTube';

        videoContainer.appendChild(youtubeToggle);
        //videoContainer.appendChild(pipedToggle);

        youtubeToggle.addEventListener('click', () => toggleRedirect({ preventDefault: () => {} }));
        pipedToggle.addEventListener('click', () => toggleRedirect({ preventDefault: () => {} }));

        addHoverEffect(youtubeToggle);
        addHoverEffect(pipedToggle);
    }

    function positionPipedToggleButton() {
        const videoContainer = document.querySelector('.flex.flex-wrap.gap-1');
        if (!videoContainer) return;

        pipedToggle = document.createElement('button');
        youtubeToggle = document.createElement('button');

        setupCommonStyles(youtubeToggle, pipedToggle);

        pipedToggle.textContent = 'Перейти на YouTube';
        youtubeToggle.textContent = 'Перейти на Piped';

        //videoContainer.appendChild(youtubeToggle);
        videoContainer.appendChild(pipedToggle);

        youtubeToggle.addEventListener('click', () => toggleRedirect({ preventDefault: () => {} }));
        pipedToggle.addEventListener('click', () => toggleRedirect({ preventDefault: () => {} }));

        addHoverEffect(youtubeToggle);
        addHoverEffect(pipedToggle);
    }

    function setupCommonStyles(button1, button2) {
        button1.style.margin = '1vw';
        button1.style.zIndex = '9999';
        button1.style.padding = '10px 15px';
        button1.style.backgroundColor = '#1e1e1e';
        button1.style.color = '#ffffff';
        button1.style.border = 'none';
        button1.style.borderRadius = '5px';
        button1.style.cursor = 'pointer';
        button1.style.fontSize = '1.2em';
        button1.style.transition = 'background-color 0.3s';

        button2.style.margin = '1vw';
        button2.style.zIndex = '9999';
        button2.style.padding = '10px 15px';
        button2.style.backgroundColor = '#1e1e1e';
        button2.style.color = '#ffffff';
        button2.style.border = 'none';
        button2.style.borderRadius = '5px';
        button2.style.cursor = 'pointer';
        button2.style.fontSize = '1.2em';
        button2.style.transition = 'background-color 0.3s';
    }

    function addHoverEffect(button) {
        button.addEventListener('mouseover', () => {
            button.style.backgroundColor = '#333333';
        });
        button.addEventListener('mouseout', () => {
            button.style.backgroundColor = '#1e1e1e';
        });
    }

    function updateToggleButtonText(youtubeToggle, pipedToggle, text) {
        youtubeToggle.textContent = text;
        pipedToggle.textContent = text;
    }

    window.addEventListener('load', manageToggles);
    setInterval(manageToggles, 100);
})();