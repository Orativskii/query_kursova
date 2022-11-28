export const login = (username, password) => {
    return fetch(`http://localhost:3001/users/auth`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({username, password}),
    }).then((res) => {
        if (res.status === 200) {
            const payload = res.json();
            return payload.then((p) => {
                localStorage.setItem("userId", p.id);
                return res.status;
            });
        }
    });
}

export const register = async (username, password) => {
    return await fetch(`http://localhost:3001/users/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({username, password}),
    }).then((res) => {
        return res.status
    });
}