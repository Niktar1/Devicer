import { ShippingInfoService } from './shipping-info.service';
import { AddShippingInfoDto } from './dto/add-shippingInfo.dto';
import { AuthService } from 'src/auth/auth.service';
export declare class ShippingInfoController {
    private shippingInfoService;
    private authService;
    constructor(shippingInfoService: ShippingInfoService, authService: AuthService);
    getShippingInfos(req: any): Promise<import("./shipping-info.model").ShippingInfo[]>;
    createShippingInfo(req: any, dto: AddShippingInfoDto): Promise<import("./shipping-info.model").ShippingInfo>;
    removeShippingInfo(req: any, shippingInfoId: number): Promise<number>;
    getInfoById(id: number): Promise<import("./shipping-info.model").ShippingInfo>;
}
