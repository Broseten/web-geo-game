import React, { createContext, useContext, useEffect, useState } from 'react';
import { Config } from '../../types/Config';

const ConfigContext = createContext<Config | null>(null);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const [config, setConfig] = useState<Config | null>(null);

   useEffect(() => {
      // Fetch the config.json file from the public directory
      fetch('/config.json')
         .then(res => res.json())
         .then(setConfig)
         .catch(console.error);
   }, []);

   if (!config) return <p>Loading config...</p>;

   return (
      <ConfigContext.Provider value={config}>
         {children}
      </ConfigContext.Provider>
   );
};

export const useConfig = () => {
   const context = useContext(ConfigContext);
   if (!context) throw new Error('useConfig must be used within a ConfigProvider');
   return context;
};
