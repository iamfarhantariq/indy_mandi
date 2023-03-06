import * as Yup from "yup";

export const registerFormSchema = Yup.object().shape({
    name: Yup.string().trim().required('Name is required'),
    email: Yup.string().trim().email("Email is invalid").required('Email is required'),
    mobile: Yup.string().trim().required('Phone is required'),
    password: Yup.string().trim().required('Password is required'),
    password_confirmation: Yup.string().trim().required('Confrim Password is required').oneOf([Yup.ref('password'), null], 'Passwords must match'),
    device_name: Yup.string().trim(),
});

export const verifyEmailSchema = Yup.object().shape({
    email: Yup.string().trim().email("Email is invalid").required('Email is required'),
    pincode: Yup.string().trim().required('Code is required'),
});

export const loginFormSchema = Yup.object().shape({
    email: Yup.string().trim().email("Email is invalid").required('Email is required'),
    password: Yup.string().trim().required('Password is required'),
    device_name: Yup.string().trim(),
});

export const forgotFormSchema = Yup.object().shape({
    email: Yup.string().trim().email("Email is invalid").required('Email is required'),
});

export const resetPasswordWithCodeFormSchema = Yup.object().shape({
    email: Yup.string().trim().email("Email is invalid").required('Email is required'),
    token: Yup.string().trim().required('Pin code is required'),
    password: Yup.string().trim().required('Password is required'),
    password_confirmation: Yup.string().trim().required('Confrim Password is required').oneOf([Yup.ref('password'), null], 'Passwords must match'),
});