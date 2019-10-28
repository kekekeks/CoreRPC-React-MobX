import * as React from "react";
import {HomePage} from "src/pages/HomePage";
import {AboutPage} from "src/pages/AboutPage";
import {Route} from "mobx-state-router";

export enum UserRouteNames {
    notFound = "not-found",
    about = "about",
    home = "home"
}

export const UserViewMap = {
    [UserRouteNames.notFound]: <div>404 - Not Found</div>,
    [UserRouteNames.about]: <AboutPage />,
    [UserRouteNames.home]: <HomePage />,
};

export const UserRoutes: Route[] = [{
    pattern: '/not-found',
    name: UserRouteNames.notFound
}, {
    pattern: '/about',
    name: UserRouteNames.about,
}, {
    pattern: '/',
    name: UserRouteNames.home,
}];
