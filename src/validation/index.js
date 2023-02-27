import * as Yup from "yup";

export const registerFormSchema = Yup.object().shape({
    name: Yup.string().trim().required('Name is required'),
    email: Yup.string().trim().email("Email is invalid").required('Email is required'),
    mobile: Yup.string().trim().required('Phone is required'),
    password: Yup.string().trim().required('Password is required'),
    password_confirmation: Yup.string().trim().required('Confrim Password is required').oneOf([Yup.ref('password'), null], 'Passwords must match'),
    device_name: Yup.string().trim(),
});
