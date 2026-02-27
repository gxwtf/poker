import React, { useState, useEffect } from 'react';
import LocaContext from './locaContext';
import { withRouter } from 'react-router-dom';
import i18n from '../../i18n';

const initialState = localStorage.getItem('lang') || 'en';

const LocaProvider = ({ location, children }) => {
  const [lang, setLang] = useState(initialState);

  useEffect(() => {
    const lang = new URLSearchParams(location.search).get('lang');
    lang && setLang(lang);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.setAttribute('lang', lang);
    i18n.changeLanguage(lang);
    // eslint-disable-next-line
  }, [lang]);

  return (
    <LocaContext.Provider value={{ lang, setLang }}>
      {children}
    </LocaContext.Provider>
  );
};

export default withRouter(LocaProvider);
