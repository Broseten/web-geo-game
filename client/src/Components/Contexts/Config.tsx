import React, { createContext, useContext, useEffect, useState } from 'react';
import { Config } from '../../types/Config';
import { initializeI18n } from '../../i18n/i18nConfig';

const ConfigContext = createContext<Config | null>(null);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const [config, setConfig] = useState<Config | null>(null);

   useEffect(() => {
      // Fetch the config.json file from the public directory
      const loadConfig = async () => {
         const response = await fetch('/config.json');
         const config: Config = await response.json();

         // Initialize i18n AFTER config load
         await initializeI18n(Object.keys(config.languages));

         setConfig(config);
      };
      loadConfig();
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
