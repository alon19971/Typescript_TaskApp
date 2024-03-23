// src/interfaces/meetings.ts

 interface Meetings {
    location: string;
    time: string; // Could be Date type depending on how you want to handle time
    alertMeetingDetails(): void;
  }
  