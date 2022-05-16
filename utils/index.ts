export function capitalize(str: string) {
    const lower = str.toLowerCase();
    return str.charAt(0).toUpperCase() + lower.slice(1);
}

export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}