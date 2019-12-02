import NumberUtil from "./NumberUtil";

export function transformAddressGoogle(place) {
    console.log(place)
    let address1 = "";
    let number = "";
    let address2 = "";
    let city = "";
    let state = "";
    let zipCode = "";
    let neighborhood = "";

    for (var i = 0; i < place.address_components.length; i++) {
        for (var j = 0; j < place.address_components[i].types.length; j++) {
            if (place.address_components[i].types[j] === "street_number") {
                number = place.address_components[i].long_name;
                // addressNumber = place.address_components[i].long_name;
            } else if (place.address_components[i].types[j] === "route") {
                address1 = place.address_components[i].short_name;
            }

            if (place.address_components[i].types[j] === "sublocality_level_1") {
                neighborhood = place.address_components[i].long_name;
            }

            if (
                place.address_components[i].types[j] === "administrative_area_level_2"
            ) {
                city = place.address_components[i].long_name;
            }

            if (
                place.address_components[i].types[j] === "administrative_area_level_1"
            ) {
                state = place.address_components[i].short_name;
            }

            if (place.address_components[i].types[j] === "postal_code") {
                zipCode = place.address_components[i].long_name;
            }
        }
    }
    let location = {
        geopoint: {
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng()
        }
    }
    let placeId = place.place_id;

    return {
        address1,
        number,
        address2,
        city,
        state,
        zipCode,
        neighborhood,
        location,
        placeId
    };
}

export function isValidEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email && re.test(String(email).toLowerCase());
}

export function isValidMobilePhone(mobilePhone) {

    if (!mobilePhone) {
        return false
    }
    var re = /\d{2}(9)\d{8}$/
    mobilePhone = NumberUtil.getOnlyDigits(mobilePhone)
    return mobilePhone.length === 11 && re.test(String(mobilePhone))
}

export function isValidPhone(phone) {
    if (!phone) {
        return false
    }
    var phoneRe = /\d{2}\d{8}$/
    phone = NumberUtil.getOnlyDigits(phone)
    return phone.length === 10 && phoneRe.test(String(phone))
}

export function isValidZipCode(zipCode) {
    return zipCode && NumberUtil.getOnlyDigits(zipCode).length === 8
}

export function isNotBlank(text) {
    return text && text.length > 0
}

export function isFullName(string) {
    return string && string.length > 0 && string.split(' ').length >= 2 && string.split(' ')[0].length > 1 && string.split(' ')[1].length > 1
}

export function isValidPassword(password) {
    return password.length >= 8
}

export function isValidDate(date) {
    var dateRe = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;

    if (date && dateRe.test(String(date))) {
        date = date.replace(/\//g, "-"); // substitui eventuais barras (ex. IE) "/" por hífen "-"
        var dateArray = date.split("-"); // quebra a data em array

        // para o IE onde será inserido no formato dd/MM/yyyy
        if (dateArray[0].length !== 4) {
            date = dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0];
            // remonto a data no formato yyyy/MM/dd
        } else {
            return false
        }

        var year = Number(dateArray[2])
        var month = Number(dateArray[1])
        var day = Number(dateArray[0])

        // Aqui é onde verifica se é uma Data Válida
        var today = new Date();
        var objDate = new Date(date);
        var objDateUTC = new Date(objDate.getTime() + objDate.getTimezoneOffset() * 60000);
        var todayUTC = new Date(today.getTime() + today.getTimezoneOffset() * 60000);
        var idadeEmpresa = todayUTC.getFullYear() - objDateUTC.getFullYear()

        if (Object.prototype.toString.call(objDate) === "[object Date]") {
            if (isNaN(objDate.getTime())
                || objDateUTC > todayUTC
                || idadeEmpresa > 519) {
                return false
            } else {
                if (objDateUTC.getUTCFullYear() === year && (objDateUTC.getUTCMonth() + 1) === month && objDateUTC.getUTCDate() === day) {
                    return true
                }
            }
        } else {
            return false
        }
    } else {
        return false
    }
}

