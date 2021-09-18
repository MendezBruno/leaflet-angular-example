export class CreateAddressDTO {
    name: string;
    location: TypeLocation;
}

export class TypeLocation {
    type: string;
    coordinates: number[];
}