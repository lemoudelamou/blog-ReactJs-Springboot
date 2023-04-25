import { useContext } from "react"; 
import AuthContext from "../context/AuthProvider";

interface ContextTypes {
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    userId: number;
    setuserId: (id: number) => void;
    username: string;
    setUsername: (username: string) => void;
    jwt: string;
    setJwt: (jwt: string) => void;
    isActive: boolean;
    setIsActivated: (active:boolean) => void;
    verificationCode: String;
    setVerificationCode: (verificationCode: string) => void;
}

const useAuth = () :ContextTypes => {
  return useContext(AuthContext) as ContextTypes;
}



export default useAuth;