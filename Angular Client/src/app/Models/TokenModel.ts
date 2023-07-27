export class ValidateTokenModel {
    public Token:string = '';
    
    constructor(token:string) {
        this.Token = token;
    }
}

export class ValidateTokenResponseModel {
    public sid:string = '';
}