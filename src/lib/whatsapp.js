import { formatNaira } from "./format";

export function generateOrderId(prefix = "NGN") {
 const date = new Date();
 const yymmdd = date.toISOString().slice(0, 10).replace(/-/g, "");
 const random = Math.random().toString(36).substring(2, 7).toUpperCase();
 return `${prefix}-${yymmdd}-${random}`;
}

export function buildWhatsAppCartMessage(cart, total, brand, customer, orderId){
    const lines = [];
    lines.push(`${brand} - Order`);
    lines.push(`Order ID: ${orderId}`);
    lines.push("");

    cart.forEach((item) => {
        const qty = item.qty ?? item.quantity ?? 1;
        const lineTotal = (item.price || 0) * qty;
        lines.push(`${qty} x ${item.name} - ${formatNaira(lineTotal)}`);
    });

    lines.push(" ");
    lines.push(`Total: ${formatNaira(total)}`);
    lines.push(" ");
    lines.push("Customer details:");
    lines.push(`Name: ${customer.name}`);
    lines.push(`Phone: ${customer.Phone}`);
    lines.push(`Address: ${customer.address}`);
    if (customer.notes) lines.push(`Notes: ${customer.note}`);
    return lines.join("\n");
    
}
export function buildWAUrl(phone, message){
    const digits = (phone || " ").replace(/[^\d]/g, "");
    return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}