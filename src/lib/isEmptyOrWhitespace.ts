
// function to check if the input is empty or contains only whitespace
export default function isEmptyOrWhitespace(input: string) {
    return input === '' || !input.trim();
}