export class DTO
{
    //** @var int */
    private httpCode:number = -1;
    //** @var string */
    private httpMessage:string = "";
    //** @var int */
    private numberOfResults:number = -1;
    //** @var object[] */
    private data:any;

    constructor(httpCode:number, httpMessage:string, numberOfResults:number, data:any)
    {
        this.httpCode = httpCode;
        this.httpMessage = httpMessage;
        this.numberOfResults = numberOfResults;
        this.data = data;
    }

    get HttpCode():number{
        return this.httpCode;
    }
    set HttpCode(httpCode:number){
        this.httpCode = httpCode;
    }

    get HttpMessage():string{
        return this.httpMessage;
    }
    set HttpMessage(httpMessage:string){
        this.httpMessage = httpMessage;
    }

    get NumberOfResults():number{
        return this.numberOfResults;
    }
    set NumberOfResults(numberOfResults:number){
        this.numberOfResults = numberOfResults;
    }

    get Data():any{
        return this.data;
    }
    set Data(data:any){
        this.data = data;
    }
}