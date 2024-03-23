var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var notes = [];
// Initial static notes for display.
var initialNotes = [
    { id: "001", title: "Morning Meeting", text: "Discuss project updates.", category: "Meeting", completeBy: "20/3/2024, 9:00 AM", created: "10/2/2024, 8:00 AM", location: "Conference Room", imageURL: "https://www.skillcast.com/hubfs/YoungPeopleBusinessMeeting_1200x627.jpg" },
    { id: "002", title: "Team Lunch", text: "At the Italian place near office.", category: "Meeting", completeBy: "25/3/2024, 1:00 PM", created: "18/1/2023, 12:00 PM", location: "Mario's Diner", imageURL: "https://t3.ftcdn.net/jpg/02/61/98/24/360_F_261982444_jDzDlgClqQDc5DX47Qy4PSayvcn89vQi.jpg" },
    { id: "003", title: "Jog in the Park", text: "Evening jogging session.", category: "SportsAndLeisure", completeBy: "30/3/2024, 6:00 PM", created: "9/2/2024, 5:00 PM", location: "Central Park", imageURL: "https://b2254564.smushcdn.com/2254564/wp-content/uploads/sites/73/2021/07/A-jog-in-the-park.jpg?lossy=1&strip=1&webp=1" },
    { id: "004", title: "Yoga Class", text: "Early morning yoga session.", category: "SportsAndLeisure", completeBy: "27/3/2024, 7:00 AM", created: "10/3/2024, 6:00 AM", location: "Yoga Studio", imageURL: "https://www.constantcontact.com/blog/wp-content/uploads/2021/06/Social-4.jpg" },
    { id: "005", title: "House cleaning", text: "cleaning the kitchen & living room", category: "Tasks", completeBy: "17/3/2024, 8:00AM", created: "15/3/2024, 9:00PM", imageURL: "https://freshysites.com/wp-content/uploads/house-cleaning.jpg" },
    { id: "006", title: "Practice data structure", text: "keep practicing data structure for the mahat final exam", category: "Tasks", completeBy: "20/5/2024, 8:00AM", created: "16/3/2024, 9:00PM", imageURL: "https://i0.wp.com/rollercoasteryears.com/wp-content/uploads/Thrive-During-Finals-.jpg?fit=1000%2C667&ssl=1" }
];
// Prepend initial notes to the dynamic ones and call the all notes.
function renderInitialNotes() {
    notes = __spreadArray(__spreadArray([], initialNotes, true), notes, true);
    renderNotes();
}
// Function to render notes to the HTML page.
function renderNotes() {
    var notesContainer = document.getElementById('notesContainer');
    if (!notesContainer)
        return;
    notesContainer.innerHTML = notes.map(function (note) { return "\n            <div class=\"note\">\n                <h2>ID: ".concat(note.id, "</h2>\n                <p>Category: ").concat(note.category, "\n                <p>Title: ").concat(note.title, "</p>\n                <p>Description: ").concat(note.text, "</p>\n                ").concat(note.location ? "<p>Location: ".concat(note.location, "</p>") : '', "\n                <p>Complete by: ").concat(note.completeBy, "</p>\n                <p>Created: ").concat(note.created, "</p>\n                ").concat(note.imageURL ? "<img src=\"".concat(note.imageURL, "\" alt=\"Note image\" class=\"note-image\"><br>") : '', "\n                <button class=\"deleteNoteBtn edit-mode-action\" data-noteid=\"").concat(note.id, "\" style=\"display: ").concat(isEditMode ? 'inline-block' : 'none', ";\">Delete</button>\n            </div>\n        "); }).join('');
}
// Track the ID note number in the correct order.
var highestId = initialNotes.reduce(function (max, note) { return Math.max(max, parseInt(note.id)); }, 0);
var notecounter = highestId + 1;
// Function to add a new note.
function addNote(title, text, category2, location2, completionDate, completionTime) {
    var date = new Date().toLocaleDateString();
    var completionDateInput = document.getElementById('completionDate');
    var completionTimeInput = document.getElementById('completionTime');
    var categorySelect = document.getElementById('noteCategory');
    var imageURLInput = document.getElementById('imageURL');
    var locationInput = document.getElementById('locationInput');
    var location = '';
    if (categorySelect.value === 'Meetings' || categorySelect.value === 'SportsAndLeisure') {
        location = locationInput.value;
    }
    var completionDateTime = completionDateInput.value && completionTimeInput.value
        ? new Date(completionDateInput.value + 'T' + completionTimeInput.value).toLocaleString()
        : 'No deadline';
    var category = categorySelect ? categorySelect.value : 'General';
    var created = new Date().toLocaleString();
    var id = padNumber(notecounter, 3);
    var newNote = {
        id: id,
        title: title,
        text: text,
        imageURL: imageURLInput.value,
        created1: date,
        completeBy: completionDateTime,
        category: category,
        created: created,
        location: location,
        category2: category2,
        location2: location2,
        completionDate: completionDate,
        completionTime: completionTime
    };
    notes.push(newNote);
    notecounter++;
    renderNotes();
    imageURLInput.value = '';
}
// function to return the counting of the ID's (auxiliary function)
function padNumber(num, length) {
    var numAsString = num.toString();
    while (numAsString.length < length) {
        numAsString = '0' + numAsString;
    }
    return numAsString;
}
// Tracks whether the page is in edit mode.
var isEditMode = false;
// Function for mode toggling by on click. 
function toggleEditMode() {
    isEditMode = !isEditMode;
    // Update button text or appearance based on the mode.
    var editModeButton = document.getElementById('editModeButton');
    if (editModeButton) {
        editModeButton.textContent = isEditMode ? 'Exit Edit Mode' : 'Enter Edit Mode';
    }
    // Toggle display of edit mode actions (like delete buttons).
    document.querySelectorAll('.edit-mode-action').forEach(function (element) {
        var button = element;
        button.style.display = isEditMode ? 'inline-block' : 'none';
    });
}
function setupNoteActions() {
    var notesContainer = document.getElementById('notesContainer');
    notesContainer.addEventListener('click', function (event) {
        var target = event.target;
        // Check if we're in edit mode and if the clicked element is a delete button
        if (isEditMode && target.matches('.deleteNoteBtn')) {
            var noteId = target.getAttribute('data-noteid'); // Get the note ID
            deleteNote(noteId);
        }
    });
}
// Function to delete a note by its ID.
function deleteNote(id) {
    notes = notes.filter(function (note) { return note.id !== id; });
    renderNotes();
}
// Setup function to connect UI events JavaScript logic.
function setupUIEvents() {
    var addNoteButton = document.getElementById('addNoteButton');
    if (addNoteButton) {
        addNoteButton.addEventListener('click', function () {
            var titleInput = document.getElementById('noteTitle');
            var textInput = document.getElementById('noteText');
            var categorySelect = document.getElementById('noteCategory');
            var locationInput = document.getElementById('locationInput');
            var completionDateInput = document.getElementById('completionDate');
            var completionTimeInput = document.getElementById('completionTime');
            var imageURLInput = document.getElementById('imageURL'); // Assuming this exists
            var notesContainer = document.getElementById('notesContainer');
            notesContainer.addEventListener('click', function (event) {
                var target = event.target;
                if (isEditMode && target.classList.contains('deleteNoteBtn')) {
                    var noteId = target.getAttribute('data-noteid');
                    if (noteId)
                        deleteNote(noteId);
                }
            });
            var location = '';
            if (categorySelect && (categorySelect.value === 'Meetings' || categorySelect.value === 'SportsAndLeisure')) {
                location = locationInput.value;
            }
            // Correctly call addNote with all the collected information.
            if (titleInput && textInput && categorySelect && completionDateInput && completionTimeInput && imageURLInput) {
                addNote(titleInput.value, textInput.value, categorySelect.value, location, completionDateInput.value, completionTimeInput.value);
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
    var categorySelect = document.getElementById('noteCategory');
    var locationInputContainer = document.getElementById('locationInputContainer');
    categorySelect.addEventListener('change', function () {
        if (categorySelect.value === 'Meetings' || categorySelect.value === 'SportsAndLeisure') {
            locationInputContainer.style.display = 'block';
        }
        else {
            locationInputContainer.style.display = 'none';
        }
    });
}
// Ensures the DOM is fully loaded before setting up UI events.
document.addEventListener('DOMContentLoaded', function () {
    renderInitialNotes();
    setupUIEvents();
    setupNoteActions();
});
