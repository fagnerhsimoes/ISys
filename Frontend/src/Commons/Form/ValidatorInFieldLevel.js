const Validator = require("validator");


    export const required = (value) =>
    value ? undefined : 'Este campo é obrigatório.'

    export const minLength3 = value =>
    value.length < 3 ? 'Este campo precisa ter pelo menos 3 caracteres.' : undefined

    export const minLength6 = value =>
    value.length < 6 ? 'Este campo precisa ter pelo menos 6 caracteres.' : undefined



    export const maxLength = max => value =>
    value && value.length > max ? `Este campo pode ter até ${max} caracteres.` : undefined

    export const maxLength30 = maxLength(30)
    export const maxLength100 = maxLength(100)
  

    export const isEmail = (value) =>
    !Validator.isEmail(value) ? 'E-mail inválido.' : undefined

    export const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'E-mail inválido.' : undefined

    export const passwordIsValid = (value) => {
        //^: primeira linha
        //(? =. * [az]): deve ter pelo menos uma letra minúscula
        //(? =. * [AZ]): deve ter pelo menos uma letra maiúscula
        //(? =. * \ d): deve ter pelo menos um número
        //(? =. * [# $ ^ + =! * () @% &]): Deve ter pelo menos um caractere especial
        //. {6,}: mínimo de 6 caracteres
        //$: linha final
        let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{6,}$/; 
        return !regex.test(value) ? 'A senha precisa conter ao menos uma letra minuscula, maiuscula e um caractere especial.' : undefined

    }

    
    export const mathAnother = (value, data) =>
    //value === data.password ? undefined : 'As senhas devem corresponder'
    Validator.equals(value, data.password) ? undefined : 'As senhas devem corresponder.'

    export const minValue = min => value =>
    value && value < min ? `Must be at least ${min}` : undefined
    
    export const minValue18 = minValue(18)


    export const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined
    

    export const dateInitial = value => value && value < new Date() ? 'Data e Hora de Início não pode ser anterior a Data e Hora atual.' : undefined

    export const tooOld = value => value && value > 65 ? 'You might be too old for this' : undefined
    
    export const aol = value =>
    value && /.+@aol\.com/.test(value) ?
    'Really? You still use AOL for your email?' : undefined