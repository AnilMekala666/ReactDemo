export const formatAmount = (value,fixed=2) => {
    if (value >= 1e6) return (value / 1e6).toFixed(fixed) + "M";
    if (value >= 1e3) return (value / 1e3).toFixed(fixed) + "K";
    return value.toFixed(fixed);
}