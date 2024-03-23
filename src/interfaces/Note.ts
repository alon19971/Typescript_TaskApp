interface Note {
    id: string;
    created: Date | string; // Can be a Date object or a string, depending on how you store dates
    title: string;
    description: string;
    completeBy: Date | string; // Same as `created`
}
