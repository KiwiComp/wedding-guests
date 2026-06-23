export const ALERT_TYPE = {
    NULL: null,
    DISCARD: 'discard',
    ORDER_SUCCESS: 'success',
    ERROR: 'error',
};

export const alertConfig = {
  [ALERT_TYPE.DISCARD]: {
    title: 'Nollställ order',
    message: 'Är du säker på att du vill ta bort alla tillagda drinkar?',
  },
  [ALERT_TYPE.ORDER_SUCCESS]: {
    title: 'Skål för kärleken!',
    message: 'Order skickad till baren.',
  },
  [ALERT_TYPE.ERROR]: {
    title: 'Något gick fel',
    message: 'Försök igen.',
  },
};