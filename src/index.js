import './style/style.scss';
import './input-form.js';
import './media-imports.js';
import { limiter } from './bottleneck';
import Papa from 'papaparse';

export async function startImport(api_key, board_id, data_files) {
    try {
        for (let file of data_files) {
            Papa.parse(file, {
                complete: (results) => {
                    populateBoard(api_key, board_id, results);
                },
                header: true,
            });
        }
    } catch (error) {
        throw error;
    }
}

/**
 * 
 * @param {*} data - File object 
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

    // Total number of post entries
    const processCount = data_file.data.length * dataHeaders.length;
    // Increment by one for each process
    let currentCount = 0;

    for (let entry of data_file.data) {
        for (let header of dataHeaders) {
            const sectionID = sectionIDs.get(header);
            const post = createPostJSON(entry[header], sectionID);

            await limiter.schedule(() => {
                currentCount++;
                console.log(currentCount / processCount);
                return Promise.all([insertPost(api_key, board_id, post)]);
            });
        }
    }
}

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

async function getBoard(api_key, board_id) {
    try {
        const board = await fetch(
            `https://api.padlet.dev/v1/boards/${board_id}?include=posts,sections`,
            // options
            {
                headers: {
                    'X-Api-Key': api_key,
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
