const ROLES = {
    ADMIN: "admin",
    CUSTOMER: "customer"
}
const ORDER_STATUS = ["pending", "confirmed", "shipped", "delivered", "cancelled"];
const ADDRESS_LABELS = ["home", "work", "other"];
const PAYMENT_STATUS = ["unpaid", "paid", "refunded", "failed"];

export {ROLES, ORDER_STATUS, ADDRESS_LABELS, PAYMENT_STATUS};