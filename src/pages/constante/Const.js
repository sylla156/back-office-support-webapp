export const APPKEY = process.env.REACT_APP_APP_KEY;

export const URL_LOGIN = "/authentications";

export const URL_2FA_VERIFICATION = "/authentications/2fa/turn-on";

export const BASE_URL_SOLDE = "/balances/provider-transfer";

export const PROVIDER_PAYMENT_BALANCE_URL = "/balances/provider-payment";

export const BASE_URL_REFRESH_STATUS = "https://support-api.hub2.io/transfers";

export const BASE_URL_REFRESH_STATUS_WITH_PARAMS_1 = BASE_URL_REFRESH_STATUS + "?from=";

export const BASE_URL_MOOV_BALANCE = "/balances/";

export const BASE_URL_STATS = "/stats/merchant-transfer";
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

export const HISTORY_MERHCANT_BALANCE_COLLECTION = "/balances/merchant-cached";

export const HISTORY_PROVIDER_BALANCE_COLLECTION = "/balances/provider-cached";

export const HISTORY_PROVIDER_BALANCE_COLLECTION_PARAMS = "collection";

export const HISTORY_MERHCANT_BALANCE_TRANSFER = "/balances/merchant-cached";

export const HISTORY_PROVIDER_BALANCE_TRANSFER = "/balances/provider-cached";

export const HISTORY_MERHCANT_BALANCE_COLLECTION_PARAMS = "collection";

export const HISTORY_MERHCANT_BALANCE_TRANSFER_PARAMS = "transfer";

export const HISTORY_PROVIDER_BALANCE_TRANSFER_PARAMS = "transfer";

export const SETTING_BALANCE = "/balance-setting";

export const MERCHANTS_URL = "/merchants";

export const PROVIDERS_URL = "/provider";

export const SMS_CONTENT_ORANGE_CASH_IN = "/sms-content/";

export const SMS_ORANGE_CASH_IN_CANDIDATE = "/sms-content/candidates/";

export const TRANSFERS_CSV_LIST = "/transfers/list-csv";

export const PAYMENTS_CSV_LIST = "/payments/list-csv";

export const TRANSFER_HUB2_STATUS = "/transfers/hub2/";

export const STATUS_CONFIRMATION = "/status-confirmation";
export const DANGEROUSLY_FORCE_STATUS_STATUS_CONFIRMATION =
  "/status-confirmation/dangerously-force-transfer-status";
export const DANGEROUSLY_FORCE_STATUS_STATUS_CONFIRMATION_PAYMENT = "/status-confirmation/dangerously-force-payment-status";
export const STATUS_CONFIRMATION_TRANSFER_LIST = "/status-confirmation/transfer-list";
export const UPDATE_STATUS_CONFIRMATION_TRANSFER_LIST = "/status-confirmation/update-status-confirmation";
export const DELETE_STATUS_CONFIRMATION_TRANSFER_LIST = "/status-confirmation/delete";
export const LOCAL_STATS_COMMISSION_BY_MONTH = "/local-stats/commission-month";
export const LOCAL_STATS_COMMISSION_BY_DAY = "/local-stats/commission-day";
export const LOCAL_STATS_COMMISSION_BY_WEEK = "/local-stats/commission-week";
export const LOCAL_STATS_COMMISSION_BY_YEAR = "/local-stats/commission-year";
export const STATUS_CONFIRMATION_PAYMENT_LIST = "/status-confirmation/payment-list";
export const REFRESH_PAYMENT_STATUS = "/status-confirmation/RefreshPaymentStatus";
export const REFRESH_TRANSFER_STATUS = "/status-confirmation/RefreshTransferStatus";


export const LOCAL_STATS_COMMISSION_COUNTRY_PAYMENT_CATEGORY_WEEK = "/local-stats/commission-payment-category-week";
export const LOCAL_STATS_COMMISSION_ALL_COUNTRY_PAYMENT_CATEGORY_WEEK = "/local-stats/commission-payment-category-all-country-week";
export const LOCAL_STATS_COMMISSION_COUNTRY_PAYMENT_WEEK = "/local-stats/commission-payment-country-week";

