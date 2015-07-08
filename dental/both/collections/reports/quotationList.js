/**
 * Schema
 */
Dental.Schema.QuotationListReport = new SimpleSchema({
    patient: {
        type: String,
        autoform: {
            type: "select2",
            options: function () {
                return Dental.ListForReport.patient();
            }
        }
    },
    date: {
        type: String
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