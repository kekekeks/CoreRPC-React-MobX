import * as React from "react";
import createBrowserHistory from "history/createBrowserHistory";
import 'bootstrap/dist/css/bootstrap.css'
import { observer, Provider } from "mobx-react";
import { RootStore } from "src/stores/RootStore";
import { HistoryAdapter } from "mobx-state-router";
import {UserShell} from "src/components/UserShell";

let root: RootStore;
const ensureInitialized = () => {
    if (root) return;
    root = new RootStore();
    const historyAdapter = new HistoryAdapter(root.routerStore, createBrowserHistory());
    historyAdapter.observeRouterStateChanges();
};

export const App = observer(() => {
    ensureInitialized();
    const route = root.routerStore.routerState.routeName;
    return <>
        <Provider rootStore={root}>
            <UserShell/>
        </Provider>
    </>
});

