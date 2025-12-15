export const TITLES = {
  LISTING_ANALYZER_LITE: "Listing Analyzer (Free) - KwickMetrics",
  LISTING_ANALYZER_FREE: "Listing Analyzer(Free)",
  KT_EMPTY_STATE_TITLE: "Start tracking your product's keyword rankings",
};

export const MARKETPLACES = [
  { name: "United States", channel: "amazon.com" },
  { name: "Canada", channel: "amazon.ca" },
  { name: "Mexico", channel: "amazon.com.mx" },
  { name: "United Kingdom", channel: "amazon.co.uk" },
  { name: "Germany", channel: "amazon.de" },
  { name: "France", channel: "amazon.fr" },
  { name: "Spain", channel: "amazon.es" },
  { name: "Italy", channel: "amazon.it" },
  { name: "Sweden", channel: "amazon.se" },
  { name: "India", channel: "amazon.in" },
];

export const DEFAULT_MARKETPLACE = {
  NAME: "United States",
  CHANNEL: "amazon.com",
};

export const STATUS = {
  IDLE: "idle",
  YET_TO_START: "yet_to_start",
  COMPLETED: "completed",
  FAILED: "Failed",
};

export const ERROR_MESSAGES = {
  EMPTY_PRODUCT_LINK: "Please enter a product link or ASIN",
};
