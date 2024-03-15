import notesData from './notesData.js';

class NotesComponent extends HTMLElement {
    constructor() {
        super();
        this.notes = notesData; // Inisialisasi data catatan dari file notesData.js
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.renderNotes();
        this.setupFormListener();
    }

    renderNotes() {
        const notesContainer = document.createElement('div');
        notesContainer.id = 'notes-container';

        
        this.notes.forEach(note => {
            const noteElement = document.createElement('div');
            noteElement.innerHTML = `
                <div class="note-content">
                    <h2>${note.title}</h2>
                    <p>${note.body}</p>
                    <p>Created at: ${note.createdAt}</p>
                    <p>Archived: ${note.archived}</p> 
                </div>
            `;
            notesContainer.appendChild(noteElement);
        });
        

        const style = document.createElement('style');
        style.textContent = `
        #notes-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
            padding: 20px;
            justify-content: space-between;
        }
        
        .note-content{
            background-color: #121212;
            color: rgb(206, 199, 247);
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 20px;
            box-sizing: border-box;
        }
        `;

        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(notesContainer);
    }

    addNote(title, body) {
        const newNote = { title, body, createdAt: new Date().toISOString(), archived: false };
        this.notes.push(newNote);
        const notesContainer = this.shadowRoot.getElementById('notes-container');
        const noteElement = document.createElement('div');
        noteElement.innerHTML = `
            <div class="note-content">
                <h2>${newNote.title}</h2>
                <p>${newNote.body}</p>
                <p>Created at: ${newNote.createdAt}</p>
                <p>Archived: ${newNote.archived}</p> 
            </div>
        `;
        notesContainer.appendChild(noteElement);
    }
    
    setupFormListener() {
        document.addEventListener('newNoteAdded', event => {
            const { title, body } = event.detail;
            this.addNote(title, body);
        });
    }
}

customElements.define('notes-component', NotesComponent);