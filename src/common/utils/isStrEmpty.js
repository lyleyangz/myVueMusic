function isStrEmpty(str) {
    if (str.replace(/(^s*)|(s*$)/g, "").length ==0) {
        return true;
    } else {
        return false;
    }
}
export default isStrEmpty;