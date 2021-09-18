export interface DireccionDTO {
    cantidad: number
    direcciones: Direccione[]
    inicio: number
    parametros: Parametros
    total: number
  }
  
  export interface Direccione {
    altura: Altura
    calle: Calle
    calle_cruce_1: CalleCruce1
    calle_cruce_2: CalleCruce2
    departamento: Departamento
    localidad_censal: LocalidadCensal
    nomenclatura: string
    piso: any
    provincia: Provincia
    ubicacion: Ubicacion
  }
  
  export interface Altura {
    unidad: any
    valor: any
  }
  
  export interface Calle {
    categoria: string
    id: string
    nombre: string
  }
  
  export interface CalleCruce1 {
    categoria: any
    id: any
    nombre: any
  }
  
  export interface CalleCruce2 {
    categoria: any
    id: any
    nombre: any
  }
  
  export interface Departamento {
    id: string
    nombre: string
  }
  
  export interface LocalidadCensal {
    id: string
    nombre: string
  }
  
  export interface Provincia {
    id: string
    nombre: string
  }
  
  export interface Ubicacion {
    lat: number
    lon: number
  }
  
  export interface Parametros {
    direccion: Direccion
  }
  
  export interface Direccion {
    altura: Altura2
    calles: string[]
    piso: any
    tipo: string
  }
  
  export interface Altura2 {
    unidad: any
    valor: any
  }
  