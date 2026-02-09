import React, { useState, useContext } from 'react';
import { validateEmail } from '../../utils/helper';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/inputs/Input';
import Button from '../../components/ui/Button';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';

const SignUpPage = ({ setCurrentPage }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!fullName) {
      setError("Please enter your full name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }
    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (!role) {
      setError("Please select a role");
      return;
    }
    setError("");
    setIsLoading(true);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        role
      });

      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        if (role === "supplier") {
            navigate("/dashboard/supplier");
        } else if (role === "manufacturer") {
            navigate("/dashboard/manufacturer");
        } else {
            navigate("/dashboard");
        }
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 px-1">
      <div className="flex flex-col items-center text-center space-y-2">
        <h3 className="text-2xl font-bold text-slate-900">Create an Account</h3>
        <p className="text-slate-500 text-sm">Join us to streamline your procurement process</p>
      </div>

      <form onSubmit={handleSignUp} className="flex flex-col gap-5">
        <Input
          value={fullName}
          onChange={({ target }) => setFullName(target.value)}
          label="Full Name"
          placeholder="Supratim Deb"
          type="text"
        />

        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email Address"
          placeholder="supratimdeb04@gmail.com"
          type="text"
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-slate-700">Role</label>
          <div className="relative">
            <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full py-2 px-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow appearance-none cursor-pointer"
            >
                <option value="" disabled>Select your role</option>
                <option value="supplier">Supplier</option>
                <option value="manufacturer">Manufacturer</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>

        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="Minimum 8 Characters"
          type="password"
        />

        {error && (
            <div className="bg-red-50 text-red-600 px-3 py-2 rounded-md text-sm">
                {error}
            </div>
        )}

        <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full mt-2"
            isLoading={isLoading}
        >
            Create Account
        </Button>

        <div className="text-center mt-2">
          <p className="text-sm text-slate-600">
            Already have an account?{" "}
            <button
              type="button"
              className="text-indigo-600 font-semibold hover:text-indigo-700 hover:underline transition-all"
              onClick={() => setCurrentPage("sign-in")}
            >
              Sign In
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
