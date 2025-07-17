import { signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './config';

export const signIn = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        await updateUserProfile(userCredential.user.uid, {
            lastLogin: serverTimestamp()
        });

        return userCredential;
    } catch (err) {
        console.log("Sign in error: ", err);
        throw err;
    }
};

export const signUp = async (email, password, displayName) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        if (displayName) {
            await updateProfile(user, {
                displayName: displayName
            });
        }

        await createUserProfile(user.uid, {
            displayName: displayName || '',
            email: user.email,
            createdAt: serverTimestamp(),
            lastLogin: serverTimestamp()
        });

        return userCredential;
    } catch (err) {
        console.log("Sign up error: ", err);
        throw err;
    }
}

export const logout = async () => {
    try {
        await signOut(auth);
    } catch (err) {
        console.log("Logout error: ", err);
        throw err;
    }
};

export const onAuthStateChange = (callback) => {
    return onAuthStateChanged(auth, callback);
};

export const getUserProfile = async (userId) => {
    try {
        const userRef = doc(db, 'users', userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            return userSnap.data();
        } else {
            console.log("No user profile found");
            return null;
        } 
    } catch (err) {
        console.log("Get user profile error: ", err);
        throw err;
    }
}

export const createUserProfile = async (userId, profileData) => {
    try {
        const userRef = doc(db, 'users', userId);
        await setDoc(userRef, {
            ...profileData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });

        return true;
    } catch (err) {
        console.log("Create user profile error: ", err);
        throw err;
    }
};

export const updateUserProfile = async (userId, updateData) => {
    try {
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, {
            ...updateData,
            updatedAt: serverTimestamp()
        });

        return true;
    } catch (err) {
        console.log("Update user profile error: ", err);
        throw err;
    }
};