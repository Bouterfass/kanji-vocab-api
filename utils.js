const getAllTypes = (data) => {
    let arr = [];
    data.forEach(el => {
        el.types.forEach(t => {
            arr.push(t);
        })
    })
    console.log(arr);
    arr = [... new Set(arr)];
    return arr;
}

const parseType = type => {

    if (type.includes("-") && type !== "na-adjective" && type !== "i-adjective") {
        if (type === "Pre-noun-adjectival") {
            const lastIndex = type.lastIndexOf('-');
            return type.substring(0, lastIndex) + " " + type.substring(lastIndex + 1);
        }
        return type.replace('-', ' ');
    }
    if (type === "na-adjective")
        return type.replace("na", 'な')
    if (type === "i-adjective")
        return type.replace("i", 'い')

    return type;
}


module.exports = { getAllTypes, parseType };

