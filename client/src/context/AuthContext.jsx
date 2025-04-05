import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // states which will be updated after tht successful logn and logout
  const apiUrl = import.meta.env.VITE_API_URL;
  const [token, setToken] = useState(
    localStorage.getItem("employeems_token") || null
  );
  const [user, setUser] = useState(
    localStorage.getItem("employeems_user") || null
  );
  const [isAuthenticated, setIsAuthenticated] = useState(!!token); // ensure flag is always boolean
  const navigate = useNavigate();

  // function to check token expiration
  const checkTokenExpiry = () => {
    const storedToken = localStorage.getItem("employeems_token");
    if (!storedToken) return;
    try {
      const decoded = jwtDecode(token);
      const expTime = decoded.exp * 1000; // Convert expiry to milliseconds
      if (expTime < Date.now()) {
        logout();
      }
    } catch (error) {
      console.log("Invalid token:", error);
      logout();
    }
  };

  // check token expiry on page load
  useEffect(() => {
    if (token) {
      checkTokenExpiry();
    }
  }, [token]);

  // function to register

  const register = async (formData) => {
    try {
      const response = await fetch(`${apiUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      // console.log(data);
      if (response.status === 200) {
        toast.success(data.message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  // function to login

  const login = async (formData) => {
    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.status === 200) {
        toast.success(data.message);
      }
      if (data.token) {
        setTimeout(() => {
          localStorage.setItem("employeems_token", data.token);
          localStorage.setItem("employeems_user", JSON.stringify(data.user));
          setToken(data.token);
          setUser(data.user);
          setIsAuthenticated(true);
          navigate("/records");
        }, 2000);
      } else {
        toast.error(data.message);
      }
      // console.log(data);
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  // function to logout

  const logout = () => {
    localStorage.removeItem("employeems_token");
    localStorage.removeItem("employeems_user");
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ login, logout, register, isAuthenticated, token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
