import {Author} from "./author";

export class Filter {
    directionUp:boolean;
    columnFilter:any;
    isActivColumn:string;
    constructor(obj:Filter = {} as Filter) {
        Object.assign(this, obj);
    }

}
