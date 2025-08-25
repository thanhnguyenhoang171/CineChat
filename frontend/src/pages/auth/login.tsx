import { useLocation } from "react-router";

const LoginPage = () => {
  const currentLocation = useLocation();

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-amber-100">
      <p>This is login page {currentLocation.pathname}</p>
    </div>
  );
};

export default LoginPage;
