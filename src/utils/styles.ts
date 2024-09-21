export const combineClasses = (
    ...classes: (string | undefined | null | false)[]
): string => {
    return classes.filter(Boolean).join(" ");
};
