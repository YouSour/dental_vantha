Dental.TabularTable.Payment = new Tabular.Table({
    name: "dentalPaymentList",
    collection: Dental.Collection.Payment,
    columns: [
        {
            title: "<i class='fa fa-bars'></i>",
            tmpl: Meteor.isClient && Template.dental_paymentAction
        },
        {data: "_id", title: "ID"},
        {data: "paymentDate", title: "Payment Date"},
        {data: "invoiceId", title: "Invoice ID"},
        {data: "staffId", title: "Staff"},
        {data: "dueAmount", title: "Due Amount"},
        {data: "paidAmount", title: "Paid Amount"},
        {data: "balance", title: "Balance"},
        {data: "status", title: "Status"}
    ],
    order: [["1", "desc"]],
    autoWidth: false,
    columnDefs: [{"width": "12px", "target": 0}]
});