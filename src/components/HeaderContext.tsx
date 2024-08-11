"use client";

import React, { createContext, useContext, useState } from "react";

interface HeaderContextType {
    showBackButton: boolean;
    setShowBackButton: (value: boolean) => void;
    showLogoutButton: boolean;
    setShowLogoutButton: (value: boolean) => void;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export const HeaderProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [showBackButton, setShowBackButton] = useState(false);
    const [showLogoutButton, setShowLogoutButton] = useState(false);

    return (
        <HeaderContext.Provider
            value={{
                showBackButton,
                setShowBackButton,
                showLogoutButton,
                setShowLogoutButton,
            }}
        >
            {children}
        </HeaderContext.Provider>
    );
};

export const useHeader = () => {
    const context = useContext(HeaderContext);
    if (context === undefined) {
        throw new Error("useHeader must be used within a HeaderProvider");
    }
    return context;
};
