export interface Venta {
  id: number;
  cliente: Cliente;
  fecha: Date;
  items: Item[];
  negocio: Negocio;
  razonSocial: string;
  formatoFecha: string;
  importeFinalStr: string;
  cantidadCuotas?: number;
  coeficienteTarjeta?: number;
  isExpanded?: boolean;
}

export interface VentaBody {
  clienteId: string;
  sucursalId: string;
  cantidadCuotas?: string;
}

export interface ItemBody {
  itemId?: number;
  ventaId?: number;
  cantidad: number;
  prendaId: number;
}

interface Cliente {
  id: number;
  nombre: string;
  apellido: string;
  razonSocial?: string;
}

export interface Item {
  id: number;
  cantidad: number;
  prenda: Prenda;
  importe?: number;
}

interface Prenda {
  id: number;
  descripcion: string;
  tipo: string;
  precioBase: number;
  precioFinal?: number;
}

interface Negocio {
  id: number;
  sucursal: string;
  importeTotal?: number;
}

export interface VentaPageable {
  content: Content[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface Content {
  id: number;
  cliente: Cliente;
  fecha: string;
  items: Item[];
  importeFinal: number;
  negocio: Negocio;
  cantidadCuotas?: number;
  coeficienteTarjeta?: number;
}

export interface Pageable {
  sort: Sort;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}
