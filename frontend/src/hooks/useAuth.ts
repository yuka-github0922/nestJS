import { useEffect, useState } from "react";
import { Payload } from "../types/payload";
import jwtDecode from "jwt-decode";

export const useAuth = () => {
  const [authInfo, setAuthInfo] = useState<{
    checked: boolean;
    isAuthenticated: boolean;
  }>({checked: false, isAuthenticated: false});

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    try {
      if (token) {
        const decordedToken = jwtDecode<Payload>(token);
        console.log(decordedToken);
        console.log(decordedToken.exp * 1000 < Date.now());
        if (decordedToken.exp * 1000 < Date.now()) {
          console.log('kokoha1')
          localStorage.removeItem("token");
          setAuthInfo({checked: true, isAuthenticated: false});
        } else {
          console.log('ここは？')
          setAuthInfo({checked: true, isAuthenticated: true});
          console.log(authInfo)
        }
      } else {
        console.log('kokoha3', token)
        setAuthInfo({checked: true, isAuthenticated: false});
      }
    } catch (err) {
      console.log(err)
      setAuthInfo({checked: true, isAuthenticated: false});
    }
  }, []);
  console.log(authInfo)
  return authInfo;
};