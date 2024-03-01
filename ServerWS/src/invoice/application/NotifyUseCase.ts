import AccessTokenInterface from "./services/AccessTokenInterface";
import SendNotificationInterface from "./services/SendNotificationInterface";

export default class SendNotificationUseCase{
    constructor(
        readonly accessTokenInterface: AccessTokenInterface,
        readonly sendNotificationInterface: SendNotificationInterface
    ){}

    async run(client_id:string, invoice_id: number){
        // if(this.accessTokenInterface.validate()){

        // }
    }
}