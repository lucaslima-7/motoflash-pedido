
class NumberUtil {


    static round2Decimals(amount){
        return Number(Math.round(amount + 'e2') + 'e-2')
    }

    static getDoubleAsCurrency(value){
        return Intl.NumberFormat(['pt-BR'], {
            style: 'currency',
            currency: 'BRL'
          }).format(value)
    }

    static secondsToMinutes(value){
        return this.formatDouble(value/60,0) + " minutos"
    }

    static metersToKm(value){
        return this.formatDouble(value/1000,2) + " KM"
    }


    static formatDouble(value, fraction){
        return Intl.NumberFormat(['pt-BR'], {
            style: 'decimal',
            maximumFractionDigits: fraction
          }).format(value)
    }


    static getOnlyDigits(value){
        return value.replace(/[^\d]/g, '')
    }

    static getMobilePhoneDDD(value){
        return this.getOnlyDigits(value).substring(0,2)
    }

    static getMobilePhoneWithoutDDD(value){
        return this.getOnlyDigits(value).substring(2,value.length)
    }

}


export default NumberUtil