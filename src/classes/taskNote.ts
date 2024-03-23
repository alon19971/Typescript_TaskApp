// src/classes/taskNote.ts

class TaskNote extends Note implements Tasks {
    lastExecutionDate: Date;
    
    constructor(id: string, date: Date, title: string, text: string, photoAddress: string, lastExecutionDate: Date) {
        super(id, date, title, text, photoAddress);
        this.lastExecutionDate = lastExecutionDate;
    }

    notification(): void {
        console.log(`Task notification for ${this.title}`);
    }
    
    alertCreationAndExecution(): void {
        console.log(`Created on: ${this.date}, Last Execution Date: ${this.lastExecutionDate}`);
    }
}

