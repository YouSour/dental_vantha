/**
 * Schema
 */
Dental.Schema.PaymentListReport = new SimpleSchema({
    staff: {
        type: String,
        autoform: {
            type: "select2",
            options: function () {
                return Dental.ListForReport.staffList();
            }
        }
    },
    patient: {
        type: String,
        autoform: {
            type: "select2",
            options: function () {
                return Dental.ListForReport.patientList();
            }
        }
    },
    branchId: {
        type: String,
        autoform: {
            type: "select2",
            options: function () {
                return Dental.ListForReport.branchList();
            }
        }
    },
    status:{
        type: String,
        autoform: {
            type: "select2",
            options: function () {
                return Dental.ListForReport.statusListForPayment();
            }
        }
    },
    exchange:{
        type: String,
        autoform: {
            type: "select2",
            options: function () {
                return Dental.ListForReport.exchangeList();
            }
        }
    },
    date: {
        type: String,
        label : "Date Range"
    }
    //exchange: {
    //    type: String,
    //    autoform: {
    //        type: "select2",
    //        options: function () {
    //            return Dental.ListForReport.exchange();
    //        }
    //    }
    //}
});