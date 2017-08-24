import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs";

import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import {Filter} from "../factory/filter";
@Injectable()
export class ConfigService {
    private error:any;

    constructor(private http:Http) {
    }

    get():Observable<any> {
        this.error = {};
        return this.http.get('/assets/initData.json').map(this.extractData).catch((error) => {
            return this.handleError(error);
        });
    }


    private extractData(res:Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error:Response | any) {
        const body = error.json() || '';
        this.error = body.details;
        return Observable.throw(body.details);
    }

    public getFilter():Filter {
        return <Filter> JSON.parse(localStorage.getItem("filter"));

    }

    public setFilter(filter:Filter) {
        localStorage.setItem("filter", JSON.stringify(filter));
    }
}
