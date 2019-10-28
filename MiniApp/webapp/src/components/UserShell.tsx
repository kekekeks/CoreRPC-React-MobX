import * as React from "react";
import {inject, observer} from "mobx-react";
import {RootStore} from "src/stores/RootStore";
import {RouterView} from "mobx-state-router";
import {appPage} from "src/utilities";
import {UserRouteNames, UserViewMap} from "src/routes";
import {RouterNavLinkItem} from "src/components/NavRouterLink";
import NavbarBrand from "reactstrap/lib/NavbarBrand";
import Nav from "reactstrap/lib/Nav";
import {Navbar} from "reactstrap";

export const UserShell = appPage((store: RootStore) => {
    return <div className="app">
        <Navbar color="light" light expand="md">
            <NavbarBrand href="/">MyApp</NavbarBrand>
            <Nav  navbar>
                <RouterNavLinkItem routeName={UserRouteNames.home}>Home</RouterNavLinkItem>
                <RouterNavLinkItem routeName={UserRouteNames.about}>About</RouterNavLinkItem>
            </Nav>
        </Navbar>
        <div className="main" style={{margin: '10px 5px 0 10px'}}>
            <RouterView routerStore={store.routerStore}
                        viewMap={UserViewMap}/>
        </div>
    </div>;
});
