    let notes: any[] = [];

    // Initial static notes for display.
    let initialNotes = [
        { id: "001", title: "Morning Meeting", text: "Discuss project updates.", category: "Meeting", completeBy: "20/3/2024, 9:00 AM", created: "10/2/2024, 8:00 AM", location: "Conference Room", imageURL: "https://www.skillcast.com/hubfs/YoungPeopleBusinessMeeting_1200x627.jpg" },
        { id: "002", title: "Team Lunch", text: "At the Italian place near office.", category: "Meeting", completeBy: "25/3/2024, 1:00 PM", created: "18/1/2023, 12:00 PM", location: "Mario's Diner", imageURL: "https://t3.ftcdn.net/jpg/02/61/98/24/360_F_261982444_jDzDlgClqQDc5DX47Qy4PSayvcn89vQi.jpg" },
        { id: "003", title: "Jog in the Park", text: "Evening jogging session.", category: "SportsAndLeisure", completeBy: "30/3/2024, 6:00 PM", created: "9/2/2024, 5:00 PM", location: "Central Park", imageURL: "https://b2254564.smushcdn.com/2254564/wp-content/uploads/sites/73/2021/07/A-jog-in-the-park.jpg?lossy=1&strip=1&webp=1" },
        { id: "004", title: "Yoga Class", text: "Early morning yoga session.", category: "SportsAndLeisure", completeBy: "27/3/2024, 7:00 AM", created: "10/3/2024, 6:00 AM", location: "Yoga Studio", imageURL: "https://www.constantcontact.com/blog/wp-content/uploads/2021/06/Social-4.jpg" },
        { id: "005", title: "House cleaning", text: "cleaning the kitchen & living room", category: "Tasks", completeBy: "17/3/2024, 8:00AM", created: "15/3/2024, 9:00PM", imageURL: "https://freshysites.com/wp-content/uploads/house-cleaning.jpg" },
        { id: "006", title: "Practice data structure", text: "keep practicing data structure for the mahat final exam", category: "Tasks", completeBy: "20/5/2024, 8:00AM", created: "16/3/2024, 9:00PM", imageURL: "https://i0.wp.com/rollercoasteryears.com/wp-content/uploads/Thrive-During-Finals-.jpg?fit=1000%2C667&ssl=1" }
    ];


    // Prepend initial notes to the dynamic ones and call the all notes.
    function renderInitialNotes() {
        notes = [...initialNotes, ...notes]; 
        renderNotes(); 
    }


    // Function to render notes to the HTML page.
    function renderNotes() {
        const notesContainer = document.getElementById('notesContainer');
        if (!notesContainer) return;

        notesContainer.innerHTML = notes.map(note => `
            <div class="note">
                <h2>ID: ${note.id}</h2>
                <p>Category: ${note.category}
                <p>Title: ${note.title}</p>
                <p>Description: ${note.text}</p>
                ${note.location ? `<p>Location: ${note.location}</p>` : ''}
                <p>Complete by: ${note.completeBy}</p>
                <p>Created: ${note.created}</p>
                ${note.imageURL ? `<img src="${note.imageURL}" alt="Note image" class="note-image"><br>` : ''}
                <button class="deleteNoteBtn edit-mode-action" data-noteid="${note.id}" style="display: ${isEditMode ? 'inline-block' : 'none'};">Delete</button>
            </div>
        `).join('');
    } 

    // Track the ID note number in the correct order.
        let highestId = initialNotes.reduce((max, note) => Math.max(max, parseInt(note.id)), 0);
        let notecounter = highestId + 1;

    // Function to add a new note.
    function addNote(
        title: string,
        text: string,
        category2: string,
        location2: string, 
        completionDate: string,
        completionTime: string) {
        const date = new Date().toLocaleDateString();
        const completionDateInput = document.getElementById('completionDate') as HTMLInputElement;
        const completionTimeInput = document.getElementById('completionTime') as HTMLInputElement;
        const categorySelect = document.getElementById('noteCategory') as HTMLSelectElement;
        const imageURLInput = document.getElementById('imageURL') as HTMLInputElement;
        const locationInput = document.getElementById('locationInput') as HTMLInputElement;

        let location = '';
        if (categorySelect.value === 'Meetings' || categorySelect.value === 'SportsAndLeisure') {
            location = locationInput.value;
        }

        const completionDateTime = completionDateInput.value && completionTimeInput.value
            ? new Date(completionDateInput.value + 'T' + completionTimeInput.value).toLocaleString()
            : 'No deadline';

            const category = categorySelect ? categorySelect.value : 'General';
            const created = new Date().toLocaleString();
            const id = padNumber(notecounter, 3);

        const newNote = {
            id,
            title,
            text,
            imageURL: imageURLInput.value,
            created1: date,
            completeBy: completionDateTime,
            category,
            created,
            location,
            category2,
            location2,
            completionDate,
            completionTime
        };
        notes.push(newNote);
        notecounter++;
        renderNotes();
        imageURLInput.value = '';
    }


    // function to return the counting of the ID's (auxiliary function)
    function padNumber(num: number, length: number): string {
        let numAsString = num.toString();
        while (numAsString.length < length) {
            numAsString = '0' + numAsString;
        }
        return numAsString;
    }

    // Tracks whether the page is in edit mode.
    let isEditMode = false; 

    // Function for mode toggling by on click. 
    function toggleEditMode() {
        isEditMode = !isEditMode; 
        
        // Update button text or appearance based on the mode.
        const editModeButton = document.getElementById('editModeButton') as HTMLElement;
        if (editModeButton) {
            editModeButton.textContent = isEditMode ? 'Exit Edit Mode' : 'Enter Edit Mode';
        }

        // Toggle display of edit mode actions (like delete buttons).
        document.querySelectorAll('.edit-mode-action').forEach(element => {
            const button = element as HTMLElement; 
            button.style.display = isEditMode ? 'inline-block' : 'none';
        });
    }


    function setupNoteActions() {
        const notesContainer = document.getElementById('notesContainer');
        notesContainer.addEventListener('click', event => {
            const target = event.target as HTMLElement;
            // Check if we're in edit mode and if the clicked element is a delete button
            if (isEditMode && target.matches('.deleteNoteBtn')) {
                const noteId = target.getAttribute('data-noteid'); // Get the note ID
                deleteNote(noteId);
            }
        });
    }

    // Function to delete a note by its ID.
    function deleteNote(id: string) {
        notes = notes.filter(note => note.id !== id);
        renderNotes();
    }

    // Setup function to connect UI events JavaScript logic.
    function setupUIEvents() {
        const addNoteButton = document.getElementById('addNoteButton');
        if (addNoteButton) {
            addNoteButton.addEventListener('click', () => {
                const titleInput = document.getElementById('noteTitle') as HTMLInputElement;
                const textInput = document.getElementById('noteText') as HTMLInputElement;
                const categorySelect = document.getElementById('noteCategory') as HTMLSelectElement;
                const locationInput = document.getElementById('locationInput') as HTMLInputElement;
                const completionDateInput = document.getElementById('completionDate') as HTMLInputElement;
                const completionTimeInput = document.getElementById('completionTime') as HTMLInputElement;
                const imageURLInput = document.getElementById('imageURL') as HTMLInputElement; // Assuming this exists
                const notesContainer = document.getElementById('notesContainer');
                notesContainer.addEventListener('click', event => {
                    const target = event.target as HTMLElement;
                    if (isEditMode && target.classList.contains('deleteNoteBtn')){
                        const noteId = target.getAttribute('data-noteid');
                        if(noteId) deleteNote(noteId)
                    }
                });

                let location = '';
                if (categorySelect && (categorySelect.value === 'Meetings' || categorySelect.value === 'SportsAndLeisure')) {
                    location = locationInput.value;
                }
                // Correctly call addNote with all the collected information.
                if (titleInput && textInput && categorySelect && completionDateInput && completionTimeInput && imageURLInput) {
                    addNote(
                        titleInput.value,
                        textInput.value,
                        categorySelect.value,
                        location,
                        completionDateInput.value,
                        completionTimeInput.value
                    );
                    
                    // Clear the form fields after adding the note
                    titleInput.value = '';
                    textInput.value = '';
                    locationInput.value = ''; // Clear the location input if used
                    completionDateInput.value = '';
                    completionTimeInput.value = '';
                    imageURLInput.value = ''; // Clear the image URL input
                }
            });
        }

        // Handling category selection changes to show/hide the location input.
        const categorySelect = document.getElementById('noteCategory') as HTMLSelectElement;
        const locationInputContainer = document.getElementById('locationInputContainer') as HTMLElement;
        categorySelect.addEventListener('change', () => {
            if (categorySelect.value === 'Meetings' || categorySelect.value === 'SportsAndLeisure') {
                locationInputContainer.style.display = 'block'; 
            } else {
                locationInputContainer.style.display = 'none'; 
            }
        });
    }

    // Ensures the DOM is fully loaded before setting up UI events.
    document.addEventListener('DOMContentLoaded', () => {
        renderInitialNotes();
        setupUIEvents();
        setupNoteActions();
    });
