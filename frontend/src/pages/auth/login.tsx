import { useState } from "react";
import { Button } from "flowbite-react";
import { useLocation } from "react-router";
import { RegisterFailToast, RegisterSuccessToast } from "@/components/share/toast.response";

const LoginPage = () => {
  const currentLocation = useLocation();
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // ẩn sau 3s
  };

  return (
    <>
      <div className="bg-bg-light flex h-screen w-full flex-col items-center justify-center">
        <p className="mb-4">This is login page {currentLocation.pathname}</p>

        <Button className="bg-primary-500" onClick={handleSubmit}>
          Click Now
        </Button>

        <RegisterFailToast show={showToast} />
      </div>
    </>
  );
};

export default LoginPage;
