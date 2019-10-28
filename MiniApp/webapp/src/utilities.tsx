import {inject, observer} from "mobx-react";
import {RootStore} from "src/stores/RootStore";

export function appPage (page: (rootStore: RootStore) => any) : (props: {rootStore?: RootStore}) => any
{
    return inject("rootStore")(observer((props: { rootStore?: RootStore }) => {
        return page(props.rootStore!);
    }));
    
}