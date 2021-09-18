import { Provincia } from "./gobar-provincia-model";

export interface MunicipioDTO {
    cantidad: number
    inicio: number
    municipios: Municipio[]
    total: number
  }
  
  export interface Municipio {
    categoria: string
    centroide: Centroide
    fuente: string
    id: string
    nombre: string
    nombre_completo: string
    provincia: Provincia
  }
  
  export interface Centroide {
    lat: number
    lon: number
  }
  