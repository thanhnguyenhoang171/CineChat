import { Resolver } from "react-hook-form";

export type RegisterFormValues = {
  fullname: string;
  username: string;
  password: string;
  confirmPassword: string;
  agree: boolean;
};

export const registerResolver: Resolver<RegisterFormValues> = async (
  values,
) => {
  const errors: Record<string, any> = {};
  if (!values.fullname || values.fullname.trim() === "") {
    errors.fullname = {
      type: "required",
      message: "Full name is required.",
    };
  }
  if (!values.username || values.username.trim() === "") {
    errors.username = {
      type: "required",
      message: "Username is required",
    };
  } else if (values.username.length < 4) {
    errors.username = {
      type: "minLength",
      message: "Username must be at least 4 characters.",
    };
  }
  if (!values.password) {
    errors.password = {
      type: "required",
      message: "Password is required",
    };
  } else if (values.password.length < 6) {
    errors.password = {
      type: "minLength",
      message: "Password must be at least 6 characters.",
    };
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = {
      type: "required",
      message: "Confirm password is required.",
    };
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = {
      type: "validate",
      message: "Passwords do not match.",
    };
  }
  if (values.agree === false) {
    errors.agree = {
      type: "required",
      message: "You must agree to terms",
    };
  }
  return {
    values: Object.keys(errors).length === 0 ? values : {},
    errors,
  };
};
