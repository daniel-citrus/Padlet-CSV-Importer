import './style/style.css';
import dataFile from './csv/Copy of HUSD N-Word & Hate Speech Policy Ban feedback (Responses) - Form Responses 1.csv';

const API_KEY =
    'pdltp_01d47008663dee1ddceaac8f60c53b8dc2d491f5d1287135c84ab844040d7654026d3f';
const BOARD_ID = 'ug6iwn6vavccerwj';
const button = document.getElementById('creator');

button.addEventListener('click', async () => {
    try {
        const sections = await gatherSections(API_KEY, BOARD_ID);

        console.log(dataFile);
        for (let input of dataFile) {
            const properties = Object.getOwnPropertyNames(input); // use Papa parse to get headers and to remove this nested loop
            console.log(input);

            for (let property of properties) {
                const sectionID = sections.get(property);

                if (!sectionID) {
                    continue;
                }
            }
        }
    } catch (error) {
        throw error;
    }
});

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
        console.log('hdfdf');
        throw error;
    }
}
