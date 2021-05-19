import { environment } from "src/environments/environment";

export class BaseService{
    protected readonly pathUrl: string;

    constructor(private path: string){
        this.pathUrl = `${environment.apiUrl}api/${path}/`;
    }
}