import moment from "moment-timezone";


export default [
    {
        "invoiceNumber": 300500,
        "status": "Paid",
        "subscription": "Platinum Subscription Plan",
        "price": "79,00",
        "issueDate": moment().subtract(1, "days").format("DD MMM YYYY"),
        "dueDate": moment().subtract(1, "days").add(1, "month").format("DD MMM YYYY")
    },
]