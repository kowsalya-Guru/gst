import { Decimal128 } from "mongoose";

export interface Invoice {
    name: string;
    amount: Decimal128;
    gst: Decimal128;
    total_amount: Decimal128;
}