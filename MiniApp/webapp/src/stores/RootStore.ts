import { computed, observable, runInAction } from "mobx";
import { RouterState, RouterStore } from "mobx-state-router";
import {HomeStore} from "src/stores/HomeStore";
import {AboutStore} from "src/stores/AboutStore";
import {UserRoutes} from "src/routes";
export class RootStore {
    @observable routerStore : RouterStore;
    @observable homeStore: HomeStore = new HomeStore(this);
    @observable aboutStore: AboutStore = new  AboutStore(this);
    
    constructor()
    {
        const routes = UserRoutes;
        this.routerStore = new RouterStore(this, routes, new RouterState("not-found"));
    }
}