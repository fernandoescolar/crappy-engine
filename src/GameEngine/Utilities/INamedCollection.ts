export interface INamedCollection<T> {
    getLength(): number;
    get(key: string): T;
    add(key: string, element: T): void;
    remove(key: string): void;
    containsKey(key: string): boolean;
    clear(): void;
    forEach(callback: (key: string, value: T) => any): void;
}
