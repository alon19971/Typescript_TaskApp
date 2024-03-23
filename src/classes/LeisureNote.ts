// src/classes/leisureNote.ts

 class LeisureNote extends Note implements SportsAndLeisure {
    location: string;
    trainingDate: Date;
    time: string;
    requiredEquipment: string[];

    constructor(id: string, date: Date, title: string, text: string, photoAddress: string, location: string, trainingDate: Date, time: string, requiredEquipment: string[]) {
        super(id, date, title, text, photoAddress);
        this.location = location;
        this.trainingDate = trainingDate;
        this.time = time;
        this.requiredEquipment = requiredEquipment;
    }

    notification(): void {
        console.log(`Reminder for '${this.title}' at ${this.location} on ${this.trainingDate.toISOString()} at ${this.time}`);
    }

    alertDetails(): void {
        console.log(`Sports/Leisure Event: '${this.title}' - Location: ${this.location}, Date: ${this.trainingDate.toDateString()}, Time: ${this.time}, Equipment Needed: ${this.requiredEquipment.join(", ")}`);
    }
}
