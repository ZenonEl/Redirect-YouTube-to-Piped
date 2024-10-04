// ==UserScript==
// @name            Easy way to quickly switch from YouTube to piped.video
// @version         0.1.0
// @author          ZenonEl (https://github.com/zerodytrash)
// @license         GPL v3
// @match           https://www.youtube.com/*
// @grant           none
// @run-at          document-start
// @compatible      chrome
// @compatible      firefox
// @compatible      opera
// @compatible      edge
// @compatible      safari
// ==/UserScript==

(function() {
    'use strict';

    let redirectEnabled = false;
    let toggleButton;

    function manageRedirect() {
        if (window.location.hostname === 'www.youtube.com') {
            if (!toggleButton) {
                positionToggleButton();
            }
        } else {
            if (toggleButton) {
                toggleButton.remove();
                toggleButton = null;
            }
        }
    }

    function toggleRedirect(event) {
        event.preventDefault();
        redirectEnabled = !redirectEnabled;

        if (redirectEnabled) {
            const pipedUrl = window.location.href.replace('www.youtube.com', 'piped.video');
            window.location.href = pipedUrl;
        }

        toggleButton.textContent = redirectEnabled ? 'Перенаправление...' : 'Посмотреть на piped.video';
    }

    function positionToggleButton() {
        const videoContainer = document.querySelector('#actions');
        if (!videoContainer) return;

        toggleButton = document.createElement('button');
        toggleButton.textContent = 'Посмотреть на piped.video';
        toggleButton.style.margin = '1vw';
        toggleButton.style.zIndex = '9999';
        toggleButton.style.padding = '10px 15px';
        toggleButton.style.backgroundColor = '#1e1e1e';
        toggleButton.style.color = '#ffffff';
        toggleButton.style.border = 'none';
        toggleButton.style.borderRadius = '5px';
        toggleButton.style.cursor = 'pointer';
        toggleButton.style.fontSize = '1.2em';
        toggleButton.style.transition = 'background-color 0.3s';

        // Эффект при наведении
        toggleButton.addEventListener('mouseover', () => {
            toggleButton.style.backgroundColor = '#333333';
        });
        toggleButton.addEventListener('mouseout', () => {
            toggleButton.style.backgroundColor = '#1e1e1e';
        });

        videoContainer.appendChild(toggleButton);
        toggleButton.addEventListener('click', toggleRedirect);
    }

    window.addEventListener('load', manageRedirect);

    setInterval(manageRedirect, 100);
})();
