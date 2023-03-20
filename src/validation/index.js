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

export const createIndyViewFormSchema = Yup.object().shape({
    gstin: Yup.string().trim(),
    coupon: Yup.string().trim(),
    address: Yup.string().trim().required('Address is required'),
    state: Yup.string().trim().required('State is required'),
    store_name: Yup.string().trim().required('Store name is required'),
    redirect_url: Yup.string().trim().matches(
            /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            'Enter correct url.co.'
        ).required('Redirect URL is required'),
});

export const storeAddressSchema = Yup.object().shape({
    type: Yup.string().trim().required('Type is required'),
    address: Yup.string().trim().required('Address is required'),
});

export const storeWishListSchema = Yup.object().shape({
    name: Yup.string().trim().required('Name is required'),
});

export const storeRaiseDispute = Yup.object().shape({
    phone: Yup.string().trim().required('Phone is required'),
    description: Yup.string().trim().required('Description is required'),
});