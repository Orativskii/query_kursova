export const passTest = (testResults) => {
    return fetch(`http://localhost:3001/results`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(testResults),
    }).then((res) => {
        if (res.status === 200) {
            console.log(res)
            const payload = res.json();
            return payload.then((results) => {
                console.log(results)
                return results
            });
        }
    });
}

export const getResults = async (userId, guid) => {
    return fetch(`http://localhost:3001/results/${userId}/${guid}`, {
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