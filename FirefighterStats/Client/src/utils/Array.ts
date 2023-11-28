export function isArray<T>(data: any, isItem: (item: any) => boolean): data is T[] {
    return Array.isArray(data) && data.every((item: any) => isItem(item));
}
