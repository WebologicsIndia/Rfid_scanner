export async function fetchWithToken(url: string, method: string, headers?: any, body?: string | FormData) {
    let header = {
        "content-type": "application/json",
        "accept": "application/json",
    };
    if (headers)
        header = {
            ...header,
            ...headers
        };
    const resp = await fetch(url, {
        method: method,
        headers: header,
        body
    });

    return resp;
}
