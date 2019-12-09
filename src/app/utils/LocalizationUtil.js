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
                    return "Cancelado"
                case 'ASSIGNED':
                    return "Atribuído"
                case 'EXECUTION':
                    return "Em Andamento"
                case 'FINISHED':
                    return "Finalizado"
                case 'STARTED':
                    return "Iniciado"
                case 'CHECKED_OUT':
                    return "Realizado"
                case 'PAY':
                    return "Pago"
                case 'ACTIVE':
                    return "Ativo"
                case 'INACTIVE':
                    return "Inativo"
                default:
                    return key
            }

    }
}