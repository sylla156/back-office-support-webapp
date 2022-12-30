export const APPKEY = process.env.REACT_APP_APP_KEY;

export const URL_LOGIN = "/authentications";

export const BASE_URL_SOLDE = "/balances/provider-transfer";

export const PROVIDER_PAYMENT_BALANCE_URL = "/balances/provider-payment";

export const BASE_URL_REFRESH_STATUS = "https://support-api.hub2.io/transfers";

export const BASE_URL_REFRESH_STATUS_WITH_PARAMS_1 = BASE_URL_REFRESH_STATUS + "?from=";

export const BASE_URL_MOOV_BALANCE = "/balances/";

export const BASE_URL_STATS = "/stats";
export const BASE_URL_COLLECTION_STATS = "/stats/merchant-collection";

export const BASE_URL_REFRESH_STATUS_WITH_PARAMS_2 = "&isForceStatus=" + false + "&merchantId=" + "&status=pending" + "&to="

export const BASE_URL_MERCHANT_TRANSFER_BALANCES = "/balances/merchant-transfers";

export const BASE_URL_MERCHANT_TRANSFER_BALANCE = "/balances/merchant-transfer";

export const BASE_URL_MERCHANT_COLLECTION_BALANCES = "/balances/merchant-collections";

export const BASE_URL_MERCHANT_COLLECTION_BALANCE = "/balances/merchant-collection";

export const POWER_SLIDE_FIRST_URL = "https://app.powerslide.io/api/job/getToken/9e6db3e2-ddad-4c22-b02a-fd90187813b6";

export const POWER_SLIDE_FIRST_APIID = "40eaaa41-8852-4bda-9871-db74e8102acf";

export const POWER_SLIDE_FIRST_TOKEN = "ad5077b8263a27317eeaf11972f8ae79b35ffbf0aaedcd617eab72daf397bd45fcc4937e0055cc4e31f2044b7f105674";

export const POWER_SLIDE_ACCES_SLIDE_URL = "https://app.powerslide.io/graphql";

export const HISTORY_MERHCANT_BALANCE_COLLECTION= "/balances/merchant-cached";

export const HISTORY_PROVIDER_BALANCE_COLLECTION= "/balances/provider-cached";

export const HISTORY_PROVIDER_BALANCE_COLLECTION_PARAMS = "collection";

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

export const PAYMENTS_CSV_LIST = "/payments/list-csv";

export const TRANSFER_HUB2_STATUS = "/transfers/hub2/";

export const STATUS_CONFIRMATION = "/status-confirmation";
export const DANGEROUSLY_FORCE_STATUS_STATUS_CONFIRMATION =
  "/status-confirmation/dangerously-force-transfer-status";
export const STATUS_CONFIRMATION_TRANSFER_LIST = "/status-confirmation/transfer-list";
export const UPDATE_STATUS_CONFIRMATION_TRANSFER_LIST = "/status-confirmation/update-status-confirmation";
export const DELETE_STATUS_CONFIRMATION_TRANSFER_LIST = "/status-confirmation/delete";
export const LOCAL_STATS_COMMISSION_BY_MONTH= "/local-stats/commission-month";
export const LOCAL_STATS_COMMISSION_BY_DAY= "/local-stats/commission-day";
export const LOCAL_STATS_COMMISSION_BY_WEEK= "/local-stats/commission-week";
export const LOCAL_STATS_COMMISSION_BY_YEAR= "/local-stats/commission-year";


export const LOCAL_STATS_COMMISSION_COUNTRY_PAYMENT_CATEGORY_WEEK= "/local-stats/commission-payment-category-week";
export const LOCAL_STATS_COMMISSION_ALL_COUNTRY_PAYMENT_CATEGORY_WEEK= "/local-stats/commission-payment-category-all-country-week";
export const LOCAL_STATS_COMMISSION_COUNTRY_PAYMENT_WEEK= "/local-stats/commission-payment-country-week";

export const LOCAL_STATS_COMMISSION_COUNTRY_TRANSFER_CATEGORY_WEEK= "/local-stats/commission-transfer-category-week";
export const LOCAL_STATS_COMMISSION_ALL_COUNTRY_TRANSFER_CATEGORY_WEEK= "/local-stats/commission-transfer-category-all-country-week";
export const LOCAL_STATS_COMMISSION_COUNTRY_TRANSFER_WEEK= "/local-stats/commission-transfer-country-week";

export const ORANGE_REPORT_TRANSFER_URL="/orange-report-transfer"
export const ORANGE_REPORT_TRANSFER_UPLOAD_URL="/orange-report-transfer/upload-file"
export const ORANGE_REPORT_TRANSFER_CANDIDATES="/orange-report-transfer/candidates"
export const PAGE_SIZE = 10;

export const UPDATE_LOCAL_TRANSFER_DATA="local-stats/fetch-transfers-manualy";
export const GET_LOCAL_TRANSFER_DATA="local-stats/cached-transaction-infos";

export const TransferstatusList = [
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
export const StatusConfirmationList = [
  {
    id: 1,
    status: "pending"
  },
  {
    id: 2,
    status: "created"
  }
];
export const AddStatusConfirmationList = [
  {
    id: 1,
    status: "successful"
  },
  {
    id: 2,
    status: "failed"
  }
];
export const PaymentstatusList = [
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
  {
    id: 5,
    status: "processing"
  },
  {
    id: 6,
    status: "payment_required"
  },
  {
    id: 7,
    status: "action_required"
  },
  {
    id: 8,
    status: "canceled"
  },
];

export const SelectDefaultValues = {
  status : "defaultStatus",
  order: "volume-ASC"
}

export const OrangeReportTransferCountry = [
  {
    "id":"ci",
    "country":"ci",
    "name":"CÔTE D'IVOIRE",
  },
  {
    "id":"sn",
    "country":"sn",
    "name":"SÉNÉGAL",
  },
];
export const ChooseCountry = [
  //make all countries
  {
    "id":"all",
    "country":undefined,
    "name":"Tous les pays",
  },
  {
    "id":"ci",
    "country":"ci",
    "name":"CÔTE D'IVOIRE",
  },
  {
    "id":"sn",
    "country":"sn",
    "name":"SÉNÉGAL",
  },
  {
    "id":"gn",
    "country":"gn",
    "name":"GUINÉE CONAKRY",
  },
  {
    "id":"bn",
    "country":"bn",
    "name":"BÉNIN",
  },
  {
    "id":"cm",
    "country":"cm",
    "name":"CAMEROUN",
  },
  {
    "id":"ml",
    "country":"ml",
    "name":"MALI",
  },
  {
    "id":"tg",
    "country":"tg",
    "name":"TOGO",
  }
];

export const chooseOrderList = [
  {
    id:0,
    sorted: 'volume-ASC',
    name:"Volume Croissant"
  },
  {
    id:3,
    sorted: 'volume-DESC',
    name:"Volume décroissant"
  },
  {
    id:1,
    sorted: 'commission_brute-ASC',
    name:"Commission brute croissante"
  },
  {
    id:4,
    sorted: 'commission_brute-DESC',
    name:"Commission brute décroissante"
  },
  {
    id:2,
    sorted: 'commission_nette-ASC',
    name:"Commission nette croissante"
  },
  {
    id:5,
    sorted: 'commission_nette-DESC',
    name:"Commission nette décroissante"
  }
]