export const LOCAL_STATS_COMMISSION_COUNTRY_TRANSFER_CATEGORY_WEEK = "/local-stats/commission-transfer-category-week";
export const LOCAL_STATS_COMMISSION_ALL_COUNTRY_TRANSFER_CATEGORY_WEEK = "/local-stats/commission-transfer-category-all-country-week";
export const LOCAL_STATS_COMMISSION_COUNTRY_TRANSFER_WEEK = "/local-stats/commission-transfer-country-week";

export const ORANGE_REPORT_TRANSFER_URL = "/orange-report-transfer"
export const ORANGE_REPORT_TRANSFER_UPLOAD_URL = "/orange-report-transfer/upload-file"
export const ORANGE_REPORT_TRANSFER_CANDIDATES = "/orange-report-transfer/candidates"
export const PAGE_SIZE = 10;
export const FIRST_PAGE_INDEX = 1;

export const ORANGE_REPORT_PAYMENT_URL = "/orange-report-payment"
export const ORANGE_REPORT_PAYMENT_UPLOAD_URL = "/orange-report-payment/upload-file"
export const GET_ORANGE_REPORT_PAYMENT_SERVICE_LIST = "orange-report-payment/all-report-service";
export const GET_LOCAL_ORANGE_REPORT_PAYMENT_RECONCILIATION_DATA = "orange-report-payment/reconciliation";
export const GET_LOCAL_PAYMENT_DATA = "local-stats/cached-payment-infos";
export const UPDATE_LOCAL_PAYMENT_DATA = "local-stats/fetch-payment-manualy";
export const ORANGE_REPORT_PAYMENT_CANDIDATES = "/orange-report-payment/candidates"

export const WAVE_REPORT_TRANSFER_UPLOAD_URL = "/wave-report-transfer/upload-file"
export const GET_LOCAL_WAVE_REPORT_TRANSFER_RECONCILIATION_DATA = "wave-report-transfer/reconciliation";
export const WAVE_REPORT_TRANSFER_URL = "/wave-report-transfer"
export const GET_WAVE_REPORT_TRANSFER_TRANSACTION_TYPE_LIST = "wave-report-transfer/wave-report-transfer-transactiontype-values";
export const MARK_WAVE_REPORT_PAYMENT_LIKE_REGULARISED = "/wave-report-transfer/upload-file"
export const GET_MARK_WAVE_REPORT_TRANSFER_LIKE_REGULARISED = "/wave-report-transfer/wave-retrieve-transfers-candidates"
export const EXPORT_WAVE_REPORT_TRANSFER_MARK_LIKE_REGULARISED = "/wave-report-transfer/export-wave-report-transfer-candidates"

export const MERCHANTS_FEES_URL = "/merchant-fees"
export const MERCHANTS_LIVE_FEES_URL = "/merchant-fees-live"
export const APPLY_MERCHANT_FEES_URL = "/merchant-fees/apply-fees"
export const ADD_APPLY_MERCHANT_FEES_URL = "/merchant-fees"

export const ADD_RETOUR_DE_FONDS = "/retour-de-fonds"
export const RETOUR_DE_FONDS = "/retour-de-fonds"
export const CHANGE_STATUS_RETOUR_DE_FONDS = "/retour-de-fonds/change-status"
export const RETRIEVE_A_TRANSFER_TRANSACTION = "/retour-de-fonds/retrieve-transaction"
export const GET_RETOUR_DE_FONDS_TYPE = "/retour-de-fonds-type"
export const ADD_RETOUR_DE_FONDS_LOGS = "/retour-de-fonds-logs"
export const GET_RETOUR_DE_FONDS_LOGS = "/retour-de-fonds-logs"
export const EXTRACT_RETOUR_DE_FONDS = "/retour-de-fonds/extract-data"

