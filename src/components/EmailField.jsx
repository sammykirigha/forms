import { ErrorMessage, Field, useField } from 'formik';
import React from 'react';

const EmailField = ({ label, ...props }) => {
	const [field, meta] = useField(props)
  return (
	  <div className="flex flex-col gap-2">
		  <label htmlFor={props.id || props.name}>{label}</label>
		  <Field {...field} {...props}  className="outline outline-gray-50 rounded-md " />

		  {meta.touched && meta.error && (
			  <ErrorMessage>{ meta.error}</ErrorMessage>
		  )}
	</div>
  )
}

export default EmailField