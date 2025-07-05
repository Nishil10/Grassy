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
};