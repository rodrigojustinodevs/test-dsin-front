import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";

interface AuthContextData {
  token: string | null;
  signed: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

interface AuthProviderProps {
	children: ReactNode;
  }
  
  const AUTH_TOKEN_LOCAL_STORAGE_KEY = "@Auth:token";
  const AUTH_EMAIL_LOCAL_STORAGE_KEY = "@Auth:email";
  const AUTH_NAME_LOCAL_STORAGE_KEY = "@Auth:name";

  
  const AuthContext = createContext<AuthContextData | undefined>(undefined);
  
  export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
  }

export function AuthProvider({ children }: AuthProviderProps) {

	useEffect(() => {
		const loadingStorageData = async () => {
			const storageToken = localStorage.getItem(
				AUTH_TOKEN_LOCAL_STORAGE_KEY
			);
			const storageEmail = localStorage.getItem(
				AUTH_EMAIL_LOCAL_STORAGE_KEY
			);
			const storageName = localStorage.getItem(
				AUTH_NAME_LOCAL_STORAGE_KEY
			);
		
			if (storageToken && storageEmail && storageName) {
				setToken(storageToken);
			}
		};
		loadingStorageData();
	}, []);
	
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(localStorage.getItem(AUTH_TOKEN_LOCAL_STORAGE_KEY));

  const signIn = async (email: string, password: string): Promise<void> => {
	try {
	  const response = await api.post("/login", {
		email,
		password,
	  });
  
	  if (!response.data.error) {
		const { token, user } = response.data.response;
		setToken(token);
  
		localStorage.setItem(AUTH_TOKEN_LOCAL_STORAGE_KEY, token);
		localStorage.setItem(AUTH_EMAIL_LOCAL_STORAGE_KEY, user.email);
		localStorage.setItem(AUTH_NAME_LOCAL_STORAGE_KEY, user.name);
	  } else {
		console.log("Erro na autenticação");
		throw new Error("Erro na autenticação");
	  }
	} catch (error) {
	  console.log(error);
	  throw error;
	}
  };

  const signOut = () => {
	api.post("/logout");
	localStorage.clear();
	setToken(null);
	navigate("/login");
	window.location.reload();
  };

  return (
	<AuthContext.Provider value={{ token, signed: !!token?.length, signIn, signOut }}>
	  {children}
	</AuthContext.Provider>
  );
}