import { Allow, IsNotEmpty } from "class-validator";

export class CreateMessageDto {
    @Allow()
    file:string

    @Allow()
    title:string

    @IsNotEmpty()
    message:string 
}
