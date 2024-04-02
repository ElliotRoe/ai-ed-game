export const tokenize = (text: string) => {
    // split by apostrophes, commas, periods, exclamation marks, question marks, and spaces
    return text.split(/[\s,.'!?\n]+/);
}