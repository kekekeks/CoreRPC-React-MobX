import {appPage} from "src/utilities";
import {observer} from "mobx-react";
import Card from "reactstrap/lib/Card";
import * as React from "react";
import CardHeader from "reactstrap/lib/CardHeader";
import CardBody from "reactstrap/lib/CardBody";

const Ticker = observer((props: {count: number}) =>
    <Card>
        <CardHeader>Counter</CardHeader>
        <CardBody>{props.count}</CardBody>
    </Card>);

export const HomePage = appPage(rootStore => {
    const store = rootStore.homeStore;
    return <div>
        <h1>Home</h1>
        <Ticker count={store.counter}/>
    </div>
});