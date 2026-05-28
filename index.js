// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then((reg) => console.log('[Service Worker] Registered successfully', reg.scope))
      .catch((err) => console.error('[Service Worker] Registration failed', err));
  });
}

// Compact Drink Database catalog of 100 drinks (10 Categories, 10 drinks each: 5 Indian, 5 International)
const COMPACT_DRINKS = [
  // 1. SINGLE MALT
  // India (5)
  { id: 'amrut-single-malt', name: 'Amrut Single Malt', category: 'Single Malt', origin: 'India', abv: '46%', sub: 'Indian Craft Single Malt' },
  { id: 'paul-john-brilliance', name: 'Paul John Brilliance', category: 'Single Malt', origin: 'India', abv: '46%', sub: 'Indian Craft Single Malt' },
  { id: 'rampur-double-cask', name: 'Rampur Double Cask', category: 'Single Malt', origin: 'India', abv: '45%', sub: 'Sherry Cask Indian Malt' },
  { id: 'indri-trini', name: 'Indri Trini Three Wood', category: 'Single Malt', origin: 'India', abv: '46%', sub: 'Three Wood Indian Malt' },
  { id: 'kamet-single-malt', name: 'Kamet Single Malt', category: 'Single Malt', origin: 'India', abv: '46%', sub: 'Himalayan Single Malt' },
  // International (5)
  { id: 'single-malt-scotch', name: 'Glenfiddich 12 Scotch', category: 'Single Malt', origin: 'International', abv: '40%', sub: 'Speyside Single Malt' },
  { id: 'macallan-12', name: 'Macallan 12 Double Cask', category: 'Single Malt', origin: 'International', abv: '43%', sub: 'Sherry Oak Single Malt' },
  { id: 'laphroaig-10', name: 'Laphroaig 10 Year', category: 'Single Malt', origin: 'International', abv: '40%', sub: 'Peated Islay Single Malt' },
  { id: 'talisker-10', name: 'Talisker 10 Year', category: 'Single Malt', origin: 'International', abv: '45.8%', sub: 'Isle of Skye Single Malt' },
  { id: 'glenmorangie-10', name: 'Glenmorangie Original', category: 'Single Malt', origin: 'International', abv: '40%', sub: 'Highland Single Malt' },

  // 2. BLENDED WHISKEY
  // India (4)
  { id: 'royal-stag', name: 'Royal Stag Deluxe', category: 'Blended Whiskey', origin: 'India', abv: '42.8%', sub: 'Blended Grain & Scotch' },
  { id: 'imperial-blue', name: 'Imperial Blue', category: 'Blended Whiskey', origin: 'India', abv: '42.8%', sub: 'Smooth Grain Blend' },
  { id: 'blenders-pride', name: 'Blenders Pride Premium', category: 'Blended Whiskey', origin: 'India', abv: '42.8%', sub: 'Rare Premium Blend' },
  { id: 'signature-premier', name: 'Signature Premier Blend', category: 'Blended Whiskey', origin: 'India', abv: '42.8%', sub: 'Aged Malt & Grain Blend' },
  // International (6)
  { id: 'johnnie-walker-black', name: 'Johnnie Walker Black Label', category: 'Blended Whiskey', origin: 'International', abv: '40%', sub: 'Premium Blended Scotch' },
  { id: 'johnnie-walker-red', name: 'Johnnie Walker Red Label', category: 'Blended Whiskey', origin: 'International', abv: '40%', sub: 'Iconic Blended Scotch' },
  { id: 'jameson-irish', name: 'Jameson Irish Whiskey', category: 'Blended Whiskey', origin: 'International', abv: '40%', sub: 'Triple Distilled Irish Blend' },
  { id: 'chivas-regal-12', name: 'Chivas Regal 12 Year', category: 'Blended Whiskey', origin: 'International', abv: '40%', sub: 'Blended Scotch Whisky' },
  { id: 'jack-daniels', name: 'Jack Daniel\'s Tennessee', category: 'Blended Whiskey', origin: 'International', abv: '40%', sub: 'Charcoal Mellowed Sour Mash' },
  { id: 'bourbon-whiskey', name: 'Maker\'s Mark Bourbon', category: 'Blended Whiskey', origin: 'International', abv: '45%', sub: 'Kentucky Wheated Bourbon' },

  // 2. BEER
  // India (5)
  { id: 'kingfisher', name: 'Kingfisher Premium', category: 'Beer', origin: 'India', abv: '4.8%', sub: 'Indian Pilsner Lager' },
  { id: 'bira-91', name: 'Bira 91 Blonde Lager', category: 'Beer', origin: 'India', abv: '4.5%', sub: 'Blonde Tropical Lager' },
  { id: 'godfather-lager', name: 'Godfather Strong Beer', category: 'Beer', origin: 'India', abv: '7.5%', sub: 'Extra Malt Lager' },
  { id: 'kalyani-black-label', name: 'Kalyani Black Label', category: 'Beer', origin: 'India', abv: '7.8%', sub: 'Iconic Strong Ale' },
  { id: 'simba-stout', name: 'Simba Stout', category: 'Beer', origin: 'India', abv: '5.0%', sub: 'Oatmeal Milk Stout' },
  // International (5)
  { id: 'corona-extra', name: 'Corona Extra', category: 'Beer', origin: 'International', abv: '4.5%', sub: 'Mexican Pale Lager' },
  { id: 'heineken', name: 'Heineken Lager', category: 'Beer', origin: 'International', abv: '5.0%', sub: 'Dutch Premium Lager' },
  { id: 'budweiser', name: 'Budweiser Lager', category: 'Beer', origin: 'International', abv: '5.0%', sub: 'Beechwood Aged Lager' },
  { id: 'guinness-stout', name: 'Guinness Dry Stout', category: 'Beer', origin: 'International', abv: '4.2%', sub: 'Velvety Irish Stout' },
  { id: 'hoegaarden', name: 'Hoegaarden Witbier', category: 'Beer', origin: 'International', abv: '4.9%', sub: 'Belgian Spiced Wheat' },

  // 3. TEQUILA & AGAVE
  // India (5 agave spirits)
  { id: 'desmondji-gold', name: 'DesmondJi Agave Gold', category: 'Tequila', origin: 'India', abv: '37.1%', sub: 'Oak Rested Indian Agave' },
  { id: 'pistola-reposado', name: 'Pistola Reposado Agave', category: 'Tequila', origin: 'India', abv: '40%', sub: 'Wild Agave Reposado' },
  { id: 'desmondji-100', name: 'DesmondJi Agave 100%', category: 'Tequila', origin: 'India', abv: '40%', sub: 'Pure Agave Blanco' },
  { id: 'pistola-joven', name: 'Pistola Joven Agave', category: 'Tequila', origin: 'India', abv: '40%', sub: 'Wild Agave Blend' },
  { id: 'indian-agave-blanco', name: 'Indian Agave Blanco', category: 'Tequila', origin: 'India', abv: '37.5%', sub: 'Agave Blanco Spirit' },
  // International (5)
  { id: 'patron-silver', name: 'Patron Silver Tequila', category: 'Tequila', origin: 'International', abv: '40%', sub: '100% Blue Agave Silver' },
  { id: 'don-julio', name: 'Don Julio Reposado', category: 'Tequila', origin: 'International', abv: '40%', sub: 'Barrel Matured Reposado' },
  { id: 'jose-cuervo', name: 'Jose Cuervo Especial', category: 'Tequila', origin: 'International', abv: '40%', sub: 'Gold Tequila Blend' },
  { id: 'casamigos-blanco', name: 'Casamigos Blanco', category: 'Tequila', origin: 'International', abv: '40%', sub: 'Small Batch Blanco' },
  { id: '1800-anejo', name: '1800 Añejo Tequila', category: 'Tequila', origin: 'International', abv: '40%', sub: 'Aged French Oak Tequila' },

  // 4. VODKA
  // India (5)
  { id: 'magic-moments', name: 'Magic Moments Vodka', category: 'Vodka', origin: 'India', abv: '37.5%', sub: 'Triple Distilled Grain' },
  { id: 'romanov-vodka', name: 'Romanov Premium Vodka', category: 'Vodka', origin: 'India', abv: '42.8%', sub: 'Classic Wheat Vodka' },
  { id: 'white-mischief', name: 'White Mischief Vodka', category: 'Vodka', origin: 'India', abv: '42.8%', sub: 'Distilled White Spirit' },
  { id: 'smoke-vodka', name: 'Smoke Craft Vodka', category: 'Vodka', origin: 'India', abv: '40%', sub: 'Basmati Rice Vodka' },
  { id: 'rahasya-vodka', name: 'Rahasya Indian Vodka', category: 'Vodka', origin: 'India', abv: '40%', sub: 'Spiced Grain Vodka' },
  // International (5)
  { id: 'grey-goose', name: 'Grey Goose Vodka', category: 'Vodka', origin: 'International', abv: '40%', sub: 'French Cognac Region Wheat' },
  { id: 'absolut-vodka', name: 'Absolut Vodka', category: 'Vodka', origin: 'International', abv: '40%', sub: 'Swedish Winter Wheat' },
  { id: 'smirnoff', name: 'Smirnoff Red Label', category: 'Vodka', origin: 'International', abv: '40%', sub: 'Triple Distilled Charcoal' },
  { id: 'belvedere', name: 'Belvedere Pure Vodka', category: 'Vodka', origin: 'International', abv: '40%', sub: 'Polish Rye Vodka' },
  { id: 'ketel-one', name: 'Ketel One Vodka', category: 'Vodka', origin: 'International', abv: '40%', sub: 'Dutch Copper Pot Distilled' },

  // 5. RUM
  // India (5)
  { id: 'old-monk', name: 'Old Monk Dark Rum', category: 'Rum', origin: 'India', abv: '42.8%', sub: 'Oak Aged Dark Rum' },
  { id: 'hercules-rum', name: 'Hercules XXX Rum', category: 'Rum', origin: 'India', abv: '42.8%', sub: 'Classic Indian Dark Rum' },
  { id: 'contessa-rum', name: 'Contessa Premium Rum', category: 'Rum', origin: 'India', abv: '42.8%', sub: 'Woody Molasses Blend' },
  { id: 'wild-tiger-rum', name: 'Wild Tiger Reserve Rum', category: 'Rum', origin: 'India', abv: '40%', sub: 'Cane Juice & Molasses Blend' },
  { id: 'maka-zai-gold', name: 'Maka Zai Tribute Gold', category: 'Rum', origin: 'India', abv: '40%', sub: 'Goan Oak Matured Gold' },
  // International (5)
  { id: 'bacardi-superior', name: 'Bacardi Superior White', category: 'Rum', origin: 'International', abv: '40%', sub: 'Light Cuban Style Rum' },
  { id: 'captain-morgan', name: 'Captain Morgan Spiced', category: 'Rum', origin: 'International', abv: '35%', sub: 'Caribbean Spiced Rum' },
  { id: 'havana-club-7', name: 'Havana Club 7 Anejo', category: 'Rum', origin: 'International', abv: '40%', sub: 'Aged Cuban Dark Rum' },
  { id: 'el-dorado-12', name: 'El Dorado 12 Year Rum', category: 'Rum', origin: 'International', abv: '40%', sub: 'Demerara Wood Still Matured' },
  { id: 'mount-gay', name: 'Mount Gay Eclipse Rum', category: 'Rum', origin: 'International', abv: '40%', sub: 'Barbados Amber Rum' },

  // 6. GIN
  // India (5)
  { id: 'greater-than', name: 'Greater Than London Dry', category: 'Gin', origin: 'India', abv: '40%', sub: 'Indian Botanical Juniper' },
  { id: 'stranger-sons', name: 'Stranger & Sons Gin', category: 'Gin', origin: 'India', abv: '42.8%', sub: 'Spiced Citrus Indian Gin' },
  { id: 'jaisalmer-gin', name: 'Jaisalmer Craft Gin', category: 'Gin', origin: 'India', abv: '43%', sub: 'Darjeeling Green Tea Infused' },
  { id: 'hapusa-gin', name: 'Hapusa Himalayan Gin', category: 'Gin', origin: 'India', abv: '43%', sub: 'Himalayan Juniper Berry' },
  { id: 'blue-riband', name: 'Blue Riband Gin', category: 'Gin', origin: 'India', abv: '40%', sub: 'Classic Indian Dry Gin' },
  // International (5)
  { id: 'hendricks-gin', name: 'Hendrick\'s Dry Gin', category: 'Gin', origin: 'International', abv: '44%', sub: 'Cucumber & Rose Infused' },
  { id: 'bombay-sapphire', name: 'Bombay Sapphire Gin', category: 'Gin', origin: 'International', abv: '47%', sub: 'Vapour Infused Botanicals' },
  { id: 'tanqueray', name: 'Tanqueray London Dry', category: 'Gin', origin: 'International', abv: '47.3%', sub: 'Four Botanical Classic' },
  { id: 'beefeater', name: 'Beefeater London Dry', category: 'Gin', origin: 'International', abv: '40%', sub: 'Bold London Juniper' },
  { id: 'gordons-gin', name: 'Gordon\'s London Dry', category: 'Gin', origin: 'International', abv: '37.5%', sub: 'Classic Triple Distilled' },

  // 7. WHITE WINES
  // India (5)
  { id: 'sula-chenin', name: 'Sula Chenin Blanc', category: 'White Wines', origin: 'India', abv: '12.5%', sub: 'Nashik Semi-Dry White' },
  { id: 'sula-sauvignon', name: 'Sula Sauvignon Blanc', category: 'White Wines', origin: 'India', abv: '12.5%', sub: 'Nashik Herbaceous Dry' },
  { id: 'grover-viognier', name: 'Grover Art Collection', category: 'White Wines', origin: 'India', abv: '13%', sub: 'Peachy Floral Viognier' },
  { id: 'fratelli-chardonnay', name: 'Fratelli Chardonnay', category: 'White Wines', origin: 'India', abv: '13.5%', sub: 'Crisp Lightly Oaked White' },
  { id: 'york-chenin', name: 'York Chenin Blanc', category: 'White Wines', origin: 'India', abv: '12.5%', sub: 'Off-Dry Melon notes' },
  // International (5)
  { id: 'cloudy-bay', name: 'Cloudy Bay Sauvignon Blanc', category: 'White Wines', origin: 'International', abv: '13.5%', sub: 'Marlborough Citrus Dry' },
  { id: 'kendall-jackson', name: 'Kendall-Jackson Chardonnay', category: 'White Wines', origin: 'International', abv: '13.5%', sub: 'Oak Matured Buttery Chardonnay' },
  { id: 'santa-margherita', name: 'Santa Margherita Pinot Grigio', category: 'White Wines', origin: 'International', abv: '12%', sub: 'Dry Crisp Alpine White' },
  { id: 'yellow-tail-chard', name: 'Yellow Tail Chardonnay', category: 'White Wines', origin: 'International', abv: '13.5%', sub: 'Australian Peach & Vanilla' },
  { id: 'oyster-bay', name: 'Oyster Bay Sauvignon Blanc', category: 'White Wines', origin: 'International', abv: '12.5%', sub: 'Zesty Lime Marlborough' },

  // 8. RED WINES
  // India (5)
  { id: 'sula-dindori', name: 'Sula Dindori Shiraz', category: 'Red Wines', origin: 'India', abv: '13.5%', sub: 'Nashik Bold Oaked Shiraz' },
  { id: 'grover-reserve', name: 'Grover La Réserve Shiraz', category: 'Red Wines', origin: 'India', abv: '14%', sub: 'Spiced Oak Cabernet Shiraz' },
  { id: 'fratelli-shiraz', name: 'Fratelli Cabernet Shiraz', category: 'Red Wines', origin: 'India', abv: '13.5%', sub: 'Plummy Smooth Red Blend' },
  { id: 'york-shiraz', name: 'York Shiraz Red Wine', category: 'Red Wines', origin: 'India', abv: '13.5%', sub: 'Spicy Fruity Nashik Shiraz' },
  { id: 'krsma-cabernet', name: 'KRSMA Cabernet Sauvignon', category: 'Red Wines', origin: 'India', abv: '14%', sub: 'Hampi Hills Tannic Red' },
  // International (5)
  { id: 'cabernet-sauvignon', name: 'Cabernet Sauvignon Reserve', category: 'Red Wines', origin: 'International', abv: '14%', sub: 'Napa Valley Oak Cabernet' },
  { id: 'merlot', name: 'Merlot Premium Red', category: 'Red Wines', origin: 'International', abv: '13.5%', sub: 'Smooth Black Cherry Merlot' },
  { id: 'pinot-noir', name: 'Pinot Noir Classic Red', category: 'Red Wines', origin: 'International', abv: '13%', sub: 'Earthy Burgundy Style Pinot' },
  { id: 'penfolds-shiraz', name: 'Penfolds Max\'s Shiraz', category: 'Red Wines', origin: 'International', abv: '14.5%', sub: 'Australian Bold Pepper Shiraz' },
  { id: 'chateau-margaux', name: 'Chateau Margaux Bordeaux', category: 'Red Wines', origin: 'International', abv: '13.5%', sub: 'Prestigious French Blend' },

  // 9. LIQUEURS
  // India (5)
  { id: 'desmondji-orange', name: 'DesmondJi Orange Liqueur', category: 'Liqueurs', origin: 'India', abv: '30%', sub: 'Agave Citrus Curacao' },
  { id: 'cabo-coconut', name: 'Cabo Coconut Rum Liqueur', category: 'Liqueurs', origin: 'India', abv: '21%', sub: 'Goan Coconut White Rum' },
  { id: 'wild-tiger-coco', name: 'Wild Tiger Coco Liqueur', category: 'Liqueurs', origin: 'India', abv: '21%', sub: 'Coconut Cream Liqueur' },
  { id: 'somrus-mango', name: 'Somrus Mango Cream Liqueur', category: 'Liqueurs', origin: 'India', abv: '13.5%', sub: 'Mango Cardamom cream' },
  { id: 'somrus-chai', name: 'Somrus Chai Cream Liqueur', category: 'Liqueurs', origin: 'India', abv: '13.5%', sub: 'Spiced Chai Milk cream' },
  // International (5)
  { id: 'baileys-irish-cream', name: 'Baileys Irish Cream', category: 'Liqueurs', origin: 'International', abv: '17%', sub: 'Dairy Cream & Whiskey Liqueur' },
  { id: 'jagermeister', name: 'Jägermeister Liqueur', category: 'Liqueurs', origin: 'International', abv: '35%', sub: 'German Herbal digestif' },
  { id: 'kahlua', name: 'Kahlúa Coffee Liqueur', category: 'Liqueurs', origin: 'International', abv: '20%', sub: 'Mexican Rum & Coffee Liqueur' },
  { id: 'cointreau', name: 'Cointreau Orange Liqueur', category: 'Liqueurs', origin: 'International', abv: '40%', sub: 'Triple Sec Sweet Orange' },
  { id: 'amaretto-disaronno', name: 'Amaretto Disaronno Liqueur', category: 'Liqueurs', origin: 'International', abv: '28%', sub: 'Almond Apricot Liqueur' },

  // 10. MOCKTAILS
  // India (5)
  { id: 'masala-shikanji', name: 'Masala Shikanji Sparkler', category: 'Mocktails', origin: 'India', abv: '0.0%', sub: 'Spiced Lemon Soda' },
  { id: 'jal-jeera', name: 'Jal Jeera Mint Sparkler', category: 'Mocktails', origin: 'India', abv: '0.0%', sub: 'Cumin Mint Refreshment' },
  { id: 'virgin-aam-panna', name: 'Virgin Aam Panna', category: 'Mocktails', origin: 'India', abv: '0.0%', sub: 'Tangy Green Mango Brew' },
  { id: 'kala-khatta-mojito', name: 'Kala Khatta Mojito', category: 'Mocktails', origin: 'India', abv: '0.0%', sub: 'Black Jamun Mint Cooler' },
  { id: 'kokum-sherbet', name: 'Kokum Sherbet Sparkler', category: 'Mocktails', origin: 'India', abv: '0.0%', sub: 'Sweet Tangy Kokum Punch' },
  // International (5)
  { id: 'virgin-mojito', name: 'Virgin Mojito Classic', category: 'Mocktails', origin: 'International', abv: '0.0%', sub: 'Classic Mint Lime Soda' },
  { id: 'shirley-temple', name: 'Shirley Temple Soda', category: 'Mocktails', origin: 'International', abv: '0.0%', sub: 'Sweet Grenadine Ginger Ale' },
  { id: 'virgin-pina-colada', name: 'Virgin Piña Colada', category: 'Mocktails', origin: 'International', abv: '0.0%', sub: 'Pineapple Coconut Shake' },
  { id: 'arnold-palmer', name: 'Arnold Palmer Iced Tea', category: 'Mocktails', origin: 'International', abv: '0.0%', sub: 'Lemonade Iced Tea Blend' },
  { id: 'safe-sex-beach', name: 'Safe Sex on the Beach', category: 'Mocktails', origin: 'International', abv: '0.0%', sub: 'Cranberry Peach Cooler' }
];

