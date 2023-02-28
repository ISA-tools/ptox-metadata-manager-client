export default {
    methods: {
        doseTextColor(dose) {
            if (dose === 'LOW' || dose === 0 || dose === 'BMD10') return 'green--text'
            else if (dose === 'HIGH' || dose === 2 || dose === '10mg/L') return 'red--text'
            else if (dose === 'MEDIUM' || dose === 1 || dose === 'BMD25') return 'primary--text'
            return 'grey--text'
        },
        doseColor(dose) {
            console.log(dose)
            if (dose === 'LOW' || dose === 0 || dose === 'BMD10') return 'green'
            else if (dose === 'HIGH' || dose === 2 || dose === '10mg/L') return 'red'
            else if (dose === 'MEDIUM' || dose === 1 || dose === 'BMD25') return 'primary'
            return 'grey'
        }
    }
}
