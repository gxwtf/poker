import React, { useContext } from 'react';
import Container from '../components/layout/Container';
import HeadingWithLogo from '../components/typography/HeadingWithLogo';
import Button from '../components/buttons/Button';
import { Link } from 'react-router-dom';
import Markdown from 'react-remarkable';
import useScrollToTopOnPageLoad from '../hooks/useScrollToTopOnPageLoad';
import { useTranslation } from 'react-i18next';
import locaContext from '../context/localization/locaContext';

const StaticPage = ({ title, content }) => {
  const { t } = useTranslation();
  const { lang } = useContext(locaContext);
  useScrollToTopOnPageLoad();

  return (
    <>
      <Container
        display="block"
        padding="5rem 2rem 2rem 2rem"
        contentCenteredMobile
        fullHeight
      >
        <HeadingWithLogo textCentered>{typeof title === 'object' ? title[lang] || title.en : title}</HeadingWithLogo>
        <Markdown>{content}</Markdown>
      </Container>
      <Container
        display="flex"
        justifyContent="center"
        contentCenteredMobile
        margin="2rem auto"
      >
        <Button as={Link} to="/" secondary small>
          {t('static_page-back_btn_txt')}
        </Button>
      </Container>
    </>
  );
};

export default StaticPage;