export const GET_ALL_USERS = 'rights-management/users'
export const APPLY_RIGHTS_UPDATE = 'rights-management/grant-user'

export const WAVE_REPORT_PAYMENT_UPLOAD_URL = "/wave-report-payment/upload-file"
export const GET_LOCAL_WAVE_REPORT_PAYMENT_RECONCILIATION_DATA = "wave-report-payment/reconciliation";
export const WAVE_REPORT_PAYMENT_URL = "/wave-report-payment"
export const GET_MARK_WAVE_REPORT_PAYMENT_LIKE_REGULARISED = "/regularisations/wave-retrieve-payments-candidates"
export const EXPORT_WAVE_REPORT_PAYMENT_MARK_LIKE_REGULARISED = "/regularisations/export-wave-report-payment-candidates"

export const FEDAPAY_REPORT_PAYMENT_URL = "/fedapay-bj-report-payment"
export const FEDAPAY_REPORT_PAYMENT_UPLOAD_URL = "/fedapay-bj-report-payment/upload-file"
export const GET_LOCAL_FEDAPAY_REPORT_PAYMENT_RECONCILIATION_DATA = "/fedapay-bj-report-payment/reconciliation";
export const GET_MARK_FEDAPAY_REPORT_PAYMENT_LIKE_REGULARISED = "/fedapay-bj-report-payment/fedapay-retrieve-payments-candidates"
export const EXPORT_FEDAPAY_REPORT_PAYMENT_MARK_LIKE_REGULARISED = "/fedapay-bj-report-payment/export-fedapay-report-payment-candidates"

export const MOOV_REPORT_PAYMENT_URL = "/moov-report-payment"
export const MOOV_REPORT_PAYMENT_UPLOAD_URL = "/moov-report-payment/upload-file"
export const GET_LOCAL_MOOV_REPORT_PAYMENT_RECONCILIATION_DATA = "moov-report-payment/reconciliation";
export const GET_MARK_MOOV_REPORT_PAYMENT_LIKE_REGULARISED = "/moov-report-payment/moov-retrieve-payments-candidates"
export const EXPORT_MOOV_REPORT_PAYMENT_MARK_LIKE_REGULARISED = "/moov-report-payment/export-moov-report-payment-candidates"

export const FREE_REPORT_PAYMENT_URL = "/free-payment-sn"
export const FREE_REPORT_PAYMENT_UPLOAD_URL = "/free-payment-sn/upload-file"
export const GET_LOCAL_FREE_REPORT_PAYMENT_RECONCILIATION_DATA = "free-payment-sn/reconciliation";
export const GET_MARK_FREE_REPORT_PAYMENT_LIKE_REGULARISED = "/free-payment-sn/free-retrieve-payments-candidates"
export const EXPORT_FREE_REPORT_PAYMENT_MARK_LIKE_REGULARISED = "/free-payment-sn/export-free-report-payment-candidates"

export const FREE_REPORT_TRANSFER_URL = "/free-sn-transfer"
export const FREE_REPORT_TRANSFER_UPLOAD_URL = "/free-sn-transfer/upload-file"
export const GET_LOCAL_FREE_REPORT_TRANSFER_RECONCILIATION_DATA = "free-sn-transfer/reconciliation";
export const GET_MARK_FREE_REPORT_TRANSFER_LIKE_REGULARISED = "/free-sn-transfer/free-retrieve-transfers-candidates"
export const EXPORT_FREE_REPORT_TRANSFER_MARK_LIKE_REGULARISED = "/free-sn-transfer/export-free-report-transfer-candidates"