// Helper for generating deterministic hashes from strings
function getHashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

// Get initials for branding watermark and badge
function getInitials(name) {
  const clean = name.replace(/(Premium|Classic|Tequila|Vodka|Whiskey|Whisky|Lager|Stout|Agave|Gin|Rum|Wine|Liqueur|Blanc|Shiraz|Cream|Sparkler|Soda|Dry|London|Indian|Int'l|International|Selection)/gi, '').trim();
  const words = clean.split(/\s+/).filter(w => w.length > 0);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  } else if (words.length === 1 && words[0].length >= 2) {
    return words[0].substring(0, 2).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}

// Get liquid color palette based on drink name hash
function getLiquidColor(name, category) {
  const hash = getHashCode(name);
  const colors = {
    amber: { liquid: '#d97706' },
    gold: { liquid: '#f59e0b' },
    ruby: { liquid: '#991b1b' },
    crimson: { liquid: '#dc2626' },
    yellow: { liquid: '#fef08a' },
    lime: { liquid: '#84cc16' },
    clear: { liquid: '#cbd5e1' }, // slate-300
    cream: { liquid: '#fef3c7' }, // amber-100
    brown: { liquid: '#78350f' },
    orange: { liquid: '#ea580c' },
    pink: { liquid: '#db2777' },
    purple: { liquid: '#7c3aed' }
  };

  let options = [];
  switch (category) {
    case 'Single Malt':
    case 'Blended Whiskey':
    case 'Rum':
      options = ['amber', 'gold', 'brown', 'orange'];
      break;
    case 'Beer':
      options = ['gold', 'yellow', 'brown'];
      break;
    case 'Tequila':
    case 'Vodka':
      options = ['clear', 'yellow', 'lime'];
      break;
    case 'Gin':
      options = ['clear', 'pink', 'lime'];
      break;
    case 'White Wines':
      options = ['yellow', 'clear'];
      break;
    case 'Red Wines':
      options = ['ruby', 'crimson'];
      break;
    case 'Liqueurs':
      options = ['brown', 'cream', 'orange', 'amber'];
      break;
    case 'Mocktails':
    default:
      options = ['pink', 'lime', 'orange', 'ruby', 'purple'];
      break;
  }
  const colorKey = options[hash % options.length];
  return colors[colorKey] || colors.clear;
}

// Generate dynamic glass SVG matching drink profile
function generateDrinkSvg(name, category) {
  const liquid = getLiquidColor(name, category);
  const initials = getInitials(name);
  let glassMarkup = '';
  
  switch (category) {
    case 'Single Malt':
    case 'Blended Whiskey':
    case 'Rum':
      // Lowball Glass with ice cubes
      glassMarkup = `
        <path d="M 34 45 L 66 45 L 64 78 C 64 81, 36 81, 36 78 Z" fill="${liquid.liquid}" fill-opacity="0.85" />
        <rect x="42" y="52" width="14" height="14" rx="3" fill="#ffffff" fill-opacity="0.25" transform="rotate(15 49 59)" />
        <rect x="52" y="58" width="12" height="12" rx="2" fill="#ffffff" fill-opacity="0.2" transform="rotate(-10 58 64)" />
        <path d="M 32 30 L 68 30 L 65 80 C 65 84, 35 84, 35 80 Z" fill="none" stroke="#e4e4e7" stroke-width="3" stroke-linejoin="round" />
      `;
      break;
    case 'Beer':
      // Pint Glass with foam
      glassMarkup = `
        <path d="M 35 34 L 65 34 L 60 80 C 60 82, 40 82, 40 80 Z" fill="${liquid.liquid}" fill-opacity="0.85" />
        <path d="M 33 22 C 33 28, 40 31, 50 28 C 60 31, 67 28, 67 22 Z" fill="#ffffff" fill-opacity="0.95" />
        <path d="M 34 22 L 66 22 L 60 82 C 60 84, 40 84, 40 82 Z" fill="none" stroke="#e4e4e7" stroke-width="3" stroke-linejoin="round" />
      `;
      break;
    case 'Tequila':
    case 'Vodka':
      // Shot Glass
      glassMarkup = `
        <path d="M 38 46 L 62 46 L 60 76 C 60 78, 40 78, 40 76 Z" fill="${liquid.liquid}" fill-opacity="0.85" />
        <path d="M 36 32 L 64 32 L 61 78 C 61 81, 39 81, 39 78 Z" fill="none" stroke="#e4e4e7" stroke-width="3" stroke-linejoin="round" />
      `;
      break;
    case 'Gin':
      // Copa Glass with cucumber slice
      glassMarkup = `
        <path d="M 30 32 C 30 52, 70 52, 70 32 Z" fill="${liquid.liquid}" fill-opacity="0.8" />
        <circle cx="38" cy="28" r="8" fill="#4ade80" fill-opacity="0.7" stroke="#166534" stroke-width="1" />
        <path d="M 28 20 C 28 56, 72 56, 72 20 Z" fill="none" stroke="#e4e4e7" stroke-width="3" />
        <line x1="50" y1="55" x2="50" y2="80" stroke="#e4e4e7" stroke-width="3" />
        <ellipse cx="50" cy="80" rx="18" ry="3" fill="none" stroke="#e4e4e7" stroke-width="3" />
      `;
      break;
    case 'White Wines':
    case 'Red Wines':
      // Wine Glass
      glassMarkup = `
        <path d="M 36 34 C 36 50, 64 50, 64 34 Z" fill="${liquid.liquid}" fill-opacity="0.85" />
        <path d="M 34 22 C 34 54, 66 54, 66 22 Z" fill="none" stroke="#e4e4e7" stroke-width="3" />
        <line x1="50" y1="53" x2="50" y2="80" stroke="#e4e4e7" stroke-width="3" />
        <ellipse cx="50" cy="80" rx="16" ry="3" fill="none" stroke="#e4e4e7" stroke-width="3" />
      `;
      break;
    case 'Liqueurs':
      // Snifter
      glassMarkup = `
        <path d="M 30 48 C 28 58, 36 67, 50 67 C 64 67, 72 58, 70 48 Z" fill="${liquid.liquid}" fill-opacity="0.85" />
        <path d="M 38 24 L 35 28 C 25 45, 25 60, 36 68 C 42 72, 58 72, 64 68 C 75 60, 75 45, 65 28 L 62 24 Z" fill="none" stroke="#e4e4e7" stroke-width="3" />
        <line x1="50" y1="70" x2="50" y2="80" stroke="#e4e4e7" stroke-width="3" />
        <ellipse cx="50" cy="80" rx="16" ry="3" fill="none" stroke="#e4e4e7" stroke-width="3" />
      `;
      break;
    case 'Mocktails':
    default:
      // Highball Glass with straw and orange wheel
      glassMarkup = `
        <path d="M 34 32 L 66 32 L 64 82 C 64 84, 36 84, 36 82 Z" fill="${liquid.liquid}" fill-opacity="0.8" />
        <line x1="44" y1="12" x2="60" y2="48" stroke="#fbbf24" stroke-width="2.5" />
        <circle cx="34" cy="30" r="7" fill="#ea580c" fill-opacity="0.8" />
        <path d="M 33 20 L 67 20 L 64 84 C 64 87, 36 87, 36 84 Z" fill="none" stroke="#e4e4e7" stroke-width="3" stroke-linejoin="round" />
      `;
      break;
  }

  // Build full SVG
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <defs>
        <radialGradient id="bgGlow-${initials}-${liquid.liquid.replace('#', '')}" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="${liquid.liquid}" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#09090b" stop-opacity="0" />
        </radialGradient>
      </defs>
      <!-- Background ambient glow -->
      <rect width="100" height="100" fill="url(#bgGlow-${initials}-${liquid.liquid.replace('#', '')})" rx="16" />
      <rect width="98" height="98" x="1" y="1" fill="none" stroke="#27272a" stroke-width="1" stroke-opacity="0.4" rx="15" />
      
      <!-- Monogram watermark in the background -->
      <text x="50" y="55" font-family="'Playfair Display', Georgia, serif" font-size="28" font-weight="900" fill="#3f3f46" fill-opacity="0.3" text-anchor="middle" dominant-baseline="middle">${initials}</text>
      
      <!-- Glass and Liquid -->
      <g transform="translate(0, 5)">
        ${glassMarkup}
      </g>
      
      <!-- Small brand tag at bottom right -->
      <circle cx="80" cy="80" r="11" fill="#09090b" stroke="#3f3f46" stroke-width="1" />
      <text x="80" y="81" font-family="'Inter', sans-serif" font-size="7" font-weight="bold" fill="#fbbf24" text-anchor="middle" dominant-baseline="middle">${initials}</text>
    </svg>
  `;
  
  // Return as Data URL
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

// Helper to expand a compact drink record into a full high-fidelity details card
function expandDrink(item) {
  const image = generateDrinkSvg(item.name, item.category);
  
  // Custom descriptions based on sub-type
  let description = `${item.name} is a premium ${item.origin === 'India' ? 'Indian' : 'International'} ${item.sub} (${item.category.toLowerCase() === 'mocktails' ? 'mocktail' : item.category.toLowerCase()}). `;
  if (item.category === 'Single Malt') {
    description += `Distilled in traditional copper pot stills and aged in oak casks, it presents complex peat, smoke, vanilla, honey, and rich malted barley characteristics with a long, elegant finish.`;
  } else if (item.category === 'Blended Whiskey') {
    description += `An expert blend of premium malt and grain spirits, it delivers a smooth, balanced, and approachable profile of vanilla, caramel, gentle spices, and wood tones.`;
  } else if (item.category === 'Beer') {
    description += `Brewed to perfection, it offers a refreshing, crisp flavor profile with a fine frothy head and smooth malt body, ideal for social lounges.`;
  } else if (item.category === 'Tequila') {
    description += `Crafted from selected agave cores, it features a warm, earthy, and peppery spirit profile, traditionally served chilled.`;
  } else if (item.category === 'Vodka') {
    description += `Distilled multiple times for absolute clarity, it provides a clean, neutral, and velvety palate, serving as a versatile cocktail base.`;
  } else if (item.category === 'Rum') {
    description += `Aged in charred oak barrels, it delivers sweet molasses, dark sugar, wood char, and tropical baking spice notes.`;
  } else if (item.category === 'Gin') {
    description += `Infused with select botanicals like juniper berries, citrus peel, and botanical oils, it boasts a fresh, crisp, and aromatic nose.`;
  } else if (item.category.includes('Wines')) {
    description += `A finely balanced grape wine featuring complex fruit aromas, soft tannins, balanced acidity, and a smooth, elegant finish.`;
  } else if (item.category === 'Liqueurs') {
    description += `A sweetened specialty spirit infused with distinct dairy cream, coffee, or botanical flavors, perfect for sipping or mixology.`;
  } else if (item.category === 'Mocktails') {
    description += `A refreshing, zero-proof mocktail blending sweet fruit notes, sparkling mixers, and fresh herbal garnishes for zero-friction enjoyment.`;
  }

  // Categories ingredients
  let ingredients = ['Select blend', 'Artesian water', 'Natural yeast'];
  if (item.category === 'Single Malt') ingredients = ['Malted barley', 'Spring water', 'Yeast', 'Oak cask maturation'];
  else if (item.category === 'Blended Whiskey') ingredients = ['Malt & grain spirits', 'Filtered water', 'Yeast', 'Charred oak barrels'];
  else if (item.category === 'Beer') ingredients = ['Barley malt', 'Rice flakes/adjuncts', 'Hops', 'Yeast', 'Filtered water'];
  else if (item.category === 'Tequila') ingredients = ['Weber Blue Agave core', 'Water', 'Yeast'];
  else if (item.category === 'Vodka') ingredients = ['Distilled grains/wheat', 'Charcoal filtration', 'Pure water'];
  else if (item.category === 'Rum') ingredients = ['Sugarcane molasses/syrup', 'Yeast', 'Oak cask maturation'];
  else if (item.category === 'Gin') ingredients = ['Juniper berries', 'Botanical peels', 'Neutral grain spirit'];
  else if (item.category.includes('Wines')) ingredients = ['Fermented wine grapes', 'Natural yeasts', 'Sulfite preservatives'];
  else if (item.category === 'Liqueurs') ingredients = ['Sweetened spirits base', 'Natural dairy cream/botanicals', 'Sugar'];
  else if (item.category === 'Mocktails') ingredients = ['Fruit juices', 'Flavored syrups', 'Club soda / Sprite', 'Fresh herbs'];

  // Categories serving styles
  let servingStyle = ['Chilled glass', 'On the Rocks', 'With Soda'];
  if (item.category === 'Single Malt') {
    servingStyle = ['Neat', 'With a Splash of Spring Water', 'Single Large Ice Sphere', 'Tulip Whisky Glass'];
  } else if (item.category === 'Blended Whiskey') {
    servingStyle = item.origin === 'India' 
      ? ['With Coca-Cola / Soda', 'On the Rocks', 'Neat', 'With Warm Water']
      : ['Neat', 'On the Rocks', 'Soda Mixer', 'Highball Style'];
  } else if (item.category === 'Beer') {
    servingStyle = ['Ice-Cold Pint Bottle', 'Chilled Mug', 'Straight from the Tap'];
  } else if (item.category === 'Tequila') {
    servingStyle = ['Neat with lime & salt', 'Margarita Serve', 'On the Rocks'];
  } else if (item.category === 'Vodka') {
    servingStyle = ['Chilled Shot', 'With Tonic and Lemon', 'Moscow Mule style'];
  } else if (item.category === 'Rum') {
    servingStyle = item.origin === 'India'
      ? ['With Coca-Cola / Thums Up', 'With Warm Water', 'On the Rocks']
      : ['With Cola & Lime', 'On the Rocks', 'Neat'];
  } else if (item.category === 'Gin') {
    servingStyle = ['Gin & Tonic with Cucumber', 'Martini', 'Soda splash'];
  } else if (item.category.includes('Wines')) {
    servingStyle = ['Chilled Wine Glass', 'Served at 16°C - 18°C', 'Bordeaux stemware'];
  } else if (item.category === 'Liqueurs') {
    servingStyle = ['On the Rocks', 'Ice-Cold Shot', 'Mixed in Coffee'];
  } else if (item.category === 'Mocktails') {
    servingStyle = ['Tall glass with ice', 'Fresh mint/lime garnish', 'Soda splash'];
  }

  // Generate food pairings
  const pairings = generateDynamicPairings(item.category);

  return {
    id: item.id,
    name: item.name,
    category: item.category,
    image: image,
    abv: item.abv,
    description: description,
    ingredients: ingredients,
    servingStyle: servingStyle,
    pairings: pairings,
    origin: item.origin
  };
}

// Generate region-specific pairings based on category
function generateDynamicPairings(category) {
  const pairings = {
    india: { vegetarian: [], nonVegetarian: [] },
    global: { vegetarian: [], nonVegetarian: [] }
  };

  switch (category) {
    case 'Single Malt':
    case 'Blended Whiskey':
      pairings.india.vegetarian = ['Tandoori Paneer Tikka', 'Spicy cashew nuts', 'Paneer seekh kebabs'];
      pairings.india.nonVegetarian = ['Mutton seekh kebab', 'Chicken tikka skewers', 'Mutton pepper fry'];
      pairings.global.vegetarian = ['Smoked Gouda cheese', 'Dark chocolate blocks', 'Maple glazes'];
      pairings.global.nonVegetarian = ['Glazed bacon strips', 'BBQ wings', 'Seared lamb chops'];
      break;
    case 'Beer':
      pairings.india.vegetarian = ['Masala peanut chaat', 'Paneer pakora with chutney', 'Loaded masala fries'];
      pairings.india.nonVegetarian = ['Amritsari fish tikka', 'Tandoori chicken wings', 'Chili chicken dry'];
      pairings.global.vegetarian = ['Guacamole and chips', 'French fries with cheese', 'Jalapeno poppers'];
      pairings.global.nonVegetarian = ['Buffalo chicken wings', 'Fish & chips', 'Beef sliders'];
      break;
    case 'Tequila':
      pairings.india.vegetarian = ['Chili paneer dry', 'Corn cheese balls', 'Paneer tikka roll'];
      pairings.india.nonVegetarian = ['Tandoori fish', 'Chili chicken', 'Garlic butter prawns'];
      pairings.global.vegetarian = ['Nachos with cheese', 'Guacamole dip', 'Chipotle corn flatbread'];
      pairings.global.nonVegetarian = ['Pork tacos', 'Shrimp skewers', 'BBQ wings'];
      break;
    case 'White Wines':
    case 'Red Wines':
      pairings.india.vegetarian = ['Malai paneer tikka', 'Smoked cheese platter', 'Veg seekh kebab'];
      pairings.india.nonVegetarian = ['Chicken tikka', 'Mutton seekh rolls', 'Fish tikka'];
      pairings.global.vegetarian = ['Creamy Brie cheese', 'Goat cheese crostini', 'Truffle fries'];
      pairings.global.nonVegetarian = ['Prime ribeye steak', 'Pan-seared scallops', 'Roasted duck'];
      break;
    case 'Mocktails':
    case 'Vodka':
    case 'Rum':
    case 'Gin':
    default:
      pairings.india.vegetarian = ['Veg spring rolls', 'Paneer pakora', 'Peanut chaat'];
      pairings.india.nonVegetarian = ['Chicken nuggets', 'Fish fingers', 'Chicken seekh rolls'];
      pairings.global.vegetarian = ['Cucumber sandwiches', 'Hummus and pita', 'Sweet potato fries'];
      pairings.global.nonVegetarian = ['Fried shrimp', 'Chicken sliders', 'Chicken wings'];
      break;
  }

  return pairings;
}

// Generate the fully expanded database of 100 drinks
const DRINKS_DB = COMPACT_DRINKS.map(item => expandDrink(item));

// App State Management
let selectedDrink = null;
let currentFocusIndex = -1;
let filteredList = [];

// DOM Element Selectors
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const autocompleteDropdown = document.getElementById('autocomplete-dropdown');
const resultsContainer = document.getElementById('results-container');
const placeholderContainer = document.getElementById('placeholder-container');
const categoryFilters = document.getElementById('category-filters');

// Initial Setup
window.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  renderCategoryFilters();
  
  // Load last viewed drink from LocalStorage or URL hash
  const hash = window.location.hash.substring(1);
  const lastViewedId = hash ? decodeURIComponent(hash) : localStorage.getItem('whats-your-poison-last-viewed');
  
  if (lastViewedId) {
    const drink = DRINKS_DB.find(d => d.id === lastViewedId);
    if (drink) {
      showDrinkDetails(drink, false);
    } else {
      triggerSearch(lastViewedId);
    }
  } else {
    showPlaceholder();
  }
});

// Setup Event Listeners
function setupEventListeners() {
  searchInput.addEventListener('input', handleSearchInput);
  
  searchBtn.addEventListener('click', () => {
    triggerSearch(searchInput.value.trim());
  });

  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchBtn.contains(e.target) && !autocompleteDropdown.contains(e.target)) {
      closeDropdown();
    }
  });

  searchInput.addEventListener('keydown', handleKeyboardNavigation);
}

// Render Drink Category Quick Filters
function renderCategoryFilters() {
  const categories = ['All', 'Single Malt', 'Blended Whiskey', 'Beer', 'Tequila', 'Vodka', 'Rum', 'Gin', 'White Wines', 'Red Wines', 'Liqueurs', 'Mocktails'];
  categoryFilters.innerHTML = '';
  
  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'px-4 py-2 text-sm font-medium rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-amber-500 hover:border-amber-500/50 transition-all duration-300 whitespace-nowrap active:scale-95';
    btn.textContent = cat;
    
    btn.addEventListener('click', () => {
      searchInput.value = '';
      closeDropdown();
      
      Array.from(categoryFilters.children).forEach(b => {
        b.classList.remove('bg-amber-500', 'text-zinc-950', 'border-amber-500');
        b.classList.add('bg-zinc-900', 'text-zinc-400', 'border-zinc-800');
      });
      btn.classList.remove('bg-zinc-900', 'text-zinc-400', 'border-zinc-800');
      btn.classList.add('bg-amber-500', 'text-zinc-950', 'border-amber-500');
      
      filterByCategory(cat);
    });
    
    categoryFilters.appendChild(btn);
  });
}

// Filter drinks by category in main view
function filterByCategory(category) {
  if (category === 'All') {
    showPlaceholder();
    return;
  }
  
  const matches = DRINKS_DB.filter(d => d.category.toLowerCase() === category.toLowerCase());
  
  if (matches.length > 0) {
    resultsContainer.classList.add('hidden');
    placeholderContainer.classList.remove('hidden');
    
    placeholderContainer.innerHTML = `
      <div class="space-y-6 animate-fade-in">
        <h2 class="text-2xl font-semibold font-playfair text-amber-500 border-b border-zinc-800 pb-2">Premium ${category} Selection</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          ${matches.map(drink => `
            <div onclick="selectDrinkById('${drink.id}')" class="flex items-center justify-between p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-amber-500/50 hover:bg-zinc-900 transition-all duration-300 cursor-pointer group">
              <div class="flex items-center gap-4">
                <img src="${drink.image}" alt="${drink.name}" class="w-14 h-14 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300" />
                <div>
                  <h3 class="font-semibold text-zinc-100 group-hover:text-amber-500 transition-colors text-sm">${drink.name}</h3>
                  <div class="flex items-center gap-2 mt-1">
                    <span class="text-[10px] text-zinc-400 font-medium">${drink.origin === 'India' ? '🇮🇳 Indian' : '🌐 International'}</span>
                    <span class="text-[10px] text-zinc-500">&bull;</span>
                    <span class="text-[10px] text-zinc-500">ABV: ${drink.abv}</span>
                  </div>
                </div>
              </div>
              <svg class="w-4 h-4 text-zinc-500 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
}

// Search and Filter Autocomplete List
function handleSearchInput() {
  const query = searchInput.value.trim().toLowerCase();
  
  if (!query) {
    closeDropdown();
    return;
  }
  
  filteredList = DRINKS_DB.filter(drink => 
    drink.name.toLowerCase().includes(query) || 
    drink.category.toLowerCase().includes(query)
  );
  
  renderDropdown(filteredList);
}

// Render Dropdown List
function renderDropdown(list) {
  autocompleteDropdown.innerHTML = '';
  currentFocusIndex = -1;
  
  if (list.length === 0) {
    const query = searchInput.value.trim();
    autocompleteDropdown.innerHTML = `
      <div onclick="triggerSearch('${query}')" class="px-4 py-3 text-sm text-amber-500 hover:bg-zinc-900 cursor-pointer flex items-center justify-between">
        <span>Search web for "<strong>${query}</strong>"</span>
        <svg class="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
        </svg>
      </div>
    `;
    autocompleteDropdown.classList.remove('hidden');
    return;
  }
  
  list.forEach((drink, index) => {
    const item = document.createElement('div');
    item.className = 'flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors duration-200 hover:bg-zinc-900 border-b border-zinc-900 last:border-0';
    item.dataset.index = index;
    item.dataset.id = drink.id;
    
    item.innerHTML = `
      <img src="${drink.image}" alt="${drink.name}" class="w-8 h-8 object-cover rounded-md" />
      <div>
        <div class="text-sm font-semibold text-zinc-100">${drink.name}</div>
        <div class="text-xs text-zinc-500">${drink.category} &bull; ${drink.origin === 'India' ? '🇮🇳 India' : '🌐 Int\'l'} &bull; ABV ${drink.abv}</div>
      </div>
    `;
    
    item.addEventListener('click', () => {
      showDrinkDetails(drink);
      closeDropdown();
    });
    
    autocompleteDropdown.appendChild(item);
  });
  
  autocompleteDropdown.classList.remove('hidden');
}

// Close Dropdown
function closeDropdown() {
  autocompleteDropdown.classList.add('hidden');
  currentFocusIndex = -1;
}

// Keyboard navigation (Arrow Keys & Enter)
function handleKeyboardNavigation(e) {
  const items = autocompleteDropdown.querySelectorAll('[data-index]');
  
  if (e.key === 'Enter') {
    e.preventDefault();
    if (!autocompleteDropdown.classList.contains('hidden') && currentFocusIndex > -1 && items.length > 0) {
      const selectedId = items[currentFocusIndex].dataset.id;
      const drink = DRINKS_DB.find(d => d.id === selectedId);
      if (drink) {
        showDrinkDetails(drink);
      }
      closeDropdown();
    } else {
      triggerSearch(searchInput.value.trim());
      closeDropdown();
    }
    return;
  }
  
  if (autocompleteDropdown.classList.contains('hidden') || items.length === 0) return;
  
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    currentFocusIndex = (currentFocusIndex + 1) % items.length;
    highlightItem(items);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    currentFocusIndex = (currentFocusIndex - 1 + items.length) % items.length;
    highlightItem(items);
  } else if (e.key === 'Escape') {
    closeDropdown();
  }
}

// Highlight Item in Dropdown
function highlightItem(items) {
  items.forEach(item => {
    item.classList.remove('bg-zinc-800');
  });
  
  if (currentFocusIndex > -1) {
    const target = items[currentFocusIndex];
    target.classList.add('bg-zinc-800');
    target.scrollIntoView({ block: 'nearest' });
  }
}

// Trigger search helper
function triggerSearch(query) {
  if (!query) return;
  closeDropdown();
  
  const cleanQuery = query.toLowerCase();
  const localMatch = DRINKS_DB.find(d => d.name.toLowerCase() === cleanQuery || d.id === cleanQuery) ||
                     DRINKS_DB.find(d => d.name.toLowerCase().includes(cleanQuery));
                     
  if (localMatch) {
    showDrinkDetails(localMatch);
  } else {
    executeWebSearch(query);
  }
}

// Execute DuckDuckGo Web Search Fallback
function executeWebSearch(query) {
  placeholderContainer.classList.add('hidden');
  resultsContainer.classList.remove('hidden');
  
  resultsContainer.innerHTML = `
    <div class="flex flex-col items-center justify-center py-20 text-center space-y-4 animate-pulse">
      <div class="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      <p class="text-sm font-medium text-amber-500 tracking-wider">Searching the web for "${query}"...</p>
      <p class="text-xs text-zinc-500 max-w-xs">Fetching description, alcohol stats, and perfect pairings from DuckDuckGo.</p>
    </div>
  `;

  let searchQuery = query;
  const cleanQuery = query.toLowerCase();
  
  const whiskeyKeywords = ['whiskey', 'whisky', 'whisey', 'whsky', 'whisk', 'scotch', 'bourbon', 'rye', 'single malt', 'red label', 'black label', 'blue label', 'gold label', 'double black', 'johnnie walker', 'jack daniel', 'jameson', 'glenfiddich', 'glenlivet', 'macallan', 'jim beam', 'maker\'s mark', 'bulleit', 'woodford', 'teacher\'s', 'dewar', 'talisker', 'amrut', 'paul john', 'royal stag', 'ballantine', 'chivas'];
  const beerKeywords = ['beer', 'lager', 'ale', 'ipa', 'stout', 'pilsner', 'brew', 'corona', 'heineken', 'budweiser', 'kingfisher', 'bira', 'guinness', 'hoegaarden', 'carlsberg', 'stella', 'tuborg', 'haywards', 'bud light', 'miller', 'coors'];
  const tequilaKeywords = ['tequila', 'mezcal', 'mezcl', 'reposado', 'blanco', 'anejo', 'patron', 'don julio', 'jose cuervo', '1800', 'sauza', 'casamigos'];
  const vodkaKeywords = ['vodka', 'grey goose', 'absolut', 'smirnoff', 'magic moments', 'belvedere', 'ketel one', 'ciroc', 'tito'];
  const rumKeywords = ['rum', 'old monk', 'bacardi', 'captain morgan', 'havana club', 'malibu', 'kraken', 'zacapa'];
  const ginKeywords = ['gin', 'juniper', 'hendrick', 'bombay', 'sapphire', 'tanqueray', 'beefeater', 'blue riband', 'gordon'];
  const mocktailKeywords = ['mocktail', 'virgin', 'non-alcoholic', 'shirley temple', '0.0%', 'zero alcohol', 'no-alcohol', 'soft drink', 'lemonade', 'tonic water', 'ginger ale'];

  const hasAlcoholContext = ['beer', 'lager', 'ale', 'ipa', 'stout', 'pilsner', 'whiskey', 'whisky', 'scotch', 'bourbon', 'rye', 'vodka', 'rum', 'gin', 'tequila', 'mezcal', 'drink', 'beverage', 'alcohol', 'liquor', 'cocktail', 'mocktail'].some(w => cleanQuery.includes(w));

  if (!hasAlcoholContext) {
    if (whiskeyKeywords.some(kw => cleanQuery.includes(kw))) {
      searchQuery += ' whiskey';
    } else if (beerKeywords.some(kw => cleanQuery.includes(kw))) {
      searchQuery += ' beer';
    } else if (tequilaKeywords.some(kw => cleanQuery.includes(kw))) {
      searchQuery += ' tequila';
    } else if (vodkaKeywords.some(kw => cleanQuery.includes(kw))) {
      searchQuery += ' vodka';
    } else if (rumKeywords.some(kw => cleanQuery.includes(kw))) {
      searchQuery += ' rum';
    } else if (ginKeywords.some(kw => cleanQuery.includes(kw))) {
      searchQuery += ' gin';
    } else if (mocktailKeywords.some(kw => cleanQuery.includes(kw))) {
      searchQuery += ' drink';
    }
  }

  const targetUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(searchQuery)}&format=json&no_html=1&skip_disambig=1`;
  const corsProxyUrl = `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`;
  
  fetch(targetUrl)
    .then(res => {
      if (!res.ok) throw new Error('Direct fetch failed');
      return res.json();
    })
    .catch(() => {
      console.log('Direct fetch blocked by CORS, trying CORS proxy...');
      return fetch(corsProxyUrl).then(res => res.json());
    })
    .then(data => {
      let title = query;
      let description = `A premium drink search query: ${query}. We found references to this beverage, perfect for serving cold or mixology options.`;
      
      if (data.Heading) title = data.Heading;
      if (data.AbstractText) {
        description = data.AbstractText;
      } else if (data.RelatedTopics && data.RelatedTopics.length > 0 && data.RelatedTopics[0].Text) {
        description = data.RelatedTopics[0].Text;
      }
      
      const drinkData = classifyDrink(query, title, description);
      DRINKS_DB.push(drinkData);
      showDrinkDetails(drinkData);
    })
    .catch(err => {
      console.error('Web search failed, generating local fallback', err);
      const fallbackDrink = classifyDrink(query, query, `A custom blended beverage matching ${query}. Available across leading lounge locations.`);
      DRINKS_DB.push(fallbackDrink);
      showDrinkDetails(fallbackDrink);
    });
}

// Client-side Drink Classifier & Details Generator
function classifyDrink(query, heading, abstract) {
  const text = (query + ' ' + heading + ' ' + abstract).toLowerCase();
  
  const whiskeyKeywords = ['whiskey', 'whisky', 'whisey', 'whsky', 'whisk', 'scotch', 'bourbon', 'rye', 'single malt', 'red label', 'black label', 'blue label', 'gold label', 'double black', 'johnnie walker', 'jack daniel', 'jameson', 'glenfiddich', 'glenlivet', 'macallan', 'jim beam', 'maker\'s mark', 'bulleit', 'woodford', 'teacher\'s', 'dewar', 'talisker', 'amrut', 'paul john', 'royal stag', 'ballantine', 'chivas'];
  const beerKeywords = ['beer', 'lager', 'ale', 'ipa', 'stout', 'pilsner', 'brew', 'corona', 'heineken', 'budweiser', 'kingfisher', 'bira', 'guinness', 'hoegaarden', 'carlsberg', 'stella', 'tuborg', 'haywards', 'bud light', 'miller', 'coors'];
  const tequilaKeywords = ['tequila', 'mezcal', 'mezcl', 'reposado', 'blanco', 'anejo', 'patron', 'don julio', 'jose cuervo', '1800', 'sauza', 'casamigos'];
  const vodkaKeywords = ['vodka', 'grey goose', 'absolut', 'smirnoff', 'magic moments', 'belvedere', 'ketel one', 'ciroc', 'tito'];
  const rumKeywords = ['rum', 'old monk', 'bacardi', 'captain morgan', 'havana club', 'malibu', 'kraken', 'zacapa'];
  const ginKeywords = ['gin', 'juniper', 'hendrick', 'bombay', 'sapphire', 'tanqueray', 'beefeater', 'blue riband', 'gordon'];
  const mocktailKeywords = ['mocktail', 'virgin', 'non-alcoholic', 'shirley temple', '0.0%', 'zero alcohol', 'no-alcohol', 'soft drink', 'lemonade', 'tonic water', 'ginger ale'];

  let category = 'Cocktail';
  let image = 'images/cocktail.png';
  let abv = '12% - 15%';
  let servingStyle = ['Chilled glass', 'On the Rocks', 'With Soda'];

  const matches = (keywords) => keywords.some(kw => text.includes(kw));

  if (matches(whiskeyKeywords)) {
    category = text.includes('single malt') || text.includes('malt') ? 'Single Malt' : 'Blended Whiskey';
    abv = '40% - 46%';
    servingStyle = ['Neat', 'On the Rocks', 'With a Splash of Water', 'With Club Soda'];
  } else if (matches(beerKeywords)) {
    category = 'Beer';
    image = 'images/beer.png';
    abv = '4.5% - 7%';
    servingStyle = ['Ice-Cold Mug', 'Tulip Glass', 'Chilled Bottle'];
  } else if (matches(tequilaKeywords)) {
    category = 'Tequila';
    image = 'images/tequila.png';
    abv = '38% - 40%';
    servingStyle = ['Neat with Lime & Salt', 'Margarita Serve', 'On the Rocks'];
  } else if (matches(vodkaKeywords)) {
    category = 'Vodka';
    image = 'images/cocktail.png';
    abv = '37.5% - 40%';
    servingStyle = ['Chilled Shot', 'With Tonic and Lemon', 'Moscow Mule mix'];
  } else if (matches(rumKeywords)) {
    category = 'Rum';
    image = 'images/whiskey.png';
    abv = '37.5% - 43%';
    servingStyle = ['With Coca-Cola & Lime', 'On the Rocks', 'Neat'];
  } else if (matches(ginKeywords)) {
    category = 'Gin';
    image = 'images/cocktail.png';
    abv = '40% - 47%';
    servingStyle = ['Gin & Tonic with Cucumber', 'Martini', 'With Grapefruit Soda'];
  } else if (matches(mocktailKeywords)) {
    category = 'Mocktails';
    image = 'images/mocktail.png';
    abv = '0.0%';
    servingStyle = ['Chilled Highball glass', 'Crushed ice and mint garnish', 'With fruit slice'];
  }
  
  const abvPatterns = [
    /(\d+(?:\.\d+)?%)\s*(?:abv|alcohol|by\s+volume)?/i,
    /(?:abv|alcohol\s+by\s+volume|alcohol)\s*(?:of|is)?\s*(\d+(?:\.\d+)?%)/i,
    /(\d+(?:\.\d+)?)\s*(?:percent|%)\s*(?:abv|alcohol|by\s+volume)/i
  ];
  
  for (const pat of abvPatterns) {
    const match = abstract.match(pat);
    if (match) {
      abv = match[1];
      if (!abv.includes('%')) abv += '%';
      break;
    }
  }
  
  let ingredients = ['Distilled essence', 'Natural flavorings', 'Chilled water'];
  if (category === 'Single Malt') ingredients = ['Malted barley', 'Spring water', 'Yeast', 'Oak cask maturation'];
  else if (category === 'Blended Whiskey') ingredients = ['Malt & grain spirits', 'Filtered water', 'Yeast', 'Charred oak barrels'];
  else if (category === 'Beer') ingredients = ['Malted barley', 'Hops', 'Yeast', 'Filtered water'];
  else if (category === 'Tequila') ingredients = ['Blue Weber Agave core', 'Yeast', 'Spring water'];
  else if (category === 'Vodka') ingredients = ['Distilled grains/potatoes', 'Charcoal filtration', 'Pure water'];
  else if (category === 'Rum') ingredients = ['Sugarcane molasses', 'Oak aging vats', 'Caramel colors'];
  else if (category === 'Gin') ingredients = ['Juniper berries', 'Botanical peel blend', 'Neutral grain spirit'];
  else if (category === 'Mocktails') ingredients = ['Fruit juice concentrates', 'Flavored syrups', 'Club soda / Tonic'];

  const pairings = generateDynamicPairings(category);

  return {
    id: heading.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    name: heading,
    category: category,
    image: generateDrinkSvg(heading, category),
    abv: abv,
    description: abstract,
    ingredients: ingredients,
    servingStyle: servingStyle,
    pairings: pairings,
    isWebResult: true,
    origin: 'International' // web search default
  };
}

// Globals exposed function to link clicks inside list
window.selectDrinkById = function(id) {
  const drink = DRINKS_DB.find(d => d.id === id);
  if (drink) {
    showDrinkDetails(drink);
  }
};

// Render Detailed Drink Card
function showDrinkDetails(drink, focusInput = true) {
  selectedDrink = drink;
  
  localStorage.setItem('whats-your-poison-last-viewed', drink.id);
  window.location.hash = encodeURIComponent(drink.id);
  
  if (focusInput) {
    searchInput.value = drink.name;
  }
  
  placeholderContainer.classList.add('hidden');
  resultsContainer.classList.remove('hidden');
  resultsContainer.classList.add('opacity-0', 'translate-y-4');
  
  resultsContainer.innerHTML = `
    <div class="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 flex flex-col lg:flex-row">
      
      <!-- Left Column: Image banner, title, profile summary, ingredients, and servings -->
      <div class="w-full lg:w-1/2 flex flex-col border-b lg:border-b-0 lg:border-r border-zinc-800/80">
        
        <!-- Top banner image representation -->
        <div class="relative min-h-[300px] w-full overflow-hidden bg-zinc-950 flex flex-col justify-end p-6 sm:p-8">
          <div class="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent z-10"></div>
          
          <!-- Web result or origin badge -->
          <div class="absolute top-4 right-4 flex gap-1.5 flex-wrap z-20">
            <span class="px-2 py-1 text-[9px] font-bold uppercase tracking-wider rounded bg-zinc-950/80 border border-zinc-800 text-zinc-300 backdrop-blur-md">
              ${drink.origin === 'India' ? '🇮🇳 Crafted in India' : '🌐 International'}
            </span>
            ${drink.isWebResult ? `
              <div class="px-2 py-1 text-[9px] font-bold uppercase tracking-wider rounded bg-zinc-950/80 border border-amber-500/30 text-amber-500 flex items-center gap-1.5 backdrop-blur-md">
                <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
                Web Result
              </div>
            ` : ''}
          </div>

          <!-- Text and Floating Icon overlay details -->
          <div class="relative z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-6 mt-12 sm:mt-0">
            <div class="space-y-3 flex-grow max-w-xl text-left">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-amber-500/20 text-amber-500 border border-amber-500/30">${drink.category}</span>
                <span class="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-zinc-900 text-zinc-300 border border-zinc-800">${drink.abv} ABV</span>
              </div>
              <h2 class="text-3xl sm:text-4xl font-bold font-playfair text-zinc-100">${drink.name}</h2>
              <p class="text-zinc-300 text-sm leading-relaxed font-inter">${drink.description}</p>
            </div>
            
            <!-- Floating dynamic SVG icon -->
            <div class="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 mx-auto sm:mx-0 bg-zinc-900/50 rounded-2xl border border-zinc-800 p-2 shadow-2xl backdrop-blur-sm self-center sm:self-end">
              <img src="${drink.image}" alt="${drink.name}" class="w-full h-full object-contain" />
            </div>
          </div>
        </div>

        <!-- Left details padding container -->
        <div class="p-6 sm:p-8 space-y-6 flex-grow flex flex-col justify-start">
          
          <!-- Ingredients list -->
          <div>
            <h3 class="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3 font-playfair">Key Ingredients / Elements</h3>
            <div class="flex flex-wrap gap-2">
              ${drink.ingredients.map(ing => `
                <span class="px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  ${ing}
                </span>
              `).join('')}
            </div>
          </div>

          <!-- How to drink it -->
          <div>
            <h3 class="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3 font-playfair">Best Serving Variations</h3>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
              ${drink.servingStyle.map(style => `
                <div class="bg-zinc-950 border border-zinc-800/80 rounded-xl p-3 text-center flex flex-col justify-center items-center hover:border-amber-500/30 transition-colors">
                  <svg class="w-6 h-6 text-amber-500/80 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"></path>
                  </svg>
                  <span class="text-xs font-medium text-zinc-200">${style}</span>
                </div>
              `).join('')}
            </div>
          </div>

        </div>
      </div>

      <!-- Right Column: Curated Food Pairings -->
      <div class="w-full lg:w-1/2 p-6 sm:p-8 flex flex-col justify-start">
        <h3 class="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-4 font-playfair">Curated Food Pairings</h3>
        
        <div class="space-y-6 flex-grow flex flex-col justify-between">
          
          <!-- 1. Indian Pairings Section -->
          <div class="border border-zinc-850 rounded-xl p-4 bg-zinc-950/40 flex-grow">
            <div class="text-xs font-bold text-amber-500 uppercase tracking-widest mb-3 flex items-center gap-1.5 font-playfair">
              <span class="inline-block w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              🇮🇳 Local Indian Pairings
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <!-- Veg -->
              <div class="bg-emerald-950/10 border border-emerald-900/10 rounded-lg p-3">
                <span class="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-2 font-playfair">Vegetarian</span>
                <ul class="space-y-1 text-xs text-zinc-300">
                  ${drink.pairings.india.vegetarian.map(food => `<li class="flex items-center gap-1.5"><span class="text-emerald-500">•</span> ${food}</li>`).join('')}
                </ul>
              </div>
              <!-- Non-Veg -->
              <div class="bg-red-950/10 border border-red-900/10 rounded-lg p-3">
                <span class="text-xs font-bold text-red-400 uppercase tracking-wider block mb-2 font-playfair">Non-Vegetarian</span>
                <ul class="space-y-1 text-xs text-zinc-300">
                  ${drink.pairings.india.nonVegetarian.map(food => `<li class="flex items-center gap-1.5"><span class="text-red-500">•</span> ${food}</li>`).join('')}
                </ul>
              </div>
            </div>
          </div>

          <!-- 2. Global Pairings Section -->
          <div class="border border-zinc-850 rounded-xl p-4 bg-zinc-950/40 flex-grow mt-2">
            <div class="text-xs font-bold text-amber-500/80 uppercase tracking-widest mb-3 flex items-center gap-1.5 font-playfair">
              <span class="inline-block w-1.5 h-1.5 rounded-full bg-amber-500/60"></span>
              🌐 Global Lounge Pairings
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <!-- Veg -->
              <div class="bg-emerald-950/10 border border-emerald-900/10 rounded-lg p-3">
                <span class="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-2 font-playfair">Vegetarian</span>
                <ul class="space-y-1 text-xs text-zinc-300">
                  ${drink.pairings.global.vegetarian.map(food => `<li class="flex items-center gap-1.5"><span class="text-emerald-500">•</span> ${food}</li>`).join('')}
                </ul>
              </div>
              <!-- Non-Veg -->
              <div class="bg-red-950/10 border border-red-900/10 rounded-lg p-3">
                <span class="text-xs font-bold text-red-400 uppercase tracking-wider block mb-2 font-playfair">Non-Vegetarian</span>
                <ul class="space-y-1 text-xs text-zinc-300">
                  ${drink.pairings.global.nonVegetarian.map(food => `<li class="flex items-center gap-1.5"><span class="text-red-500">•</span> ${food}</li>`).join('')}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  `;
  
  setTimeout(() => {
    resultsContainer.classList.remove('opacity-0', 'translate-y-4');
  }, 50);
}

// Show Placeholder Main View (Categorized dashboard showcasing Indian vs. International pairings)
function showPlaceholder() {
  selectedDrink = null;
  resultsContainer.classList.add('hidden');
  placeholderContainer.classList.remove('hidden');
  
  const categories = [
    { name: 'Single Malt', title: '🥃 Single Malts' },
    { name: 'Blended Whiskey', title: '🥃 Blended Whiskeys' },
    { name: 'Beer', title: '🍺 Chilled Beers' },
    { name: 'Tequila', title: '🍸 Tequila & Agave' },
    { name: 'Vodka', title: '🍸 Premium Vodkas' },
    { name: 'Rum', title: '🥃 Oak-Aged Rums' },
    { name: 'Gin', title: '🌿 Botanical Gins' },
    { name: 'White Wines', title: '🥂 Crisp White Wines' },
    { name: 'Red Wines', title: '🍷 Bold Red Wines' },
    { name: 'Liqueurs', title: '🍹 Sweet Liqueurs' },
    { name: 'Mocktails', title: '🥤 Zero-Proof Mocktails' }
  ];

  placeholderContainer.innerHTML = `
    <div class="space-y-8 animate-fade-in text-left">
      <div>
        <h2 class="text-2xl sm:text-3xl font-bold font-playfair text-zinc-100 mb-2">Welcome to the Lounge</h2>
        <p class="text-sm sm:text-base text-zinc-400 font-inter">Explore our extensive database of 110 premium drinks. Under each category below, you'll find the top 10 selections—consisting of 5 local Indian craft choices and 5 international favorites. Select any drink to view its detail card, ABV stats, and curated food pairings.</p>
      </div>

      <div class="space-y-6">
        ${categories.map(cat => {
          const categoryDrinks = DRINKS_DB.filter(d => d.category === cat.name);
          const indianDrinks = categoryDrinks.filter(d => d.origin === 'India');
          const internationalDrinks = categoryDrinks.filter(d => d.origin === 'International');
          
          return `
            <div class="space-y-4 bg-zinc-900/20 border border-zinc-900 rounded-2xl p-5 backdrop-blur-sm">
              <h3 class="text-sm font-bold uppercase tracking-wider text-amber-500 border-b border-zinc-900 pb-2.5 flex items-center justify-between font-playfair">
                <span>${cat.title}</span>
                <span class="text-[10px] font-normal font-inter text-zinc-500 lowercase italic">(10 premium selections)</span>
              </h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <!-- Indian Selection (5) -->
                <div class="space-y-2">
                  <div class="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5 mb-1.5 font-playfair">
                    <span class="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    🇮🇳 Indian Selection
                  </div>
                  <div class="space-y-2">
                    ${indianDrinks.map(drink => `
                      <div onclick="selectDrinkById('${drink.id}')" class="flex items-center justify-between p-2.5 rounded-xl bg-zinc-950/40 border border-zinc-900 hover:border-amber-500/50 hover:bg-zinc-900/60 transition-all duration-300 cursor-pointer group">
                        <div class="flex items-center gap-3 min-w-0">
                          <img src="${drink.image}" alt="${drink.name}" class="w-8 h-8 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300 flex-shrink-0" />
                          <div class="min-w-0">
                            <h4 class="font-semibold text-zinc-200 group-hover:text-amber-500 transition-colors text-xs truncate font-playfair">${drink.name}</h4>
                            <p class="text-[9px] text-zinc-500 truncate mt-0.5">${drink.abv} ABV &bull; ${drink.sub}</p>
                          </div>
                        </div>
                        <svg class="w-3.5 h-3.5 text-zinc-650 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                      </div>
                    `).join('')}
                  </div>
                </div>

                <!-- International Selection (5) -->
                <div class="space-y-2">
                  <div class="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5 mb-1.5 font-playfair">
                    <span class="inline-block w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    🌐 International Selection
                  </div>
                  <div class="space-y-2">
                    ${internationalDrinks.map(drink => `
                      <div onclick="selectDrinkById('${drink.id}')" class="flex items-center justify-between p-2.5 rounded-xl bg-zinc-950/40 border border-zinc-900 hover:border-amber-500/50 hover:bg-zinc-900/60 transition-all duration-300 cursor-pointer group">
                        <div class="flex items-center gap-3 min-w-0">
                          <img src="${drink.image}" alt="${drink.name}" class="w-8 h-8 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300 flex-shrink-0" />
                          <div class="min-w-0">
                            <h4 class="font-semibold text-zinc-200 group-hover:text-amber-500 transition-colors text-xs truncate font-playfair">${drink.name}</h4>
                            <p class="text-[9px] text-zinc-500 truncate mt-0.5">${drink.abv} ABV &bull; ${drink.sub}</p>
                          </div>
                        </div>
                        <svg class="w-3.5 h-3.5 text-zinc-650 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                      </div>
                    `).join('')}
                  </div>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}
