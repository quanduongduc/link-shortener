export function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch (err) {
        return false;
    }
}

export function isValidAlias(alias) {
    try {
        const regex = /^[A-Za-z0-9]{4,}$/;
        return regex.test(alias);
    } catch (error) {
        return false
    }
}