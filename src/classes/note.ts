// src/classes/note.ts
abstract class Note {
    constructor(
        public id: string,
        public date: Date,
        public title: string,
        public text: string,
        public photoAddress: string
    ) {}

    abstract notification(): void;
}
