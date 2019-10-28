import * as React from 'react';
import { RouterLinkProps } from "mobx-state-router/dist/types/components/router-link";
import { RouterLink } from "mobx-state-router";
import "src/components/NavRouterLink.css";

export function RouterNavLink(props: RouterLinkProps) {
    const { className, activeClassName, ...pass } = props;
    return <RouterLink className="nav-link" activeClassName="nav-link active" {...pass}/>
}

export function RouterNavLinkItem(props: RouterLinkProps) {
    return <li className="nav-item"><RouterNavLink {...props}/></li>
}