export const INTOUCH_REPORT_TRANSFER_URL = "/intouch-report-transfer"
export const INTOUCH_REPORT_TRANSFER_UPLOAD_URL = "/intouch-report-transfer/upload-file"
export const GET_LOCAL_INTOUCH_REPORT_TRANSFER_RECONCILIATION_DATA = "intouch-report-transfer/reconciliation";
export const GET_LOCAL_INTOUCH_REPORT_PAYMENT_RECONCILIATION_DATA = "intouch-report-transfer/reconciliation-payments";
export const GET_MARK_INTOUCH_REPORT_TRANSFER_LIKE_REGULARISED = "/intouch-report-transfer/intouch-retrieve-transfers-candidates"
export const EXPORT_INTOUCH_REPORT_TRANSFER_MARK_LIKE_REGULARISED = "/intouch-report-transfer/export-intouch-report-transfer-candidates"

export const MOOV_REPORT_TRANSFER_URL = "/moov-report-transfer"
export const MOOV_REPORT_TRANSFER_UPLOAD_URL = "/moov-report-transfer/upload-file"
export const GET_LOCAL_MOOV_REPORT_TRANSFER_RECONCILIATION_DATA = "moov-report-transfer/reconciliation";
export const GET_MARK_MOOV_REPORT_TRANSFER_LIKE_REGULARISED = "/moov-report-transfer/moov-retrieve-transfers-candidates"
export const EXPORT_MOOV_REPORT_TRANSFER_MARK_LIKE_REGULARISED = "/moov-report-transfer/export-moov-report-transfer-candidates"

export const FEDAPAY_REPORT_TRANSFER_UPLOAD_URL = "/fedapay-bj-report-transfer/upload-file"
export const FEDAPAY_REPORT_TRANSFER_URL = "/fedapay-bj-report-transfer"
export const GET_LOCAL_FEDAPAY_REPORT_TRANSFER_RECONCILIATION_DATA = "fedapay-bj-report-transfer/reconciliation";
export const GET_MARK_FEDAPAY_REPORT_TRANSFER_LIKE_REGULARISED = "/fedapay-bj-report-transfer/fedapay-retrieve-transfers-canditates"
export const EXPORT_FEDAPAY_REPORT_TRANSFER_MARK_LIKE_REGULARISED = "/fedapay-bj-report-transfer/export-fedapay-report-transfer-candidates"

export const MTN_REPORT_TRANSFER_URL = "/mtn-report-transfer"
export const MTN_REPORT_TRANSFER_UPLOAD_URL = "/mtn-report-transfer/upload-file"
export const GET_LOCAL_MTN_REPORT_TRANSFER_RECONCILIATION_DATA = "mtn-report-transfer/reconciliation";
export const GET_MARK_MTN_REPORT_TRANSFER_LIKE_REGULARISED = "/mtn-report-transfer/mtn-retrieve-transfers-candidates"
export const EXPORT_MTN_REPORT_TRANSFER_MARK_LIKE_REGULARISED = "/mtn-report-transfer/export-mtn-report-transfer-candidates"

export const MTN_REPORT_PAYMENT_URL = "/mtn-report-payment"
export const MTN_REPORT_PAYMENT_UPLOAD_URL = "/mtn-report-payment/upload-file"
export const GET_LOCAL_MTN_REPORT_PAYMENT_RECONCILIATION_DATA = "/mtn-report-payment/reconciliation";
export const GET_MARK_MTN_REPORT_PAYMENT_LIKE_REGULARISED = "/mtn-report-payment/mtn-retrieve-payments-candidates"
export const EXPORT_MTN_REPORT_PAYMENT_MARK_LIKE_REGULARISED = "/mtn-report-payment/export-mtn-report-payment-candidates"

export const ORANGE_SN_REPORT_PAYMENT_URL = "/orange-sn-payment"
export const ORANGE_SN_REPORT_PAYMENT_UPLOAD_URL = "/orange-sn-payment/upload-file"
export const GET_LOCAL_ORANGE_SN_REPORT_PAYMENT_RECONCILIATION_DATA = "/orange-sn-payment/reconciliation";
export const GET_MARK_ORANGE_SN_REPORT_PAYMENT_LIKE_REGULARISED = "/orange-sn-payment/orange-sn-retrieve-payments-candidates"
export const EXPORT_ORANGE_SN_REPORT_PAYMENT_MARK_LIKE_REGULARISED = "/orange-sn-payment/export-orange-sn-payment-candidates"

