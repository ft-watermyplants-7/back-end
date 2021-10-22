const yup = require('yup');

const error = 'request does not meet requirements';

const plantSchema = yup.object().shape({
  user_id: yup.number().required(),
  nickname: yup
    .string()
    .min(3, error)
    .test(
      'Has spaces?',
      error,
      value => !value.includes(' ')
    ),
  species: yup
    .string()
    .min(3, error)
    .test(
      'Has spaces?',
      error,
      value => !value.includes(' ')
    ),
  h2oFrequency: yup.number().required(),
});

module.exports = plantSchema;
