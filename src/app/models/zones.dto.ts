export class CreateZoneDTO {
    name: string;
    location: TypeGeometry;

}


export class TypeGeometry {
    type: string;
    coordinates: number[];
}