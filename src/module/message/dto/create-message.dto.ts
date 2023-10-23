import { Allow, IsNotEmpty } from "class-validator";

export class CreateMessageDto {
    @Allow()
    file:string

    @IsNotEmpty()
    message:string

    
}
