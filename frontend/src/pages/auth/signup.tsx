import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Link } from "react-router";

const SignupPage = () => {
  return (
    <div className="inline-flex h-screen w-full items-center justify-center bg-[#F5F5F5] dark:bg-[#051C36]">
      <div className="flex aspect-square h-[90dvh] w-[90dvh] overflow-hidden rounded-[20px] border border-gray-200 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]">
        {/* Bên trái = ảnh */}
        <div className="flex flex-1 items-center justify-center bg-black">
          <img
            className="h-full w-full object-cover"
            src="movie-cinema-poster-design-vector-template-banner-show-seats-popcorn-tickets-96262997.png"
            alt="poster"
          />
        </div>

        {/* Bên phải = nội dung */}
        <form className="flex flex-1 flex-col items-start justify-center gap-3 bg-white p-6 dark:bg-[#34617F]">
          <div className="w-full">
            <h1 className="font-['Anton'] text-2xl leading-[50px] font-normal text-[#34617F] dark:text-[#E6D3AB]">
              REGISTRATION FORM
            </h1>
            <div className="flex flex-col gap-2">
              <div>
                <div className="mb-1 block">
                  <Label
                    htmlFor="fullname"
                    className="font-['Roboto'] text-base font-normal text-black dark:text-black"
                  >
                    Full Name:
                  </Label>
                </div>
                <TextInput
                  id="fullname"
                  type="text"
                  placeholder="John Hamson"
                  required
                  shadow
                />
              </div>

              <div>
                <div className="mb-1 block">
                  <Label
                    htmlFor="username"
                    className="font-['Roboto'] text-base font-normal text-black dark:text-black"
                  >
                    Username:
                  </Label>
                </div>
                <TextInput
                  id="username"
                  type="text"
                  placeholder="johnhamson123"
                  required
                  shadow
                />
              </div>

              <div>
                <div className="mb-1 block">
                  <Label
                    htmlFor="password"
                    className="font-['Roboto'] text-base font-normal text-black dark:text-black"
                  >
                    Password:
                  </Label>
                </div>
                <TextInput id="password" type="password" required shadow />
              </div>

              <div>
                <div className="mb-1 block">
                  <Label
                    htmlFor="confirmPassword"
                    className="font-['Roboto'] text-base font-normal text-black dark:text-black"
                  >
                    Confirm Password:
                  </Label>
                </div>
                <TextInput
                  id="confirmPassword"
                  type="password"
                  required
                  shadow
                />
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <Checkbox id="agree" />
                  <div className="flex flex-col gap-0">
                    <p className="font-['Roboto'] text-base font-normal text-black">
                      By signing up , you agree to the
                    </p>
                    <Label htmlFor="agree">
                      <Link
                        to="#"
                        className="font-['Roboto'] text-base font-normal text-[#34617F] hover:underline dark:text-[#5F8FA5]"
                      >
                        terms and conditions
                      </Link>
                    </Label>
                  </div>
                </div>
              </div>

              <Button
                className="font-anton bg-[#34617F] text-base font-normal hover:bg-[#5F8FA5] hover:text-[#E6D3AB]"
                type="submit"
              >
                Register new account
              </Button>
              <div className="flex flex-row justify-center gap-2">
                <p className="font-['Roboto'] text-base font-normal">
                  Have an account?
                </p>
                <Link
                  to="/login"
                  className="font-['Roboto'] text-base font-normal text-[#34617F] dark:text-[#5F8FA5]"
                >
                  Login now
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignupPage;
