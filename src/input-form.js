import { startImport } from './index.js';

const button = document.getElementById('import');
const api_key = document.getElementById('api_key');
const board_id = document.getElementById('board_id');
const data_file = document.getElementById('data_file');
const form = document.querySelector('form');

const disclaimerLink = document.getElementById('disclaimer');
const disclaimerPop = document.querySelector('.pop.disclaimer');
const clickBackdrops = document.querySelectorAll('.click-backdrop');
const instructionsLink = document.getElementById('instructions');
const instructionsPop = document.querySelector('.pop.instructions');

(() => {
    disclaimerLink.addEventListener('click', () => {
        disclaimerPop.classList.remove('hidden');
        disableBodyScroll();
    });

    instructionsLink.addEventListener('click', () => {
        instructionsPop.classList.remove('hidden');
        disableBodyScroll();
    });

    clickBackdrops.forEach((backdrop) => {
        backdrop.addEventListener('click', (e) => {
            if (e.target.classList.contains('click-backdrop')) {
                backdrop.classList.add('hidden');
            }

            disableBodyScroll(false);
        });
    });
})();

function disableBodyScroll(disable = true) {
    const body = document.querySelector('body');

    if (disable) {
        body.classList.add('no-scroll');
    } else {
        body.classList.remove('no-scroll');
    }
}

button.addEventListener('click', async (e) => {
    const API_KEY = api_key.value;
    const BOARD_ID = board_id.value;
    const dataFiles = data_file.files;

    try {
        if (!form.reportValidity()) {
            throw new Error('Form is incomplete.');
        }

        if (!validateFileType(dataFiles)) {
            data_file.value = '';
            throw new Error('Invalid file type.');
        }

        await startImport(API_KEY, BOARD_ID, dataFiles);
    } catch (error) {
        console.error(error);
    }
});

function validateFileType(files) {
    const validTypes = new Set(['csv']);

    for (let file of files) {
        const fileName = file.name;
        const fileType = fileName.split('.')[1];

        if (validTypes.has(fileType)) {
            return true;
        }
    }

    return false;
}
