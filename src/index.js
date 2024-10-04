import './style/style.scss';
import './input-form.js';
import dataFile from './csv/HUSD N-Word & Hate Speech Policy Ban feedback (Responses) - Form Responses.csv';
import { limiter } from './bottleneck';
import newFile from './csv-parser';
import Papa from 'papaparse';

/* const API_KEY =
    'pdltp_01d47008663dee1ddceaac8f60c53b8dc2d491f5d1287135c84ab844040d7654026d3f';
const BOARD_ID = 'ug6iwn6vavccerwj'; */

export async function startImport(api_key, board_id, data_file) {
    try {
        Papa.parse(data_file, {
            complete: (results) => {
                populateBoard(api_key, board_id, results);
            },
            header: true,
        });
    } catch (error) {
        console.log('hi');
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
async function populateBoard(api_key, board_id, data_file) {
    // get headers from data
    let dataHeaders = data_file.meta.fields;

    // using headers, get section ids from board
    const sectionIDs = await gatherSections(api_key, board_id);

    // delete dataHeaders that do not exist on the board
    dataHeaders = dataHeaders.filter((header) => {
        return sectionIDs.has(header);
    });

    for (let entry of data_file.data) {
        for (let header of dataHeaders) {
            const sectionID = sectionIDs.get(header);
            const post = createPostJSON(entry[header], sectionID);

            await limiter.schedule(() => {
                return Promise.all([insertPost(api_key, board_id, post)]);
            });
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
