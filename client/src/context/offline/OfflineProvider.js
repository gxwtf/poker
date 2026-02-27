import React, { useContext } from 'react';
import OfflineContext from './offlineContext';
import useServiceWorker from '../../hooks/useServiceWorker';
import modalContext from '../modal/modalContext';
import Text from '../../components/typography/Text';
import { useTranslation } from 'react-i18next';

const OfflineProvider = ({ children }) => {
  const { openModal } = useContext(modalContext);
  const { t } = useTranslation();

  const [updateServiceWorker] = useServiceWorker(() => onUpdateServiceWorker());

  const onUpdateServiceWorker = () => {
    openModal(
      () => (
        <Text>{t('service_worker-update_available')}</Text>
      ),
      t('service_worker-update_headline'),
      t('service_worker-update_confirm_btn_txt'),
      updateServiceWorker,
    );
  };

  return <OfflineContext.Provider>{children}</OfflineContext.Provider>;
};

export default OfflineProvider;
