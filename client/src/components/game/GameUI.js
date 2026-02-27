import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../buttons/Button';
import { BetSlider } from './BetSlider';
import { UIWrapper } from './UIWrapper';

export const GameUI = ({
  currentTable,
  seatId,
  bet,
  setBet,
  raise,
  standUp,
  fold,
  check,
  call,
}) => {
  const { t } = useTranslation();

  return (
    <UIWrapper>
      <BetSlider
        currentTable={currentTable}
        seatId={seatId}
        bet={bet}
        setBet={setBet}
      />
      <Button small onClick={() => raise(bet + currentTable.seats[seatId].bet)}>
        {t('game_ui_bet')} {bet}
      </Button>
      <Button small secondary onClick={standUp}>
        {t('game_ui_stand-up')}
      </Button>
      <Button small secondary onClick={fold}>
        {t('game_ui_fold')}
      </Button>
      <Button
        small
        secondary
        disabled={
          currentTable.callAmount !== currentTable.seats[seatId].bet &&
          currentTable.callAmount > 0
        }
        onClick={check}
      >
        {t('game_ui_check')}
      </Button>
      <Button
        small
        disabled={
          currentTable.callAmount === 0 ||
          currentTable.seats[seatId].bet >= currentTable.callAmount
        }
        onClick={call}
      >
        {t('game_ui_call')}{' '}
        {currentTable.callAmount &&
        currentTable.seats[seatId].bet < currentTable.callAmount &&
        currentTable.callAmount <= currentTable.seats[seatId].stack
          ? currentTable.callAmount - currentTable.seats[seatId].bet
          : ''}
      </Button>
      <Button
        small
        onClick={() =>
          raise(
            currentTable.seats[seatId].stack + currentTable.seats[seatId].bet,
          )
        }
      >
        {t('game_ui_all-in')} (
        {currentTable.seats[seatId].stack})
      </Button>
    </UIWrapper>
  );
};
