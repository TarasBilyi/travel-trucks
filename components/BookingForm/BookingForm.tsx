"use client";

import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import css from "./BookingForm.module.css";
import { createBooking } from "@/lib/api/clientApi";

interface BookingFormProps {
  camperId: string;
}

interface BookingFormValues {
  name: string;
  email: string;
}

const initialValues: BookingFormValues = {
  name: "",
  email: "",
};

const BookingSchema = Yup.object().shape({
  name: Yup.string().trim().min(2, "Too short").required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

interface TextFieldProps {
  name: keyof BookingFormValues;
  type: string;
  placeholder: string;
}

/**
 * Wraps Formik's field state (useField) so the input border reacts to
 * touched+invalid, not just the error text below it.
 */
function TextField({ name, type, placeholder }: TextFieldProps) {
  const [field, meta] = useField(name);
  const showError = meta.touched && Boolean(meta.error);

  return (
    <div className={css.field}>
      <input
        {...field}
        type={type}
        placeholder={placeholder}
        className={`${css.input} ${showError ? css.inputError : ""}`}
        aria-invalid={showError}
      />
      {showError && <span className={css.error}>{meta.error}</span>}
    </div>
  );
}

const BookingForm = ({ camperId }: BookingFormProps) => {
  const mutation = useMutation({
    mutationFn: (values: BookingFormValues) =>
      createBooking({
        camperId,
        name: values.name.trim(),
        email: values.email.trim(),
      }),
    onSuccess: (data) => {
      toast.success(data.message || "Booking request sent!");
    },
    onError: (error) => {
      const backendMessage =
        isAxiosError(error) &&
        (error.response?.data as { response?: { message?: string } })
          ?.response?.message;
      toast.error(
        backendMessage || "Failed to send booking. Please try again.",
      );
    },
  });

  return (
    <div className={css.wrapper}>
      <div className={css.titleBlock}>
        <h3 className={css.title}>Book your campervan now</h3>
        <p className={css.subtitle}>
          Stay connected! We are always ready to help you.
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={BookingSchema}
        onSubmit={(values, { resetForm }) => {
          mutation.mutate(values, {
            onSuccess: () => resetForm(),
          });
        }}
      >
        <Form className={css.form} noValidate>
          <div className={css.inputs}>
            <TextField name="name" type="text" placeholder="Name*" />
            <TextField name="email" type="email" placeholder="Email*" />
          </div>

          <button
            className={css.submit}
            type="submit"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Sending..." : "Send"}
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default BookingForm;
