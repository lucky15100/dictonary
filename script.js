document.addEventListener('DOMContentLoaded', function () {
    const contentContainer = document.getElementById('content');
    const homeLink = document.getElementById('homeLink');
    const historyLink = document.getElementById('historyLink');

    homeLink.addEventListener('click', showHome);
    historyLink.addEventListener('click', showHistory);

    function showHome() {
        contentContainer.innerHTML = `
            <h2>Home Page</h2>
            <div>
                <label for="wordInput">Enter a word: </label>
                <input type="text" id="wordInput" />
                <button id="searchButton">Search</button>
            </div>
        `;

        // Add click event for search button
        const searchButton = document.getElementById('searchButton');
        searchButton.addEventListener('click', function () {
            const wordInput = document.getElementById('wordInput');
            const enteredWord = wordInput.value.trim();

            if (enteredWord !== '') {
                showWordDetails(enteredWord);
            } else {
                alert('Please enter a word before searching.');
            }
        });
    }

    function showHistory() {
        const history = getHistory();
        const historyHTML = `<h2>Search History</h2>
                            <ul>${history.map(word => `<li><a href="#" class="history-link">${word}</a></li>`).join('')}</ul>`;
        contentContainer.innerHTML = historyHTML;

        // Add click event for history links
        const historyLinks = document.querySelectorAll('.history-link');
        historyLinks.forEach(link => {
            link.addEventListener('click', function () {
                const selectedWord = this.innerText;
                showWordDetails(selectedWord);
            });
        });
    }

    function showWordDetails(word) {
        contentContainer.innerHTML = `<h2>${word}</h2>
                                      <p>Loading...</p>`;

        getWordDetails(word)
            .then(data => {
                const wordDetailsHTML = `<p>Definition: ${data[0].meanings[0].definitions[0].definition}</p>
                                        <p>Part of Speech: ${data[0].meanings[0].partOfSpeech}</p>`;
                contentContainer.innerHTML = wordDetailsHTML;
                
                // Simulate adding to history
                addToHistory(word);
            })
            .catch(error => {
                console.error('Error fetching word details:', error);
                contentContainer.innerHTML = '<p>Error fetching word details. Please try again later.</p>';
            });
    }

    // Initial load - show home page
    showHome();
});
