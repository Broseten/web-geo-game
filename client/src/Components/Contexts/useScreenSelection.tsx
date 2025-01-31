// Authors: Vojta Bruza and Grace Houser
// This file TODO

import React, { createContext, useContext, useState } from 'react';

type Screens = 'home' | 'about' | 'join' | 'create' | 'lobby' | 'play' | 'results' | 'end';

// Create the context
const ScreenContext = createContext<{
   currentScreen: Screens;
   setCurrentScreen: (screen: Screens) => void;
} | undefined>(undefined);

// Hook to use the context
export const useScreenSelection = () => {
   const context = useContext(ScreenContext);
   if (!context) {
      throw new Error(useScreenSelection.name + ' must be used within a ' + ScreenProvider.name);
   }
   return context;
};

// Screen Provider component
export const ScreenProvider = ({ children }: { children: React.ReactNode }) => {

   const [currentScreen, setCurrentScreen] = useState<Screens>('home');

   return (
      <ScreenContext.Provider value={{ currentScreen, setCurrentScreen }}>
         {children}
      </ScreenContext.Provider>
   );
};