export const UPDATE_LOCAL_TRANSFER_DATA = "local-stats/fetch-transfers-manualy";
export const GET_LOCAL_TRANSFER_DATA = "local-stats/cached-transfer-infos";
export const GET_LOCAL_ORANGE_REPORT_TRANSFER_RECONCILIATION_DATA = "orange-report-transfer/reconciliation";
export const GET_ORANGE_REPORT_TRANSFER_SERVICE_LIST = "orange-report-transfer/all-report-service";

export const GET_MARK_ORANGE_REPORT_PAYMENT_LIKE_REGULARISED = "/orange-report-payment/orange-retrieve-payments-candidates"
export const MARK_ORANGE_REPORT_PAYMENT_LIKE_REGULARISED = "/regularisations/upload-file"
export const SINGLE_MARK_ORANGE_REPORT_PAYMENT_LIKE_REGULARISED = "/regularisations/single-mark";
export const EXPORT_ORANGE_REPORT_PAYMENT_MARK_LIKE_REGULARISED = "orange-report-payment/export-orange-report-payment-candidates"

export const GET_MARK_ORANGE_REPORT_TRANSFER_LIKE_REGULARISED = "/orange-report-transfer/orange-retrieve-transfers-candidates"
export const EXPORT_ORANGE_REPORT_TRANSFER_MARK_LIKE_REGULARISED = 'orange-report-transfer/export-orange-report-transfer-candidates'
export const MARK_ORANGE_REPORT_TRANSFER_LIKE_REGULARISED = "/regularisations/upload-orange-transfer-file"
export const SINGLE_MARK_ORANGE_REPORT_TRANSFER_LIKE_REGULARISED = "/regularisations/single-orange-transfer-mark"

export const LOCAT_TRANSFER_REPORTING = "/transfers/local-list";
export const LOCAT_PAYMENT_REPORTING = "/payments/local-list";

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
    order: "volume-ASC",
    service: "Cash in",
    servciePayment: "Merchant Payment",
    reconcilation : 'Tous'
}

export const SelectWaveTransferDefaultValues = {
    type: "Tous",
}

export const MerchantFeeType = [
    {
        "id": 1,
        "type": "percent",
        "label": "Pourcentage"
    },
    {
        "id": 2,
        "type": "flat",
        "label": "Fixe"
    }
]

export const merchantFeeProviders = [
    {
        "id": 1,
        "type": "moov",
        "label": "Moov"
    },
    {
        "id": 2,
        "type": "mtn",
        "label": "Mtn"
    },
    {
        "id": 3,
        "type": "wave",
        "label": "Wave"
    },
    {
        "id": 4,
        "type": "orange",
        "label": "Orange"
    },
    {
        "id": 5,
        "type": "free",
        "label": "Free"
    },
    {
        "id": 6,
        "type": "ecobank",
        "label": "Ecobank"
    },
    {
        "id": 7,
        "type": "free money",
        "label": "Free Money"
    },
    {
        "id": 8,
        "type": "mobicash",
        "label": "Mobicash"
    },
    {
        "id": 9,
        "type": "togocell",
        "label": "Togocell"
    },
    {
        "id": 10,
        "type": "emoney",
        "label": "eMoney"
    }, {
        "id": 11,
        "type": "null",
        "label": "Null"
    }
]

export const MerchantFeeTransactionType = [
    {
        "id": 1,
        "type": "payment",
        "label": "Paiement"
    },
    {
        "id": 2,
        "type": "transfer",
        "label": "Transfert"
    }
]

export const MerchantFeeMethod = [
    {
        "id": 1,
        "type": "bt",
        "label": "Transfert bancaire"
    },
    {
        "id": 2,
        "type": "mm",
        "label": "Mobile Money"
    }
]

