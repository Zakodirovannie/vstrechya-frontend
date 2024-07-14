// utils/cookie.js
export function getCookie(name) {
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ');

    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name) {
            return cookieValue;
        }
    }

    return null;
}

export function deleteCookie(name, path = '/', domain = '.vstrechya.space') {
    if (path === undefined) path = '/';
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=' + path + ';' + (domain ? ' domain=' + domain + ';' : '');
}
