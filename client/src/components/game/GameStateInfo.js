import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import ChipsAmountPill from './ChipsAmountPill';
import { InfoPill } from './InfoPill';

const Wrapper = styled.div`
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: repeat(4, auto);
  justify-content: center;
  justify-items: center;
  align-items: center;
  width: 100%;
`;

export const GameStateInfo = ({ currentTable }) => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      {currentTable.players.length <= 1 || currentTable.handOver ? (
        <InfoPill>{t('game_state-info_wait')}</InfoPill>
      ) : (
        <InfoPill>
          {currentTable.board.length === 0 && 'Pre-Flop'}
          {currentTable.board.length === 3 && 'Flop'}
          {currentTable.board.length === 4 && 'Turn'}
          {currentTable.board.length === 5 && 'River'}
          {currentTable.wentToShowdown && 'Showdown'}
        </InfoPill>
      )}

      {!!currentTable.mainPot && (
        <ChipsAmountPill
          chipsAmount={currentTable.mainPot}
          style={{ minWidth: '150px' }}
        />
      )}

      {currentTable.sidePots > 0 &&
        currentTable.sidePots.map((sidePot) => (
          <ChipsAmountPill
            chipsAmount={sidePot.amount}
            style={{ minWidth: '150px' }}
          />
        ))}
    </Wrapper>
  );
};
