class AddNoteForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.maxNotes = this.getAttribute('max-notes') || 10; 
    }

    connectedCallback() {
        this.renderForm();
        this.setupFormSubmission();
    }

    renderForm() {
        const form = document.createElement('form');
        form.innerHTML = `
            <label for="title">Judul:</label><br>
            <input type="text" id="title" name="title" required minlength="0" maxlength="10"><br><br>
            <label for="body">Isi:</label><br>
            <textarea id="body" name="body" rows="4" cols="50" required minlength="0" maxlength="500"></textarea><br><br>
            <button type="submit">Tambah Catatan</button>
            <div id="error-message" style="color: red;"></div>
        `;

        const style = document.createElement('style');
        style.textContent = `
            /* Form styling - sama seperti sebelumnya */
            /* Validasi pesan error */
            #error-message {
                margin-top: 10px;
                font-size: 14px;
            }
            form {
                max-width: 500px;
                margin: 20px auto;
                padding: 20px;
                background-color: #121212;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            
            label {
                display: block;
                margin-bottom: 5px;
                font-size: 16px;
                color: #fff;
            }
            
            input[type="text"],
            textarea {
                width: 100%;
                padding: 10px;
                margin-bottom: 15px;
                border: none;
                border-radius: 4px;
                background-color: #fff;
                color: #333;
                font-size: 16px;
            }
            
            textarea {
                resize: vertical;
                min-height: 100px;
            }
            
            button[type="submit"] {
                padding: 10px 20px;
                border: none;
                border-radius: 4px;
                background-color: #f9b234;
                color: #fff;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
            }
            
            button[type="submit"]:hover {
                background-color: #e69a0f;
            }
            
            @media screen and (max-width: 768px) {
                form {
                    max-width: 90%;
                }
                
                input[type="text"],
                textarea {
                    width: calc(100% - 20px); 
                }
                
                button[type="submit"] {
                    font-size: 14px;
                    padding: 8px 16px; 
                }
            }
            
            @media screen and (max-width: 480px) {
                input[type="text"],
                textarea {
                    font-size: 14px; 
                }
                
                button[type="submit"] {
                    font-size: 12px; 
                    padding: 6px 12px; 
                }
            }            
            
        `;

        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(form);
    }

    setupFormSubmission() {
        const form = this.shadowRoot.querySelector('form');
        const errorMessage = this.shadowRoot.getElementById('error-message');
        const titleInput = form.querySelector('#title');
        const bodyInput = form.querySelector('#body');
    
        form.addEventListener('submit', event => {
            event.preventDefault();
            if (form.checkValidity()) {
                const formData = new FormData(form);
                const title = formData.get('title');
                const body = formData.get('body');
                const eventToAddNote = new CustomEvent('newNoteAdded', { detail: { title, body } });
                document.dispatchEvent(eventToAddNote);
                form.reset(); // Mengosongkan formulir setelah pengiriman
                errorMessage.textContent = ''; // Menghapus pesan error setelah pengiriman
    
                // Menampilkan alert dengan SweetAlert2
                Swal.fire({
                    icon: 'success',
                    title: 'Catatan berhasil ditambahkan!',
                    showConfirmButton: false,
                    timer: 1500 // Durasi alert ditampilkan dalam milidetik
                });
            } else {
                errorMessage.textContent = 'Harap isi kedua bidang dengan benar.'; // Menampilkan pesan error jika validasi gagal
            }
        });
    
        // Validasi saat pengguna mengetik
        titleInput.addEventListener('input', () => {
            if (!titleInput.validity.valid) {
                titleInput.setCustomValidity('Judul harus terdiri dari 0 hingga 10 karakter.');
            } else {
                titleInput.setCustomValidity('');
            }
        });
    
        bodyInput.addEventListener('input', () => {
            if (!bodyInput.validity.valid) {
                bodyInput.setCustomValidity('Isi harus terdiri dari 0 hingga 500 karakter.');
            } else {
                bodyInput.setCustomValidity('');
            }
        });
    }
}    
customElements.define('add-note-form', AddNoteForm);
