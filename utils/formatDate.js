function dateFormat(timestamp) {
    //format the date as MM/DD/YYYY
    return `${new Date(timestamp).toLocaleDateString()}`;
}

module.exports = dateFormat;