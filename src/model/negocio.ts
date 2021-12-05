export interface AppState {}

export interface NegocioPageable {
  content: Negocios[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: Pageable;
  size: number;
  sort: Sort;
  totalElements: number;
  totalPages: number;
}

export interface Negocios {
  id: number;
  sucursal: string;
  importeTotal?: number;
}

export interface Negocio {
  id?: number;
  sucursal: string;
}

interface Pageable {
  page: number;
  size: number;
  sort: string;
}

interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
