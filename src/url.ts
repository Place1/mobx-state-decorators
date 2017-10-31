/**
 * This method will return the value of a url parameter
 * with @name.
 * If the parameter doesn't exist it will return undefined.
 * It will only return the first match, it doesn't support multiple
 * values for the same parameter!
 *
 * @credit https://davidwalsh.name/query-string-javascript
 */
export function getUrlParameter(name: string) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp(`[\\?&]${name}=([^&#]*)`);
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
