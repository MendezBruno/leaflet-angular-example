interface City {
    name: string,
    code: string
}

export class MultiSelectDemo {

    cities: City[];

    selectedCityCodes: string[];

    constructor() {
        this.cities = [
            {name: 'New York', code: 'NY'},
            {name: 'Rome', code: 'RM'},
            {name: 'London', code: 'LDN'},
            {name: 'Istanbul', code: 'IST'},
            {name: 'Paris', code: 'PRS'}
        ];
    }

}

export interface Country  {
    name: string,
    code: string
}
