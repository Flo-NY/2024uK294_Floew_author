export function dateToDateISOString(dateT: Date): string {
    const date = new Date(dateT);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // add leading zero if necessary
    const day = date.getDate().toString().padStart(2, "0"); // add leading zero if necessary
    console.log(`${year}-${month}-${day}`);
    return `${year}-${month}-${day}`;
}
export function parseDateStringToDate(dateString: string): Date {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day); // month - 1 because months are zero-based in Date object
}