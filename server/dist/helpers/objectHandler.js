"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ObjectHandler {
}
exports.default = ObjectHandler;
ObjectHandler.getResource = (data) => {
    // Single object
    if (typeof data == 'object' && data.length === undefined)
        return Object.fromEntries(Object.entries(data).filter(([_, v]) => v != null && v != 0));
    // Single element array
    if (data.length === 1)
        return Object.fromEntries(Object.entries(data[0]).filter(([_, v]) => v != null && v != 0));
    // Multi element array
    const resource = [];
    for (const res of data) {
        resource.push(Object.fromEntries(Object.entries(res).filter(([_, v]) => v != null && v != 0)));
    }
    return resource;
};
ObjectHandler.objectToSQLParams = (data, glue = ',') => {
    if (Object.keys(data).length === 0)
        return false;
    const results = [];
    for (const [key, value] of Object.entries(data)) {
        const tmpVal = typeof value === 'string' || value instanceof String ? `'${value}'` : value;
        results.push(` ${key} = ${tmpVal} `);
    }
    return results.join(glue).trim();
};
