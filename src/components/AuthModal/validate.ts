import { InferType, object, string } from 'yup';

const userSchema = object().shape({
  email: string()
    .trim()
    .email('Введите корректный email')
    .required('Обязательное поле'),
  password: string()
    .required('Обязательное поле')
    .min(6, 'Не менее 6 символов'),
});

export type UserFormData = InferType<typeof userSchema>;
export default userSchema;