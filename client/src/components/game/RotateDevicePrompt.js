import React from 'react';
import Text from '../typography/Text';
import rotateGif from '../../assets/game/rotate.gif';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const Wrapper = styled.div`
  display: none;
  position: fixed;
  z-index: 105;
  background-color: hsl(202, 49%, 18%);
  padding: 2rem;
  width: 100%;
  height: 100%;

  & ${Text} {
    color: ${(props) => props.theme.colors.fontColorLight};
    word-break: break-all;
  }

  @media screen and (orientation: portrait) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const RotateDevicePrompt = () => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <img
        src={rotateGif}
        width="140"
        style={{ width: '140px' }}
        alt="Rotate your device into landscape mode"
      />
      <br />
      <Text textAlign="center">
        {t('game_rotate-device-prompt')}
      </Text>
    </Wrapper>
  );
};
