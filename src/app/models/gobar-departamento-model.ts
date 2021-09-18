export interface DepartamentoDTO {
    cantidad: number
    departamentos: Departamento[]
    inicio: number
    total: number
  }
  
  export interface Departamento {
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
  
  export interface Provincia {
    id: string
    interseccion: number
    nombre: string
  }
  