export function normalizeString(string) {
    return string.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}

export function escapeString(string) {
    return string.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

export function highlightString(string, query)
{
    const start_index = normalizeString(string).indexOf(query);
    const end_index = start_index + query.length;

    return string.substring(0, start_index)
        + `<b>${string.substring(start_index, end_index)}</b>`
        + string.substring(end_index);
}