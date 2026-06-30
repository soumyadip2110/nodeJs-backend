function add(a, b) {
    return a + b;
}

function sub(a, b) {
    return a - b;
}

export default {
    addFn: add,
    subFn: sub
};
// export { add as addFn, sub as subFn };
// export const addFn = add;
// export const subFn = sub;
