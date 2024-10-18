import * as interfaces from './interfaces';

const databaseURL = 'https://pfsc-inv-man.fly.dev/';

export const getFromDatabase = async (endpoint: string): Promise<Array<any>> => {
    return await fetch(databaseURL + endpoint, { method: 'GET' })
        .then(res => res.json())
        .then(res => res)
        .catch(err => { throw err; });
};

export const updateDatabase = async (endpoint: string, body: Object): Promise<interfaces.databaseResponse> => {
    return await fetch(databaseURL + endpoint, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
        .then(res => res.json())
        .then(res => res)
        .catch(err => { throw err; });
};

export const deleteFromDatabase = async (endpoint: string, body: Object): Promise<interfaces.databaseResponse> => {
    return await fetch(databaseURL + endpoint, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
        .then(res => res.json())
        .then(res => res)
        .catch(err => { throw err; });
};

export const addToDatabase = async (endpoint: string, body: Object) => {
    return await fetch(databaseURL + endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
        .then(res => res.json())
        .then(res => res)
        .catch(err => { throw err; });
};
