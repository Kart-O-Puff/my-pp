import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../_config/api';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('authToken');
            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    const response = await api.get(`/user/${decodedToken.userId}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    if (response.status === 200) {
                        const userData = await response.data;
                        setUser(userData);
                    } else {
                        console.error('Failed to fetch user data:', response.statusText);
                    }
                } catch (error) {
                    console.error('Failed to decode token or fetch user data:', error);
                }
            }
            setLoading(false);
        };

        if (!user) {
            fetchUser();
        } else {
            setLoading(false);
        }
    }, [user, setUser]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};