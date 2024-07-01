export const JOB_API_BASE_ROUTE = '/jobs';

export const JOB_DOWNLOAD_BASE_ROUTE = `${JOB_API_BASE_ROUTE}/downloads`;

export const CHECK_STATUS_BASE_ROUTE = `${JOB_API_BASE_ROUTE}/bulk-check-status`;
export const CHECK_STATUS_TEMPLATE_ROUTE = `${CHECK_STATUS_BASE_ROUTE}/downloads/template`;

export const TRANSACTION_BLACKLIST_BASE_ROUTE = `/blacklists`;
export const TRANSACTION_BLACKLIST_JOB_BASE_ROUTE = `${JOB_API_BASE_ROUTE}/transaction-blacklists`;
