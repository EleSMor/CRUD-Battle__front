const BASE_URL = 'http://localhost:3500'; // NODE Server Url
const getCharsUrl = `${BASE_URL}/characters`;

export const getAllChars = async () => {
    const request = await fetch(getCharsUrl, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });

    const allCharacters = await request.json();
    if(!request.ok) {
       throw new Error('Error on fetch', allCharacters.message);
    };
    return allCharacters;
};