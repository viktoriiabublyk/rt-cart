import { Flatpages } from './models/flatpage';

export class LoadFlatpages {
    static type = '[Flatpages] LoadFlatpages';
    constructor(public page: string) {}
}

export class LoadFlatpagesData {
    static type = '[Flatpages] LoadFlatpagesData';
    constructor(public page: string) {}
}

export class LoadFlatpagesSuccess {
    static type = '[Flatpages] LoadFlatpagesSuccess';
    constructor(public dataset: Flatpages, public page: string) {}
}

export class LoadFlatpagesFail {
    static type = '[Flatpages] LoadFlatpagesFailed';
    constructor(public error: any) {}
}
