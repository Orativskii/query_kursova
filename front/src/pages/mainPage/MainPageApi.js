export const addTest = (test) => {
    return fetch(`http://localhost:3001/tests`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(test),
    }).then((res) => {
        return res.status
    });
}

export const loadTests = async (ownerId) => {
    return fetch(`http://localhost:3001/tests/${ownerId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => {
        if (res.status === 200) {
            const payload = res.json();
            return payload.then((tests) => {
                return tests
            });
        }
    });
}