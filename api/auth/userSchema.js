const yup = require('yup');

const invalid = 'invalid entries';

const userSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, invalid)
    .max(100, invalid)
    .test(
      'Has spaces?',
      invalid,
      value => !value.includes(' ')
    ),
  password: yup
    .string()
    .min(8, 'password length too short')
    .max(100, invalid)
    .test(
      'Has spaces?',
      invalid,
      value => !value.includes(' ')
    )
})

module.exports = userSchema;