import { ErrorMessage, Field, Formik, Form } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import EmailField from "./EmailField";

const FormikForm = (props) => {
    const onSubmit = (values, actions) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
                console.log({ values });
            }, 2000);
        });
    };

    const handleValidation = (values) => {
        const errors = {};

        if (!values.email) {
            errors.email = "Email can't be empty";
        }
        return errors;
    };



    const SignUpSchema = Yup.object().shape({
        email: Yup.string()
            .email("invalid email")
            .required("Email cant be empty"),
    });

    const PasswordSchema = Yup.object().shape({
        password: Yup.string()
            .required("Password cant be empty")
            .test("len", "Very weak", (val) => val.length > 5)
            .test("len", "Weak", (val) => val.length > 8),
    });

    const validatePassword = (value) => {
        let error = undefined;
        try {
            PasswordSchema.validateSync({password: value})
        } catch (validationError) {
            error = validationError.errors[0]
        }

        return error
       
    };

    return (
        <div className="mt-8 bg-gray-300 border rounded-md p-3 w-[400px]">
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                    rememberMe: false,
                    confirmPassword: "",
                }}
                onSubmit={onSubmit}
                validationSchema={SignUpSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                }) => (
                    <Form>
                        <div className="flex flex-col gap-2">
                           <EmailField name="email" type="email" label="Enter email"  />
                            <ErrorMessage name="email">
                                {(error) => <p className="text-md text-red-600">{error}</p>}
                            </ErrorMessage>
                        </div>
                        <div className="flex flex-col gap-2 mt-4">
                            <label>Password</label>
                            <Field
                                name="password"
                                validate={validatePassword}
                                className="outline outline-gray-50 rounded-md "
                                type="password"
                            />
                            <ErrorMessage name="password">
                                {(error) => <p className="text-md text-red-600"> {error}</p>}
                            </ErrorMessage>
                        </div>
                        <div className="flex flex-col gap-2 mt-4">
                            <label>Confirm Password</label>
                            <Field
                                name="confirmPassword"
                                className="outline outline-gray-50 rounded-md "
                                validate={validatePassword}
                                type="password"
                            />
                            <ErrorMessage name="confirmPassword">
                                {(error) => <p className="text-md text-red-600">{error}</p>}
                            </ErrorMessage>
                        </div>
                        <div className="flex flex-row gap-3 items-center mt-5">
                            <Field name="rememberMe" type="checkbox" />
                            <span className="text-md text-slate-900">
                                Remember me
                            </span>
                        </div>
                        <button
                            className="mt-5 bg-blue-600 py-2 px-2 rounded-md cursor-pointer"
                            disabled={isSubmitting}
                            type="submit"
                        >
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default FormikForm;
