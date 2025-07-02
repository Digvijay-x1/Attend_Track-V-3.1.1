import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Mail, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Driff from "../components/Driff";
import GoogleLoginButton from "../components/GoogleLoginButton";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { register, isRegistering } = useAuthStore();

  const validateForm = () => {
    if (!formData.name.trim()) return toast.error("Name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      return toast.error("Invalid email");
    if (!formData.password.trim()) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters long");
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (!success) return;
    register(formData);
  };
  return (
    <div className="flex min-h-screen bg-base-200">
      {/* left side */}
      <div className="flex flex-1 flex-col justify-center items-center p-8">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2 text-primary">
              Create Account
            </h2>
            <p className="text-base-content/70 mb-8">
              Get started with your free account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <fieldset className="bg-base-100 rounded-xl p-6 shadow-lg border border-base-300">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-base-content mb-1">
                    Full Name
                  </label>
                  <input
                    type="name"
                    className="input input-bordered w-full"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-base-content mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      className="input input-bordered w-full"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-base-content mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="input input-bordered w-full pr-10"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/50 hover:text-base-content"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <Eye className="w-5 h-5" />
                      ) : (
                        <EyeOff className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <button
                disabled={isRegistering}
                className="btn btn-primary w-full mt-6"
              >
                {isRegistering ? "Registering..." : "Register"}
              </button>

              <div className="divider my-6">OR</div>

              <GoogleLoginButton />
            </fieldset>
          </form>

          <Link
            to="/login"
            className="block text-center text-sm text-base-content/70 hover:text-base-content"
          >
            Already have an account?{" "}
            <span className="font-medium text-primary hover:text-primary-focus">
              Login
            </span>
          </Link>
        </div>
      </div>

      {/* right side */}
      <div className="hidden sm:flex flex-1 justify-center items-center">
        <Driff />
      </div>
    </div>
  );
};

export default RegisterPage;
