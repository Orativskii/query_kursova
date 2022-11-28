export const addQuery = (query, uuid) => {
    return fetch(`http://localhost:3001/tests/query`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({...query, guid: uuid}),
    }).then((res) => {
        return res.status
    });
}

export const loadQueries = async (guid) => {
    return await fetch(`http://localhost:3001/tests/guid/${guid}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(async (res) => {
        if (res.status === 200) {
            const payload = res.json();
            return await payload
        }
    });
}