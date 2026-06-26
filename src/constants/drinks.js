const DRINKS = {
  ALCOHOLIC: [
    {
      id: 'cocktail-1',
      name: 'G&T',
      ingredients: ['Gin', 'Tonic', 'Lime'],
      category: 'Alcoholic Cocktails',
    },
    {
      id: 'cocktail-2',
      name: 'French 75',
      ingredients: ['Gin', 'Citron', 'Socker', 'Mousserande vin'],
      category: 'Alcoholic Cocktails',
    },
    {
      id: 'cocktail-3',
      name: 'Lynchburg Lemonade',
      ingredients: ['Jack Daniel\'s', 'Triple Sec', 'Citron', 'Lemonad'],
      category: 'Alcoholic Cocktails',
    },
    {
      id: 'cocktail-4',
      name: 'Margarita',
      ingredients: ['Tequila', 'Triple Sec', 'Lime'],
      category: 'Alcoholic Cocktails',
    },
    {
      id: 'cocktail-5',
      name: 'Whiskey Sour',
      ingredients: ['Whiskey', 'Citron', 'Socker'],
      category: 'Alcoholic Cocktails',
    },
    {
      id: 'cocktail-6',
      name: 'Aperol Spritz',
      ingredients: ['Aperol', 'Mousserande vin', 'Sodavatten'],
      category: 'Alcoholic Cocktails',
    },
  ],
  NON_ALCOHOLIC: [
    {
      id: 'mock-1',
      name: 'Kombucha Mojito',
      ingredients: ['Lime', 'Mynta', 'Socker', 'Krossad is', 'Kombucha'],
      category: 'Non-Alcoholic Cocktails',
    },
    {
      id: 'mock-2',
      name: 'Sparkling Rhubarb',
      ingredients: ['Rabarbersaft', 'Citronjuice', 'Mousserande'],
      category: 'Non-Alcoholic Cocktails',
    },
    {
      id: 'mock-3',
      name: 'Aperol Spritz 0%',
      ingredients: ['Blodgrape-/Apelsinjuice', 'Ginger Ale', 'Tonic'],
      category: 'Non-Alcoholic Cocktails',
    },
  ],
  WINE: [
    {
      id: 'wine-1',
      name: 'Husets Vita Vin',
      category: 'Wine',
    },
    {
      id: 'wine-2',
      name: 'Husets Rosévin',
      category: 'Wine',
    },
    {
      id: 'wine-3',
      name: 'Husets Röda Vin',
      category: 'Wine',
    },
    {
      id: 'wine-4',
      name: 'Mousserande Vin',
      category: 'Wine',
    },
  ],
  BEER: [
    {
      id: 'beer-1',
      name: 'Peroni',
      category: 'Beer',
    },
    {
      id: 'beer-2',
      name: 'Peroni alkoholfri',
      category: 'Beer',
    },
  ],
  DIGESTIF: [
    {
      id: 'digestif-1',
      name: 'Whiskey',
      category: 'Digestifs',
    },
    {
      id: 'digestif-2',
      name: 'Konjak',
      category: 'Digestifs',
    },
    {
      id: 'digestif-3',
      name: 'Kaffe Karlsson',
      category: 'Digestifs',
    },
    {
      id: 'digestif-4',
      name: 'Irish Coffee',
      category: 'Digestifs',
    },
    {
      id: 'digestif-5',
      name: 'Bailey\'s',
      category: 'Digestifs',
    },
  ],
};

export const getAllDrinks = () => {
  return [
    ...DRINKS.ALCOHOLIC,
    ...DRINKS.NON_ALCOHOLIC,
    ...DRINKS.WINE,
    ...DRINKS.BEER,
    ...DRINKS.DIGESTIF,
  ];
};

export const getDrinksByCategory = () => {
  return {
    'Drinkar': DRINKS.ALCOHOLIC,
    'Mocktails': DRINKS.NON_ALCOHOLIC,
    'Vin': DRINKS.WINE,
    'Öl': DRINKS.BEER,
    'Avec': DRINKS.DIGESTIF,
  };
};

export default DRINKS;
