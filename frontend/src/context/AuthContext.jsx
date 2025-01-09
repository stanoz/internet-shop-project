import { createContext, useState, useContext } from 'react';

const AuthContext = createContext({
    isLoggedIn: false,
    setIsLoggedIn: () => {}
    });

export function AuthContextProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}