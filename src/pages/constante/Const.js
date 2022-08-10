export const APPKEY = process.env.REACT_APP_APP_KEY;

export const URL_LOGIN = "/authentications";

export const BASE_URL_SOLDE = "/balances";

export const BASE_URL_REFRESH_STATUS = "https://support-api.hub2.io/transfers";

export const BASE_URL_REFRESH_STATUS_WITH_PARAMS_1 = BASE_URL_REFRESH_STATUS + "?from=";

export const BASE_URL_MOOV_BALANCE = "/balances/";

export const BASE_URL_STATS = "/stats";
export const BASE_URL_COLLECTION_STATS = "/stats/merchant-collection";

export const BASE_URL_REFRESH_STATUS_WITH_PARAMS_2 = "&isForceStatus=" + false + "&merchantId=" + "&status=pending" + "&to="

export const BASE_URL_MERCHANT_BALANCE = "/balances/merchant-transfer";

export const BASE_URL_MERCHANT_COLLECTION_BALANCE = "/balances/merchant-collection";

export const POWER_SLIDE_FIRST_URL = "https://app.powerslide.io/api/job/getToken/9e6db3e2-ddad-4c22-b02a-fd90187813b6";

export const POWER_SLIDE_FIRST_APIID = "40eaaa41-8852-4bda-9871-db74e8102acf";

export const POWER_SLIDE_FIRST_TOKEN = "ad5077b8263a27317eeaf11972f8ae79b35ffbf0aaedcd617eab72daf397bd45fcc4937e0055cc4e31f2044b7f105674";

export const POWER_SLIDE_ACCES_SLIDE_URL = "https://app.powerslide.io/graphql";

export const HISTORY_MERHCANT_BALANCE_COLLECTION= "/balances/merchant-cached";

export const HISTORY_MERHCANT_BALANCE_TRANSFER= "/balances/merchant-cached";

export const HISTORY_PROVIDER_BALANCE_TRANSFER= "/balances/provider-cached";

export const HISTORY_MERHCANT_BALANCE_COLLECTION_PARAMS = "collection";

export const HISTORY_MERHCANT_BALANCE_TRANSFER_PARAMS = "transfer";

export const HISTORY_PROVIDER_BALANCE_TRANSFER_PARAMS = "transfer";

export const SETTING_BALANCE = "/balance-setting";

export const MERCHANTS_URL= "/merchants";

export const SMS_CONTENT_ORANGE_CASH_IN = "/sms-content/";

export const SMS_ORANGE_CASH_IN_CANDIDATE = "/sms-content/candidates/";

export const TRANSFERS_CSV_LIST = "/transfers/list-csv";

export const TRANSFER_HUB2_STATUS = "/transfers/hub2/";
export const PAGE_SIZE = 10;

export const statusList = [
  {
    id: 1,
    status: "pending"
  },
  {
    id: 2,
    status: "created"
  },
  {
    id: 3,
    status: "successful"
  },
  {
    id: 4,
    status: "failed"
  },
];

export const SelectDefaultValues = {
  status : undefined
}