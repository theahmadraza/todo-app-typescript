import React from 'react';
import {Route, RouteProps, useNavigate} from 'react-router-dom';


const ProtectedRoutes : React.FC<RouteProps> = ({component: Component,...rest}:any) => {
    const navigate = useNavigate()
    const isUserAuthenticated = !!localStorage.getItem('token');
    return(
        <Route
      {...rest}
      render={(props:any) =>
        isUserAuthenticated ? (
          <Component {...props} />
        ) : (
            navigate('/login')
        )
      }
    />
    );
}

export default ProtectedRoutes;