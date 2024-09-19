export class Doctor{

    id?: number
    constructor(
        public name: string, 
        public cpf: string, 
        public email: string,         
        public crm: string,
    ){
    }    
}
