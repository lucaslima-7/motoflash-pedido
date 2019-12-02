export function localize(key, lang) {
    if (typeof key != 'string') {
        return ''
    }
    switch (lang) {
        default:
            switch (key.toUpperCase()) {
                case 'PENDING':
                    return "Pendente"
                case 'CANCELLED':
                    return "Cancelada"
                case 'ASSIGNED':
                    return "Atribuída"
                case 'ACTIVE':
                    return "Ativo"
                case 'INACTIVE':
                    return "Inativo"
                default:
                    return key
            }

    }
}