import * as yup from 'yup'
export const schema = yup.object({
  name: yup
    .string()
    .required('Informe um nome')
    .min(4, 'Minimo de 4 digitos')
    .matches(/^[aA-zZ\s]+$/, 'Somente letras é aceito'),
  password: yup
    .string()
    .required('Informe uma senha')
    .min(6, 'Senha minimo de 6 digitos'),
  email: yup
    .string()
    .required('Informe um e-mail')
    .email('Digite um email valido'),
  cpf: yup
    .string()
    .required('Informe um cpf')
    .min(11, 'Informe um cpf valido')
    .max(11, 'Informe um cpf valido')
    .matches(/^[0-9]+$/, 'Somente numeros'),
  apto: yup.string().required('Obrigatorio')
})
