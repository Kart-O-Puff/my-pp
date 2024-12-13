import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../_context/UserContext';
import { jwtDecode } from 'jwt-decode';
import api from '../_config/api';

const ProtectedRoute = ({ element: Component, allowedRoles }) => {
    const { user, setUser } = useContext(UserContext);
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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/sign-in" />;
    }

    if (allowedRoles.includes(user.role)) {
        return <Component />;
    }

    return <Navigate to="/sign-in" />;
};

export default ProtectedRoute;