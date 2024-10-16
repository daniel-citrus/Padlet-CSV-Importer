import '../../style/loading-bar.css';
import './loading-bar.js';

const loadScreen = document.querySelector('.pop.importing');
const loadBar = new ldBar('#loadingBar');

// function updateLoadBar
function updateLoader(val) {
    loadBar.set(val);
}

function toggleLoadScreen(show = true) {
    if (show) {
        loadScreen.classList.remove('hidden');
    } else {
        loadScreen.classList.add('hidden');
    }
}

export { updateLoader, toggleLoadScreen };
