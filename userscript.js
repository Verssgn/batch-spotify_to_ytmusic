// ==UserScript==
// @name         Copy Playlist Links
// @namespace    http://tampermonkey.net/
// @version      1
// @icon         https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green.png
// @description  Copy Playlist Links from spotify
// @author       VERS
// @match        https://open.spotify.com/*
// @grant        GM_setClipboard
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    function extractPlaylistLinks() {
        let playlistLinks = [];
        document.querySelectorAll('li[role="listitem"]').forEach(item => {
            const div = item.querySelector('div[data-encore-id="listRow"]');
            if (div) {
                const ariaLabelledBy = div.getAttribute('aria-labelledby');
                if (ariaLabelledBy && ariaLabelledBy.includes('spotify:playlist:')) {
                    const playlistUri = ariaLabelledBy.split('listrow-title-')[1];
                    const playlistLink = `https://open.spotify.com/playlist/${playlistUri.split(':')[2]}`;
                    playlistLinks.push(playlistLink);
                }
            }
        });
        return playlistLinks;
    }

    function copyToClipboard() {
        const playlistLinks = extractPlaylistLinks();
        const linksString = playlistLinks.join('\n');
        GM_setClipboard(linksString);
        alert(`${playlistLinks.length} playlist links copied to clipboard!`);
    }

    function addCopyButton() {
        const button = document.createElement('button');

        button.style.padding = '10px';
        button.style.backgroundColor = 'transparent';
        button.style.color = '#FFFFFF';
        button.style.border = 'none';
        button.style.borderRadius = '5px';
        button.style.cursor = 'pointer';
        button.style.zIndex = '1000';
        button.style.marginRight = '10px';

        const buttonInner = document.createElement('span');
        buttonInner.className = 'ButtonInner-sc-14ud5tc-0 gDlqhe encore-over-media-set';

        const iconWrapper = document.createElement('span');
        iconWrapper.className = 'IconWrapper__Wrapper-sc-1hf1hjl-0 fIXqki';
        const icon = document.createElement('img');
        icon.src = 'https://i.imgur.com/JtESbL4.png';
        icon.style.width = '16px';
        icon.style.height = '16px';

        iconWrapper.appendChild(icon);

        const buttonText = document.createElement('span');
        buttonText.className = 'encore-text encore-text-body-small-bold ellipsis-one-line';
        buttonText.innerText = 'Copy Playlists Links';

        buttonInner.appendChild(iconWrapper);
        buttonInner.appendChild(buttonText);

        button.appendChild(buttonInner);

        button.addEventListener('click', copyToClipboard);

        const targetContainer = document.querySelector('.VUXMMFKWudUWE1kIXZoS.rwdnt1SmeRC_lhLVfIzg');
        if (targetContainer) {
            targetContainer.prepend(button);
        }
    }

    window.addEventListener('load', () => {
        setTimeout(addCopyButton, 2000);
    });
})();
