const saveArray = (key, data) => localStorage.setItem(key, JSON.stringify(data));
const loadArray = key => {
    return JSON.parse(localStorage.getItem(key));    
};

export { saveArray, loadArray };