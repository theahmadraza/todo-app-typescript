import React from 'react';
import { Button } from 'antd';

const Header:React.FC = () => {
    return(
        <div className='navbar'>
            <h3 className='logo'><a href='#'>Todo App</a></h3>
            <div className='right-nav'>
            <Button>Login</Button>
            <Button>Register</Button>
            </div>
        </div>
    );
}

export default Header;