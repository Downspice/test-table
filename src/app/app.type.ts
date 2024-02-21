
export type NullUndefinedType<T> = T | null | undefined;
export type ElementSizeType = 's' | 'm' | 'l' | 'xl' | 'xs';

export type CrudActionType = 'edit' | 'add' | 'delete' | 'read';
export type SortDirectionType = 'ASC' | 'DESC' 
export type OverlayType = 'none' | 'alert' | 'pdf';
export type OverlayDataType = 'error' | 'success' | 'info';
export type HttpResponseType =
  | 'idle'
  | 'pending'
  | 'success'
  | 'error'
  | 'init';


export interface KeycloakConfigModel {
  issuer: string;
  url: string;
  realm: string;
  authTokenEndpoint?: string;
  clientId: string;
  client_secret?: string;
  scope: string;
  dummyClientSecret?: string;
  responseType?: string;
  showDebugInformation?: boolean;
}
export interface AppEnvModel {
  production: boolean;
  baseUrl: string;
  keyCloakConfig: KeycloakConfigModel;
}

export interface CrudActionModel<T> {
  action: CrudActionType;
  data: T;
}

export interface DialogDataOptionModel<T> {
  heading?: string;
  subDetail?: string;
  submitButtonName?: string;
  subheading?: string;
  bodyText?: string;
  subText?: string;
  data: T;
}

export interface ApiResponseModel<T> {
  statusCode: number;
  message: string;
  data: T;
  date: Date;
}

export interface OverlayDataModel {
  type: OverlayDataType;
  message?: string;
  title?: string;
  data?: unknown;
}

export interface PaginationQueryParamModel {
  page: number;
  size: number;
  paginate?: boolean;
  sortBy?: string;
  sortDir?: 'desc' | 'asc';
}
export interface PaginationMetaDataModel {
  pageable: PageableModel;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: PageableModel;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
  page: number;
}

export type PaginationDataModel<T> = PaginationMetaDataModel & { content: T[] };

export interface PageableModel {
  sort: PaginationSortModel;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

export interface PaginationSortModel {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface PaginationSortModel {
  page: boolean;
  size: boolean;
}

export interface IdentityClaimsModel {
  exp: number;
  iat: number;
  auth_time: number;
  jti: string;
  iss: string;
  aud: string;
  sub: string;
  typ: string;
  azp: string;
  nonce: string;
  session_state: string;
  at_hash: string;
  acr: string;
  s_hash: string;
  sid: string;
  projects: string[];
  email_verified: boolean;
  name: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;
}

export type UpdatedCreatedModel = {
  updatedBy: string;
  updatedAt: Date | string;
  createdBy: string;
  createdAt: Date | string;
};

export type NavItemModel = {
  title: string;
  link: string;
  iconUrl: string;
  alt: string;
  collapsible?: boolean;
  items?: NavItemModel[];
};
