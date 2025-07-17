import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChange, getUserProfile } from '../services/firebase';

const AuthContext = createContext({});

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }

    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChange(async (user) => {
            try {
                if (user) {
                    setUser(user);

                    const profile = await getUserProfile(user.uid);
                    setUserProfile(profile);
                } else {
                    setUser(null);
                    setUserProfile(null);
                }
            } catch (err) {
                console.log("Error in changing auth state: ", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        });
    }, []);

    const value = {
        user,
        userProfile,
        loading,
        error,
        isAuthenticated: !!user,
        refreshProfile: async () => {
            if (user) {
                const profile = await getUserProfile(user.uid);
                setUserProfile(profile);
            }
        }
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};