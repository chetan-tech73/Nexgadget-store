export function formatCurrency(amount) {
    if (!amount && amount !== 0)
    return "";
    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0,
    }).format(amount);
}