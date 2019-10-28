import {observable} from "mobx";
import {RootStore} from "src/stores/RootStore";

export class HomeStore {
    @observable counter: number = 1;
    @observable root: RootStore;

    constructor(root: RootStore) {
        this.root = root;
        
        setInterval(() => this.counter++, 1000);
    }
    
    
}