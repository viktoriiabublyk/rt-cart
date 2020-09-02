import { Params, Data } from '@angular/router';

export interface ParamsRouterState {
  url: string;
  params: Params;
  queryParams: Params;
}


export interface DataParamsRouterState extends ParamsRouterState {
  data: Data;
}
