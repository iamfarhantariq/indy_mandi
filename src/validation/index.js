import * as Yup from "yup";

export const registerFormSchema = Yup.object().shape({
    name: Yup.string().trim().required('Name is required'),
    email: Yup.string().trim().email("Email is invalid").required('Email is required'),
    mobile: Yup.string().trim().required('Phone is required'),
    password: Yup.string().trim().required('Password is required'),
    password_confirmation: Yup.string().trim().required('Confrim Password is required'),
    device_name: Yup.string().trim(),
    // maatregelen: Yup.string().required('maatregelen is benodigd'),            //measures
    // geslacht: Yup.string().nullable(),              //sex
    // voorletters: Yup.string().nullable(),                                          //initials
    // voornaam: Yup.string().nullable(),                                             //First Name
    // voorvoegsel: Yup.string().required("Voorvoegsel is benodigd"),                                          //prefix
    // achternaam: Yup.string().required("Achternaam is benodigd"),         //last name
    // postcode: Yup.string().required("Postal code is benodigd"),         //Postal Code
    // huisnummer: Yup.string().required("Huisnummer is benodigd"),      //House number
    // toevoeging: Yup.string().nullable(),                                           //addition
    // straat: Yup.string().required("Straat is benodigd"),
    // plaats: Yup.string().required("Plaats is benodigd"),
    // // straatnaam: Yup.string().required("Street name is benodigd"),       //Street name
    // // woonplaats: Yup.string().required("Residence is benodigd"),         //residence
    // emailadres: Yup.string().email("E-mailadres moet geldig zijn").required('E-mailadres is benodigd'),                                           //e-mail address
    // telefoonnummer: Yup.string().required('Telefoonnummer is benodigd'),                                       //phone number
    // mobiel: Yup.string().nullable(),                                               //mobile
    // object: Yup.string().nullable(),                                               //object
    // opmerking: Yup.string().nullable(),                                            //remark
    // kanaal: Yup.string().nullable(),               //channel   => code is provided by Pluimers
    // vrije_velden: Yup.object().nullable(),
    // herkomst       : Yup.string().nullable(),
    // id             : Yup.string().nullable().max(20), //type String (optioneel)(max. 20 tekens),
    // bouwjaar       : Yup.number().nullable(),
    // woningtype     :Yup.string().nullable().max(100)// type String (optioneel)(max. 100 tekens),
});
