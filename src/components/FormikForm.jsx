import { ErrorMessage, Field, Formik, Form } from "formik";
import React, { useState } from "react";

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

        if (!values.password) {
            errors.password = "Password cant be empty";
        } else if (values.password.length < 4) {
            errors.password = "password should be at least 8 characters";
        }
        return errors;
    };

    return (
        <div className="mt-8 bg-gray-300 border rounded-md p-3 w-[400px]">
            <Formik
                initialValues={{ email: "", password: "", rememberMe: false }}
                onSubmit={onSubmit}
                validate={handleValidation}
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
                        <label>Email</label>
                        <Field
                            name="email"
                            className="outline outline-gray-50 rounded-md"
                            type="email"
						/>
						<ErrorMessage name="email">
                        {error =>  <p>{error}</p>}
						</ErrorMessage>
                    </div>
                    <div className="flex flex-col gap-2 mt-4">
                        <label>Password</label>
                        <Field
                            name="password"
                            className="outline outline-gray-50 rounded-md "
                            type="password"
                        />
                        <ErrorMessage name="password">
                        {error =>  <p>{error}</p>}
						</ErrorMessage>
                    </div>
                    <div className="flex flex-row gap-3 items-center mt-5">
                        <Field
                            name="rememberMe"
                            type="checkbox"
                        />
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
