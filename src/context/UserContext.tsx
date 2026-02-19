import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile } from '@/types';
import { MOCK_USER } from '@/config/constants';

interface UserContextType {
    user: UserProfile;
    updateUser: (updates: Partial<UserProfile>) => void;
    resetProgress: () => void;
    isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserProfile>(MOCK_USER);
    const [isLoading, setIsLoading] = useState(true);

    // Load from localStorage on mount
    useEffect(() => {
        // PERMANENT OVERRIDE: Always start fresh for "Role Selection" demo mode
        // const savedUser = localStorage.getItem('dex_user_v3');
        // if (savedUser) {
        //     try {
        //         setUser(JSON.parse(savedUser));
        //     } catch (e) {
        //         console.error('Failed to parse user state', e);
        //     }
        // }
        setIsLoading(false);
    }, []);

    // Save to localStorage on change
    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem('dex_user_v3', JSON.stringify(user));
        }
    }, [user, isLoading]);

    const updateUser = (updates: Partial<UserProfile>) => {
        setUser(prev => ({ ...prev, ...updates }));
    };

    const resetProgress = () => {
        setUser(MOCK_USER);
        localStorage.removeItem('dex_user_v3');
        window.location.reload();
    };

    return (
        <UserContext.Provider value={{ user, updateUser, resetProgress, isLoading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
