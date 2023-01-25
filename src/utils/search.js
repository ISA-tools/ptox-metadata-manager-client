export const searchChemicals = (chemical, queryText) => {
    const identifier = chemical.ptx_code.toString().padStart(3, "0")
    const query = queryText.toLowerCase()
    return chemical.common_name.toLowerCase().includes(query) || identifier.includes(query)
}