export const MerchantsCountry = [
    {
        "id":"ci",
        "country":"CI",
        "name":"CÔTE D'IVOIRE",
    },
    {
        "id":"sn",
        "country":"SN",
        "name":"SÉNÉGAL",
    },
    {
        "id":"ml",
        "country":"ML",
        "name":"MALI",
    },
    {
        "id":"bf",
        "country":"BF",
        "name":"BURKINA FASO",
    },
    {
        "id":"gn",
        "country":"GN",
        "name":"GUINÉE",
    },
    {
        "id":"cm",
        "country":"CM",
        "name":"CAMEROUN",
    },
    {
        "id":"bj",
        "country":"BJ",
        "name":"BENIN",
    },
    {
        "id":"tg",
        "country":"TG",
        "name":"TOGO",
    }
];

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

export const WaveReportTransferCountry = [
    {
        "id":"ci",
        "country":"CI",
        "name":"CÔTE D'IVOIRE",
    },
    {
        "id":"sn",
        "country":"SN",
        "name":"SÉNÉGAL",
    },
];

export const MtnReportTransferCountry = [
    {
        "id":"ci",
        "country":"CI",
        "name":"CÔTE D'IVOIRE",
    },
];

export const IntouchReportPaymentCountry = [
    {
        "id":"ci",
        "country":"CI",
        "name":"CÔTE D'IVOIRE",
    },
    {
        "id":"sn",
        "country":"SN",
        "name":"SÉNÉGAL",
    },
    {
        "id":"ml",
        "country":"ML",
        "name":"MALI",
    },
    {
        "id":"bf",
        "country":"BF",
        "name":"BURKINA FASO",
    },
    {
        "id":"gn",
        "country":"GN",
        "name":"GUINÉE",
    },
    {
        "id":"cm",
        "country":"CM",
        "name":"CAMEROUN",
    },
    {
        "id":"ts",
        "country":"TOUS",
        "name":"TOUS",
    },
];

export const MoovReportPaymentCountry = [
    {
        "id":"ci",
        "country":"CI",
        "name":"CÔTE D'IVOIRE",
    },
    // {
    //   "id":"sn",
    //   "country":"SN",
    //   "name":"SÉNÉGAL",
    // },
];

export const ChooseCountry = [
    // make all countries
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

export const etatDesRetourDeFonds = [
    {
      id:0,
      etat: "OUVERT",
      ouvert: "OUVERT"
    },
    {
      id:1,
      etat: "A TRANSMETTRE",
      aTransmettre: "A TRANSMETTRE"
    },
    {
      id:2,
      etat: "A REGULARISER",
      aRegulariser: "A REGULARISER"
    },
    {
      id:3,
      etat: "REGULARISE",
      regularise: "REGULARISE"
    },
    {
      id:4,
      etat: "A VALIDER",
      aValider: "A VALIDER"
    },
    {
      id:5,
      etat: "INSUFFISANTS",
      insuffisants: "INSUFFISANTS"
    },
    {
      id:6,
      etat: "A NOTIFIER",
      aNotifier: "A NOTIFIER"
    },
    {
      id:7,
      etat: "FERMÉ",
      fermé: "FERMÉ"
    },
    {
      id:8,
      etat:"Tous"
    }
]

export const chooseReconciliation = [
    {
        id: 0,
        reconciliation : 'Reconciliés'
    },
    {
        id: 1,
        reconciliation : 'Non Reconciliés'
    },
    {
        id: 2,
        reconciliation : 'Tous'
    }
]

export const TransactionstatusList = [
    {
        id: 1,
        status: "pending"
    },
    {
        id: 2,
        status: "successful"
    },
    {
        id: 3,
        status: "failed"
    },
    {
        id: 4,
        status: "Tous"
    },
];

export const FreeTransactionStatusList = [
    {
        id: 1,
        status: "initiated"
    },
    {
        id: 2,
        status: "successful"
    },
    {
        id: 3,
        status: "failed"
    },
    {
        id: 4,
        status: "Tous"
    },
];
