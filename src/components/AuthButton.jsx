import React, { useState, useEffect } from 'react';

export const GoogleAuth = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);

    const GOOGLE_CLIENT_ID = '624221653604-am0s1bqnksh63n82krvo1jn6s9hdr3rs.apps.googleusercontent.com';

    useEffect(() => {
        const googleScript = document.createElement('script');
        googleScript.src = 'https://accounts.google.com/gsi/client';
        googleScript.async = true;
        googleScript.defer = true;
        googleScript.onload = setupGoogleAuth;
        document.head.appendChild(googleScript);

        return () => {
            document.head.removeChild(googleScript);
        };
    }, []);

    const setupGoogleAuth = () => {
        if (window.google) {
            window.google.accounts.id.initialize({
                client_id: GOOGLE_CLIENT_ID,
                callback: processLoginResponse,
            });

            const signInBtn = document.getElementById('google-signin-btn');
            if (signInBtn) {
                window.google.accounts.id.renderButton(
                    document.getElementById('google-signin-btn'),
                    {
                        theme: 'outline',
                        size: 'large',
                        text: 'signin_with',
                        width: 250,
                    }
                );
            }
        }
    };

    const processLoginResponse = (authResponse) => {
        const userToken = authResponse.credential;
        const userDetails = JSON.parse(atob(userToken.split('.')[1]));

        setCurrentUser({
            userId: userDetails.sub,
            fullName: userDetails.name,
            emailAddress: userDetails.email,
            profilePhoto: userDetails.picture,
        });
        setUserLoggedIn(true);

        const signInBtn = document.getElementById('google-signin-btn');
        if (signInBtn) {
            signInBtn.innerHTML = '';
        }
    };

    const performLogout = () => {
        setCurrentUser(null);
        setUserLoggedIn(false);
        setMenuVisible(false);
        
        window.google?.accounts.id.revoke(currentUser?.emailAddress, () => {
            console.log('User successfully logged out');
        });

        setTimeout(() => {
            setupGoogleAuth();
        }, 100);
    };

    const toggleProfileMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const showProfileMenu = () => {
        setMenuVisible(true);
    };

    const hideProfileMenu = () => {
        setMenuVisible(false);
    };

    return (
        <div className="google-auth-wrapper">
            {!userLoggedIn ? (
                <div id="google-signin-btn"></div>
            ) : (
                <div 
                    className="user-profile-section" 
                    style={{ 
                        position: 'relative', 
                        display: 'inline-block', 
                        cursor: 'pointer' 
                    }}
                    onMouseEnter={showProfileMenu}
                    onMouseLeave={hideProfileMenu}
                >
                    <button
                        onClick={toggleProfileMenu}
                        style={{ 
                            background: 'none', 
                            border: 'none', 
                            padding: 0, 
                            cursor: 'pointer', 
                            borderRadius: '50%', 
                            transition: 'transform 0.3s ease-in-out', 
                            transform: menuVisible ? 'scale(1.1)' : 'scale(1)',
                            boxShadow: menuVisible ? '0 4px 12px rgba(66, 133, 244, 0.3)' : 'none',
                        }}
                    >
                        <img 
                            src={currentUser.profilePhoto} 
                            alt="User Profile" 
                            style={{ 
                                width: '55px', 
                                height: '55px', 
                                borderRadius: '50%', 
                                border: '3px solid #4285F4', 
                                transition: 'all 0.3s ease-in-out',
                                filter: menuVisible ? 'brightness(1.1)' : 'brightness(1)',
                            }}
                        />
                    </button>
                    
                    {menuVisible && (
                        <div
                            style={{ 
                                position: 'absolute', 
                                top: '70px', 
                                left: '50%', 
                                transform: 'translateX(-50%)', 
                                zIndex: 10,
                                background: 'white',
                                borderRadius: '8px',
                                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
                                padding: '8px',
                                minWidth: '120px',
                            }}
                        >
                            <div style={{ 
                                padding: '8px 12px', 
                                fontSize: '12px', 
                                color: '#666', 
                                borderBottom: '1px solid #eee',
                                marginBottom: '8px',
                                textAlign: 'center'
                            }}>
                                {currentUser.fullName}
                            </div>
                            <button
                                onClick={performLogout}
                                style={{ 
                                    backgroundColor: '#EA4335', 
                                    color: 'white', 
                                    border: 'none', 
                                    padding: '10px 18px', 
                                    borderRadius: '6px', 
                                    cursor: 'pointer', 
                                    fontSize: '14px', 
                                    fontWeight: '500',
                                    width: '100%',
                                    transition: 'background-color 0.2s ease',
                                    ':hover': {
                                        backgroundColor: '#D93025'
                                    }
                                }}
                                onMouseEnter={(evt) => evt.target.style.backgroundColor = '#D93025'}
                                onMouseLeave={(evt) => evt.target.style.backgroundColor = '#EA4335'}
                            >
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};