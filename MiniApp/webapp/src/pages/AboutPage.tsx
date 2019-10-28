import * as React from "react";
import {observer} from "mobx-react";
import {appPage} from "src/utilities";
export const AboutPage = appPage(rootStore => 
    <div>
        <h1>About</h1>
        {rootStore.aboutStore.text}
    </div>);