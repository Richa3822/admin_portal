export function getValueFromObjectByKey(object, key, defaultValue = undefined) {
    const value = key.split('.').reduce((a, b) => {
        if (a[b]) {
            return a[b]
        }
        return defaultValue;
    }, object)

    return value;
}