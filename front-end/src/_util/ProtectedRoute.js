import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../_context/UserContext';

const ProtectedRoute = ({ element: Component, allowedRoles }) => {
    const { user } = useContext(UserContext);

    if (!user) {
        return <Navigate to="/sign-in" />;
    }

    if (allowedRoles.includes(user.role)) {
        return <Component />;
    }

    return <Navigate to="/sign-in" />;
};

export default ProtectedRoute;