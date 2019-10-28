import {observable} from "mobx";
import {RootStore} from "src/stores/RootStore";

export class AboutStore {
    @observable text: string;
    @observable root: RootStore;

    constructor(root: RootStore) {
        this.root = root;
        this.text = "Hello world!";
    }
}