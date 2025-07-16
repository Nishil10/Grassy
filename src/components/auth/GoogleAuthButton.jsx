import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const GoogleAuthButton = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate();

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
        signInBtn.innerHTML = '';

        const customButton = document.createElement('button');
        customButton.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" style="margin-right: 8px;">
            <path fill="#ffffff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#ffffff" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#ffffff" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#ffffff" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Sign in with Google
        `;

        customButton.style.cssText = `
          background-color:rgb(7, 0, 10);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 15px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 44px;
          transition: background-color 0.2s ease;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        `;

        customButton.addEventListener('mouseenter', () => {
          customButton.style.backgroundColor = '#292828 ';
        });
        customButton.addEventListener('mouseleave', () => {
          customButton.style.backgroundColor = '#000000';
        });

        customButton.addEventListener('click', () => {
          if (window.google && window.google.accounts) {
            const tempDiv = document.createElement('div');
            tempDiv.style.position = 'absolute';
            tempDiv.style.left = '-9999px';
            tempDiv.style.top = '-9999px';
            tempDiv.style.visibility = 'hidden';
            document.body.appendChild(tempDiv);

            window.google.accounts.id.renderButton(tempDiv, {
              theme: 'outline',
              size: 'large',
              text: 'signin_with',
              width: 250,
            });

            setTimeout(() => {
              const googleButton = tempDiv.querySelector('[role="button"]');
              if (googleButton) {
                googleButton.click();
              }
              document.body.removeChild(tempDiv);
            }, 100);
          }
        });

        signInBtn.appendChild(customButton);
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

    // ✅ Redirect to homepage
    navigate('/');
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
    <div className="w-full flex justify-center">
      {!userLoggedIn ? (
        <div id="google-signin-btn" className="w-full" />
      ) : (
        <div
          className="user-profile-section"
          style={{
            position: 'relative',
            display: 'inline-block',
            cursor: 'pointer',
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
              boxShadow: menuVisible
                ? '0 4px 12px rgba(16, 185, 129, 0.5)'
                : 'none',
            }}
          >
            <img
              src={currentUser.profilePhoto}
              alt="User Profile"
              style={{
                width: '55px',
                height: '55px',
                borderRadius: '50%',
                border: '3px solid #10B981',
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
                background: '#1f1f1f',
                borderRadius: '8px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
                padding: '8px',
                minWidth: '140px',
              }}
            >
              <div
                style={{
                  padding: '8px 12px',
                  fontSize: '13px',
                  color: '#ccc',
                  borderBottom: '1px solid #444',
                  marginBottom: '8px',
                  textAlign: 'center',
                }}
              >
                {currentUser.fullName}
              </div>
              <button
                onClick={performLogout}
                style={{
                  backgroundColor: '#EF4444',
                  color: 'white',
                  border: 'none',
                  padding: '10px 18px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  width: '100%',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseEnter={(evt) =>
                  (evt.target.style.backgroundColor = '#DC2626')
                }
                onMouseLeave={(evt) =>
                  (evt.target.style.backgroundColor = '#EF4444')
                }
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
