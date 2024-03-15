import notesData from './notesData.js';

class SearchComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.renderSearchBar();
        this.setupSearchListener();
        this.addStyles(); 
    }

    renderSearchBar() {
        const searchBar = document.createElement('div');
        searchBar.innerHTML = `
            <input type="text" id="searchInput" placeholder="Search notes...">
        `;

        this.shadowRoot.appendChild(searchBar);
    }

    setupSearchListener() {
        const searchInput = this.shadowRoot.getElementById('searchInput');

        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();
            const notesContainer = document.querySelector('notes-component').shadowRoot.getElementById('notes-container');

            notesContainer.innerHTML = ''; 
            notesData.forEach(note => {
                if (note.title.toLowerCase().includes(searchTerm) || note.body.toLowerCase().includes(searchTerm)) {
                    const noteElement = document.createElement('div');
                    noteElement.classList.add('note-content');
                    noteElement.innerHTML = `
                        <h2>${note.title}</h2>
                        <p>${note.body}</p>
                        <p>Created at: ${note.createdAt}</p>
                        <p>Archived: ${note.archived}</p> 
                    `;
                    notesContainer.appendChild(noteElement);
                }
            });
        });
    }


    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Style for the search input */
            #searchInput {
                width: 25%;
                padding: 15px;
                border: 1px solid #ccc;
                border-radius: 5px;
                font-size: 16px;
                box-sizing: border-box;
                margin : 20px;
            }

            #searchInput:focus {
                outline: none;
                border-color: #007bff;
            }
        `;

        this.shadowRoot.appendChild(style);
    }
}

customElements.define('search-component', SearchComponent);
