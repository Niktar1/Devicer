import { HttpException } from "@nestjs/common";
export declare class ValidationExeption extends HttpException {
    messages: any;
    constructor(response: any);
}
