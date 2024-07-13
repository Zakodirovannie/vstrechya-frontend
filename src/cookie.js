// utils/cookie.js
export function getCookie(name) {
    console.log('document.cookie:', document.cookie);
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ');

    for (let cookie of cookies) {
        console.log('Processing cookie:', cookie);
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name) {
            console.log(`Found ${name}: ${cookieValue}`);
            return cookieValue;
        }
    }

    return null;
}
