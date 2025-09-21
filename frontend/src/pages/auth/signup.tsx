import {
  Button,
  Checkbox,
  DarkThemeToggle,
  Label,
  TextInput,
} from "flowbite-react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import {
  RegisterFormValues,
  registerResolver,
} from "@/validations/signup.validation";

import { useToast } from "@/components/share/toast.provider";

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: registerResolver,
  });
  const { addToast } = useToast();

  const onSubmit = handleSubmit((data) => {
    console.log("Input data = ", JSON.stringify(data));

    if (data.fullname === "thanh") {
      addToast({ type: "success", message: "Signup successfully" });
    } else {
      addToast({ type: "error", message: "Signup failsfsdfáadfsàádfàsdfsadfdà" });
    }
  });
  return (
    <div className="layout-register">
      <div className="flex flex-1 items-center justify-center">
      
        <div className="flex w-full max-w-5xl overflow-hidden rounded-[20px] border border-gray-200 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]">
          <div className="hidden flex-1 items-center justify-center md:flex">
            <img
              className="h-full w-full object-cover"
              src="movie-cinema-poster-design-vector-template-banner-show-seats-popcorn-tickets-96262997.png"
              alt="poster"
            />
          </div>

          <form
            onSubmit={onSubmit}
            className="dark:bg-primary-500 relative flex flex-1 flex-col items-start justify-center gap-3 bg-white p-6"
          >
            <div className="border-text-light-subs dark:border-text-dark-main bg-secondary-500 absolute top-4 right-4 self-end rounded-xl hover:border-0">
              <DarkThemeToggle />
            </div>
            <div className="w-full">
              <h1
                className="title-form"
                style={{ WebkitTextStroke: "1px #F5F5F5" }}
              >
                REGISTRATION FORM
              </h1>
              <div className="flex flex-col gap-2">
                <div>
                  <div className="mb-1 block">
                    <Label htmlFor="fullname" className="label-form">
                      Full Name:
                    </Label>
                  </div>
                  <TextInput
                    {...register("fullname")}
                    id="fullname"
                    type="text"
                    placeholder="John Hamson"
                    // required
                    shadow
                  />
                  {errors?.fullname && (
                    <p className="error-text">{errors.fullname.message}</p>
                  )}
                </div>

                <div>
                  <div className="mb-1 block">
                    <Label htmlFor="username" className="label-form">
                      Username:
                    </Label>
                  </div>
                  <TextInput
                    {...register("username")}
                    id="username"
                    type="text"
                    placeholder="johnhamson123"
                    // required
                    shadow
                  />
                  {errors?.username && (
                    <p className="error-text">{errors.username.message}</p>
                  )}
                </div>

                <div>
                  <div className="mb-1 block">
                    <Label htmlFor="password" className="label-form">
                      Password:
                    </Label>
                  </div>
                  <TextInput
                    {...register("password")}
                    id="password"
                    type="password"
                    // required
                    shadow
                  />
                  {errors?.password && (
                    <p className="error-text">{errors.password.message}</p>
                  )}
                </div>

                <div>
                  <div className="mb-1 block">
                    <Label htmlFor="confirmPassword" className="label-form">
                      Confirm Password:
                    </Label>
                  </div>
                  <TextInput
                    {...register("confirmPassword")}
                    id="confirmPassword"
                    type="password"
                    // required
                    shadow
                  />
                  {errors?.confirmPassword && (
                    <p className="error-text">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox id="agree" {...register("agree")} />
                  <Label htmlFor="agree" className="label-form flex">
                    I agree with the&nbsp;
                    <Link
                      to="#"
                      className="text-text-light-sub1 dark:text-text-dark-sub hover:underline"
                    >
                      terms and conditions
                    </Link>
                  </Label>
                </div>
                {errors?.agree && (
                  <p className="error-text">{errors.agree.message}</p>
                )}
                <div className="flex justify-center">
                  <Button className="btn-register" type="submit">
                    Register new account
                  </Button>
                </div>
                <div className="flex flex-row justify-center gap-2 p-5">
                  <p className="label-form">Have an account?</p>
                  <Link to="/login" className="link-form">
                    Login now
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SignupPage;
