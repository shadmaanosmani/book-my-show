import { createContext, useEffect, useState, useCallback } from "react";
import { loginUser, fetchProfile } from "../lib/api";
import useHttp from "../hooks/useHttp";
import { useNavigate } from "react-router";

const UserContext = createContext({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const UserContextProvider = (props) => {
  const {
    data,
    isLoading,
    error,
    sendRequest: loginRequestHandler,
  } = useHttp(loginUser);

  const {
    data: profileData,
    isLoading: profileIsLoading,
    sendRequest: fetchProfileHandler,
  } = useHttp(fetchProfile);

  const [user, setUser] = useState(null);
  const [hasCalledFetchProfile, setHasCalledFetchProfile] = useState(false);
  const [didLogout, setDidLogout] = useState(false);
  const navigate = useNavigate();

  const loginHandler = useCallback(
    async (values) => {
      await loginRequestHandler(values);
    },
    [loginRequestHandler],
  );

  // Fetch profile on mount if token exists
  useEffect(() => {
    if (!hasCalledFetchProfile && localStorage.getItem("token")) {
      setHasCalledFetchProfile(true);
      fetchProfileHandler();
    }
  }, [fetchProfileHandler, hasCalledFetchProfile]);

  // Handle profile data arrival
  useEffect(() => {
    if (profileData && profileData.payload && !profileIsLoading) {
      setUser(profileData.payload);
    }
  }, [profileData, profileIsLoading]);

  // Handle login response
  useEffect(() => {
    if (!isLoading && data && data.payload && data.payload.token) {
      localStorage.setItem("token", data.payload.token);
      setHasCalledFetchProfile(true);
      fetchProfileHandler();
      navigate("/");
    }
  }, [data, isLoading, navigate, fetchProfileHandler]);

  const logoutHandler = useCallback(() => {
    setUser(null);
    setHasCalledFetchProfile(false);
    setDidLogout(true);
    localStorage.removeItem("token");
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    if (didLogout) {
      setDidLogout(false);
    }
  }, [didLogout, navigate]);

  const contextValue = {
    user: user,
    isAuthenticated: !!user,
    login: loginHandler,
    logout: logoutHandler,
    loginError: error,
    loginIsLoading: isLoading,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
