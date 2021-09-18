export interface LocalidadDTO {
    cantidad: number
    inicio: number
    localidades: Localidade[]
    total: number
  }
  
  export interface Localidade {
    categoria: string
    centroide: Centroide
    departamento: Departamento
    id: string
    municipio: Municipio
    nombre: string
    provincia: Provincia
  }
  
  export interface Centroide {
    lat: number
    lon: number
  }
  
  export interface Departamento {
    id: string
    nombre: string
  }
  
  export interface Municipio {
    id: string
    nombre: string
  }
  
  export interface Provincia {
    id: string
    nombre: string
  }
  