import { ShippingInfo } from './shipping-info.model';
import { AddShippingInfoDto } from './dto/add-shippingInfo.dto';
export declare class ShippingInfoService {
    private shippingInfoRepo;
    constructor(shippingInfoRepo: typeof ShippingInfo);
    getInfosByUserId(userId: number): Promise<ShippingInfo[]>;
    getInfoById(id: number): Promise<ShippingInfo>;
    addShippingInfo(dto: AddShippingInfoDto, userId: number): Promise<ShippingInfo>;
    removeShippingInfo(userId: number, ShippingInfoId: number): Promise<number>;
}
