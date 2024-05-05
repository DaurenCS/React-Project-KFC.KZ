import React from 'react';
import './Header.css';
import { useAuth } from "hooks/use-auth"
import { Link, useNavigate } from "react-router-dom";
import StickyBox from "react-sticky-box";

function Header() {
    const { isAuth, handleLogout } = useAuth();
    const navigate = useNavigate();

    return (
    <StickyBox  offsetTop={0} offsetBottom={10}>
    
        <header className="header">
            <div className="logo">
                <Link to={"/"}>
                    <div className="logo-container">
                        <div className="logo-icon">
                            <img src="https://www.kfc.kz/admin/files/3190.svg" alt="" />
                        </div>
                    </div>
                </Link>
            </div>

            <div className="user-info">
                {/* {isAuth && <div className="user-name"><p>Welcome {name} {surname}!</p></div>} */}
                {isAuth && <img className="log" alt='cart_button' src="https://cdn-icons-png.flaticon.com/512/2169/2169826.png" onClick={() => { navigate("/cart") }} />}
                {/* <img className="log" src="https://cdn-icons-png.flaticon.com/128/4240/4240674.png" onClick={() => { navigate("/") }} /> */}
                {/* <img className="log" alt='phones' src="https://cdn-icons-png.flaticon.com/128/5585/5585562.png" onClick={() => { navigate("/") }} /> */}
                {!isAuth && <img className="log" alt='login_icon' src="https://cdn-icons-png.flaticon.com/128/3106/3106921.png" onClick={() => { navigate("/login") }} />}
                {isAuth && <img className="logout" alt='logout_icon' src="https://cdn-icons-png.flaticon.com/512/5509/5509651.png" onClick={handleLogout} />}
            </div>
        </header>
    </StickyBox>
    );
}

export default Header;