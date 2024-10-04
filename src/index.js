import './style/style.css';

const API_KEY =
    'pdltp_01d47008663dee1ddceaac8f60c53b8dc2d491f5d1287135c84ab844040d7654026d3f';
const BOARD_ID = 'ug6iwn6vavccerwj';
const button = document.getElementById('creator');

button.addEventListener('click', () => {
    const post = createPostJSON();
    insertPost(API_KEY, BOARD_ID, post);
});

gatherSections(API_KEY, BOARD_ID);

function createPostJSON(sectionID) {
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
            relationships: {
                section: {
                    data: {
                        id: 'sec_mWng4l10KnMJ2zdJ',
                    },
                },
            },
        },
    };
}

// get board object
async function getBoard(API, boardID) {
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

// get all existing sections
// create map for sections {title: id}
async function gatherSections(API, boardID) {
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

    console.log(sections);
}
