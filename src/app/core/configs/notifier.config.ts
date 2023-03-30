import { NotifierOptions } from 'angular-notifier';

export const notifierConfig: NotifierOptions = {
  position: {
    horizontal: { position: 'right', distance: 12 },
    vertical: { position: 'top', distance: 12, gap: 10 },
  },
  behaviour: {
    autoHide: 10_000,
    stacking: 5,
  },
};
