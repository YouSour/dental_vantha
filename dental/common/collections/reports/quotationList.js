/**
 * Schema
 */
Dental.Schema.QuotationListReport = new SimpleSchema({
    patient: {
        type: String,
        autoform: {
            type: "select2",
            options: function () {
                return Dental.ListForReport.patientList();
            }
        },
        optional:true
    },
    branchId: {
        type: String,
        autoform: {
            type: "select2",
            options: function () {
                return Dental.ListForReport.branchList();
            }
        },
        optional:true
    },
    date: {
        type: String,
        label: "Date Range"
    },
    exchange: {
        type: String,
        autoform: {
            type: "select2",
            options: function () {
                return Dental.ListForReport.exchangeList();
            }
        }
    }
});