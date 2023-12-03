// Simulating API calls
const getWordDetails = async (word) => {
    // You can replace this with actual API calls
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();
    return data;
};

// Simulating storing history in localStorage
const addToHistory = (word) => {
    let history = JSON.parse(localStorage.getItem('history')) || [];
    history.push(word);
    localStorage.setItem('history', JSON.stringify(history));
};

const getHistory = () => {
    return JSON.parse(localStorage.getItem('history')) || [];
};
