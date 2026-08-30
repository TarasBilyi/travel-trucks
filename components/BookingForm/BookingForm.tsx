"use client";

import { useState, type FormEvent } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import { IconAlert } from "@/components/Icons/Icons";
import { createBooking } from "@/lib/api/clientApi";
import css from "./BookingForm.module.css";

interface BookingFormProps {
  camperId: string;
}

const schema = Yup.object({
  name: Yup.string().trim().required("Please enter your name."),
  email: Yup.string()
    .trim()
    .required("Please enter your email.")
    .email("Please enter your email."),
});

const BookingForm = ({ camperId }: BookingFormProps) => {
  const [shakeKey, setShakeKey] = useState(0);
  const [activeField, setActiveField] = useState<"name" | "email" | null>(null);

  const mutation = useMutation({
    mutationFn: (values: { name: string; email: string }) =>
      createBooking({
        camperId,
        name: values.name.trim(),
        email: values.email.trim(),
      }),
    onSuccess: (data) => {
      toast.success(data.message || "Booking request sent!");
    },
    onError: (error) => {
      const message =
        isAxiosError(error) &&
        (error.response?.data as { response?: { message?: string } })?.response
          ?.message;
      toast.error(message || "Failed to send booking. Please try again.");
    },
  });

  const formik = useFormik({
    initialValues: { name: "", email: "" },
    validationSchema: schema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await mutation.mutateAsync(values);
        resetForm();
      } catch {}
    },
  });

  const nameInvalid = Boolean(formik.touched.name && formik.errors.name);
  const emailInvalid = Boolean(formik.touched.email && formik.errors.email);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = await formik.validateForm();

    if (Object.keys(errors).length > 0) {
      await formik.setTouched({ name: true, email: true });
      setShakeKey((k) => k + 1);
      return;
    }

    formik.handleSubmit();
  };

  return (
    <div className={css.wrapper}>
      <div className={css.titleBlock}>
        <h3 className={css.title}>Book your campervan now</h3>
        <p className={css.subtitle}>
          Stay connected! We are always ready to help you.
        </p>
      </div>

      <form className={css.form} onSubmit={handleSubmit} noValidate>
        <div className={css.field}>
          {nameInvalid && <span className={css.floatingLabel}>Name*</span>}
          <div className={css.inputWrap}>
            <input
              type="text"
              name="name"
              autoComplete="name"
              placeholder={activeField === "name" ? "Name" : "Name*"}
              value={formik.values.name}
              onChange={formik.handleChange}
              onFocus={() => setActiveField("name")}
              onBlur={() => {
                setActiveField((prev) => (prev === "name" ? null : prev));
                if (formik.values.name.trim()) {
                  formik.setFieldTouched("name", true);
                }
              }}
              className={`${css.input} ${nameInvalid ? css.inputError : ""}`}
              aria-invalid={nameInvalid}
            />
            {nameInvalid && <IconAlert className={css.errorIcon} size={20} />}
          </div>
          {nameInvalid && (
            <p key={`name-${shakeKey}`} className={css.errorText}>
              {formik.errors.name}
            </p>
          )}
        </div>

        <div className={css.field}>
          {emailInvalid && <span className={css.floatingLabel}>Email*</span>}
          <div className={css.inputWrap}>
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder={activeField === "email" ? "Email" : "Email*"}
              value={formik.values.email}
              onChange={formik.handleChange}
              onFocus={() => setActiveField("email")}
              onBlur={() => {
                setActiveField((prev) => (prev === "email" ? null : prev));
                if (formik.values.email.trim()) {
                  formik.setFieldTouched("email", true);
                }
              }}
              className={`${css.input} ${emailInvalid ? css.inputError : ""}`}
              aria-invalid={emailInvalid}
            />
            {emailInvalid && <IconAlert className={css.errorIcon} size={20} />}
          </div>
          {emailInvalid && (
            <p key={`email-${shakeKey}`} className={css.errorText}>
              {formik.errors.email}
            </p>
          )}
        </div>

        <button
          className={css.submit}
          type="submit"
          disabled={mutation.isPending || formik.isSubmitting}
        >
          {mutation.isPending || formik.isSubmitting ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
