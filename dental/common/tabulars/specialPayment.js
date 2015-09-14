Dental.TabularTable.SpcaialPayment = new Tabular.Table({
    name: "dentalSpecialPaymentList",
    collection: Dental.Collection.SpecialPayment,
    columns: [
        {
            title: "<i class='fa fa-bars'></i>",
            tmpl: Meteor.isClient && Template.dental_specialPaymentAction
        },
        {data: "_id", title: "ID"},
        {data: "paymentDate", title: "Payment Date"},
        {data: "specialRegisterId", title: "Special Register ID"},
        {data: "patientId", title: "Patient ID"},
        {data: "_patient.name", title: "Patient Name"},
        {data: "staffId", title: "Staff"},
        {data: "dueAmount", title: "Due Amount"},
        {data: "paidAmount", title: "Paid Amount"},
        {data: "balance", title: "Balance"},
        {data: "status", title: "Status"}
    ],
    order: [["1", "desc"]],
    extraFields:['paymentMethod'],
    autoWidth: false,
    columnDefs: [{"width": "12px", "target": 0}]
});