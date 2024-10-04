import { startImport } from './index.js';

const button = document.getElementById('import');
const api_key = document.getElementById('api_key');
const board_id = document.getElementById('board_id');
const data_file = document.getElementById('data_file');
const form = document.querySelector('form');

button.addEventListener('click', async () => {
    const API_KEY = api_key.value;
    const BOARD_ID = board_id.value;
    const dataFile = data_file.files[0];

    try {
        if (!form.checkValidity()) {
            throw new Error('Form is incomplete.');
        }

        await startImport(API_KEY, BOARD_ID, dataFile);
    } catch (error) {
        throw error;
    }
});