export function isValidBirthDate(birthDate) {
    var re = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;


    if (birthDate && re.test(String(birthDate))) {

        birthDate = birthDate.replace(/\//g, "-"); // substitui eventuais barras (ex. IE) "/" por hífen "-"
        var birthDateArray = birthDate.split("-"); // quebra a data em array


        // para o IE onde será inserido no formato dd/MM/yyyy
        if (birthDateArray[0].length !== 4) {
            birthDate = birthDateArray[2] + "-" + birthDateArray[1] + "-" + birthDateArray[0]; // remonto a data no formato yyyy/MM/dd
        } else {
            return false
        }

        var year = Number(birthDateArray[2])
        var month = Number(birthDateArray[1])
        var day = Number(birthDateArray[0])

        // comparo as datas e calculo a idade
        var hoje = new Date();
        var nasc = new Date(birthDate);
        var nascUTC = new Date(nasc.getTime() + + nasc.getTimezoneOffset() * 60000);

        if (Object.prototype.toString.call(nasc) === "[object Date]") {
            // it is a date
            if (isNaN(nasc.getTime())) {  // d.valueOf() could also work
                return false
            } else {


                if (nascUTC.getUTCFullYear() === year && (nascUTC.getUTCMonth() + 1) === month && nascUTC.getUTCDate() === day) {
                    var idade = hoje.getFullYear() - nascUTC.getFullYear();
                    var m = hoje.getMonth() - nascUTC.getMonth();
                    if (m < 0 || (m === 0 && hoje.getDate() < nascUTC.getDate())) idade--;

                    if (idade < 18 || idade > 110) {
                        return false;
                    }

                    return true;
                }

            }
        } else {
            return false
        }
    } else {
        return false
    }
}

export function isValidCNPJ(cnpj) {
    if (!cnpj) {
        return false
    }
    cnpj = cnpj.replace(/[^\d]+/g, '');
    if (cnpj === '') return false;

    if (cnpj.length !== 14)
        return false;

    // Elimina CNPJs invalidos conhecidos
    if (cnpj === "00000000000000" ||
        cnpj === "11111111111111" ||
        cnpj === "22222222222222" ||
        cnpj === "33333333333333" ||
        cnpj === "44444444444444" ||
        cnpj === "55555555555555" ||
        cnpj === "66666666666666" ||
        cnpj === "77777777777777" ||
        cnpj === "88888888888888" ||
        cnpj === "99999999999999")
        return false;
    // Valida DVs
    var tamanho = cnpj.length - 2
    var numeros = cnpj.substring(0, tamanho);
    var digitos = cnpj.substring(tamanho);
    var soma = 0;
    var pos = tamanho - 7;
    for (var i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    // eslint-disable-next-line
    if (resultado != digitos.charAt(0))
        return false;



    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    // eslint-disable-next-line
    if (resultado != digitos.charAt(1))
        return false;

    return true;

}

export function isValidCPF(cpf) {
    if (!cpf) {
        return false
    }
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf === '') return false;
    // Elimina CPFs invalidos conhecidos	
    if (cpf.length !== 11 ||
        cpf === "00000000000" ||
        cpf === "11111111111" ||
        cpf === "22222222222" ||
        cpf === "33333333333" ||
        cpf === "44444444444" ||
        cpf === "55555555555" ||
        cpf === "66666666666" ||
        cpf === "77777777777" ||
        cpf === "88888888888" ||
        cpf === "99999999999")
        return false;
    // Valida 1o digito	
    var add = 0;
    for (var i = 0; i < 9; i++)
        add += parseInt(cpf.charAt(i)) * (10 - i);
    var rev = 11 - (add % 11);
    if (rev === 10 || rev === 11)
        rev = 0;
    if (rev !== parseInt(cpf.charAt(9)))
        return false;
    // Valida 2o digito	
    add = 0;
    for (i = 0; i < 10; i++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11)
        rev = 0;
    // eslint-disable-next-line
    if (rev != parseInt(cpf.charAt(10)))
        return false;
    return true;
}