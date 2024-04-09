import { z } from "zod";

const EMPTY_FIELD_MESSAGE = "Field cannot be empty";

const OrderSchema = z.object({
    name: z.string().min(1, EMPTY_FIELD_MESSAGE),
    price : z.number().min(1, EMPTY_FIELD_MESSAGE),
    invoiceDate: z.string().min(1, EMPTY_FIELD_MESSAGE),
    status: z.string().min(1, EMPTY_FIELD_MESSAGE),
});

const OrderArraySchema = z.array(OrderSchema);

export default OrderArraySchema ;