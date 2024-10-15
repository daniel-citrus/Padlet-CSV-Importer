import { startImport } from './index.js';

const button = document.getElementById('import');
const api_key = document.getElementById('api_key');
const board_id = document.getElementById('board_id');
const dropZone = document.getElementById('drop_zone');
const data_file = document.getElementById('data_file');
const form = document.querySelector('form');

const disclaimerLink = document.getElementById('disclaimer');
const disclaimerPop = document.querySelector('.pop.disclaimer');
const clickBackdrops = document.querySelectorAll('.click-backdrop');
const instructionsLink = document.getElementById('instructions');
const instructionsPop = document.querySelector('.pop.instructions');
const closers = document.querySelectorAll('button.closer');

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

<<<<<<< HEAD
    closers.forEach((closer) => {
        closer.addEventListener('click', (e) => {
            const popper = e.target.parentElement.parentElement;
            popper.classList.add('hidden');
        });
=======
    dropZone.addEventListener('dragover', (e) => {
        console.log('File(s) in drop zone');

        // Prevent default behavior (Prevent file from being opened)
        e.preventDefault();
    });

    dropZone.addEventListener('ondrop', (e) => {
        console.log('file dropped');
        e.preventDefault();

        if (e.dataTransfer.items) {
            // Use DataTransferItemList interface to access the file(s)
            [...e.dataTransfer.items].forEach((item, i) => {
                // If dropped items aren't files, reject them
                if (item.kind === 'file') {
                    const file = item.getAsFile();
                    console.log(`… file[${i}].name = ${file.name}`);
                }
            });
        } else {
            // Use DataTransfer interface to access the file(s)
            [...e.dataTransfer.files].forEach((file, i) => {
                console.log(`… file[${i}].name = ${file.name}`);
            });
        }
    });

    dropZone.addEventListener('dragenter', () => {
        dropZone.classList.add('dragHover');
    });
    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragHover');
>>>>>>> f757975 (drop and drop style)
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
