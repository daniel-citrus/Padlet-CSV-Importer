import './style/style.css';

const API_KEY =
    'pdltp_01d47008663dee1ddceaac8f60c53b8dc2d491f5d1287135c84ab844040d7654026d3f';
const BOARD_ID = 'ug6iwn6vavccerwj';

getBoard(API_KEY, BOARD_ID)
    .then((response) => response.text())
    .then((result) => console.log(result));

function createPostJSON(boardID) {
    return {
        data: {
            type: 'post',
            attributes: {
                content: {
                    subject: `Daniel's API post`,
                    body: 'If you see this, then the API post worked.',
                    attachment: {
                        url: 'https://www.daniel-calvo.com',
                        previewImageUrl:
                            'https://daniel-calvo.com/eb99eca034ccbd4d4368.png',
                        caption: `Daniel's website`,
                    },
                    color: 'orange',
                },
            },
        },
    };
}

/* 
{
            type: 'post',
            attributes: {
                content: {
                    subject: `Daniel's first API post`,
                    body: 'If you see this, then the API post worked.',
                    attachment: {
                        url: 'www.daniel-calvo.com',
                        caption: `Daniel's website`,
                    },
                },
                color: 'orange',
            },
            relationships: {
                section: {
                    data: {
                        id: boardID,
                    },
                },
            },
        }
*/

insertPost(API_KEY, BOARD_ID, createPostJSON(BOARD_ID));

async function getBoard(API, boardID) {
    const board = await fetch(
        `https://api.padlet.dev/v1/boards/${boardID}?include=posts%2Csections`,
        {
            headers: {
                'X-Api-Key': API,
                accept: 'application/vnd.api+json',
            },
        }
    );

    return board;
}

async function insertPost(API, boardID, post) {
    fetch(`https://api.padlet.dev/v1/boards/${boardID}/posts`, {
        method: 'POST',
        headers: {
            'X-Api-Key': API,
            accept: 'application/vnd.api+json',
            'content-type': 'application/vnd.api+json',
        },
        body: JSON.stringify(post),
    });
}
