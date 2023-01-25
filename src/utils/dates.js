export const formatDate = (raw_date) => {
    const date = new Date(raw_date)
    date.setDate(date.getDate() + 1);
    const day = date.getDate().toString()
    const month = date.toLocaleString('default', { month: 'short' }).toString().toUpperCase()
    const weekday = date.toLocaleDateString('default', { weekday: 'long' });
    const year = date.getFullYear()
    return [`${day} ${month}`, `${weekday}, ${year}`]
}
