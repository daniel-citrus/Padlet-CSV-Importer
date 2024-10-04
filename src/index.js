import './style/style.css';
import dataFile from './csv/Copy of HUSD N-Word & Hate Speech Policy Ban feedback (Responses) - Form Responses.csv';
import limiter from './bottleneck';
import newFile from './csv-parser';
import Papa from 'papaparse';

const API_KEY =
    'pdltp_01d47008663dee1ddceaac8f60c53b8dc2d491f5d1287135c84ab844040d7654026d3f';
const BOARD_ID = 'ug6iwn6vavccerwj';
const button = document.getElementById('creator');

button.addEventListener('click', async () => {
    try {
        await startImport();
    } catch (error) {
        throw error;
    }
});

async function startImport() {
    try {
        Papa.parse(newFile(dataFile), {
            complete: (results) => {
                populateBoard(results);
            },
            header: true,
        });
    } catch (error) {
        throw error;
    }
}

/**
 * 
 * @param {*} data - Papa parse results object 
    {
        data:   // array of parsed data
        errors: // array of errors
        meta:   // object with extra info
    }
 */
async function populateBoard(data) {
    // get headers from data
    let dataHeaders = data.meta.fields;

    // using headers, get section ids from board
    const sectionIDs = await gatherSections(API_KEY, BOARD_ID);

    // delete dataHeaders that do not exist in the board
    dataHeaders = dataHeaders.filter((header) => {
        return sectionIDs.has(header);
    });

    /* 
    for each data entry
        for each header title
            for each create post json
            insert post
    */

    for (let entry of data.data) {
        for (let header of dataHeaders) {
            const sectionID = sectionIDs.get(header);
            const post = createPostJSON(entry[header], sectionID);
            insertPost(API_KEY, BOARD_ID, post);
        }
    }
}

// get board information
// get board sections
// for each entry, enter each input to the correct section

function createPostJSON(body, sectionID) {
    return {
        data: {
            type: 'post',
            attributes: {
                content: {
                    body,
                },
            },
            relationships: {
                section: {
                    data: {
                        id: sectionID,
                    },
                },
            },
        },
    };
}

// get board object
async function getBoard(API, boardID) {
    try {
        const board = await fetch(
            `https://api.padlet.dev/v1/boards/${boardID}?include=posts,sections`,
            // options
            {
                headers: {
                    'X-Api-Key': API,
                    accept: 'application/vnd.api+json',
                },
            }
        );

        return board;
    } catch (error) {
        throw error;
    }
}

async function insertPost(API, boardID, post) {
    try {
        fetch(`https://api.padlet.dev/v1/boards/${boardID}/posts`, {
            method: 'POST',
            headers: {
                'X-Api-Key': API,
                accept: 'application/vnd.api+json',
                'content-type': 'application/vnd.api+json',
            },
            body: JSON.stringify(post),
        });
    } catch (error) {
        throw error;
    }
}

// get all existing sections
// create map for sections {title: id}
async function gatherSections(API, boardID) {
    try {
        const boardData = await getBoard(API, boardID)
            .then((response) => response.text())
            .then((result) => JSON.parse(result));
        const included = boardData.included;
        const sections = new Map();

        for (let obj of included) {
            if (obj.type !== 'section') {
                continue;
            }

            const title = obj.attributes.title;
            const id = obj.id;

            sections.set(title, id);
        }

        return sections;
    } catch (error) {
        throw error;
    }
}
