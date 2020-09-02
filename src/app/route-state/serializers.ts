import { RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngxs/router-plugin';
import { ParamsRouterState, DataParamsRouterState } from './models';
import { Injectable } from "@angular/core";

// Map the router snapshot to { url, params, queryParams }
export class ParamsRouterStateSerializer implements RouterStateSerializer<ParamsRouterState> {
  serialize(routerState: RouterStateSnapshot): ParamsRouterState {
    const {
      url,
      root: { queryParams }
    } = routerState;

    let { root: route } = routerState;
    while (route.firstChild) {
      route = route.firstChild;
    }

    const { params } = route;

    return { url, params, queryParams };
  }
}


@Injectable()
export class DataParamsRouterStateSerializer implements RouterStateSerializer<DataParamsRouterState> {
  serialize(routerState: RouterStateSnapshot): DataParamsRouterState {
    const {
      url,
      root: { queryParams }
    } = routerState;

    let { root: route } = routerState;
    while (route.firstChild) {
      route = route.firstChild;
    }

    const { params, data } = route;

    return { url, params, data, queryParams };
  }
}
