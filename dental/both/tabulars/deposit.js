Clinic.TabularTable.Deposit = new Tabular.Table({
    name: "clinicDepositList",
    collection: Clinic.Collection.Deposit,
    columns: [
        {
            title: "<i class='fa fa-bars'></i>",
            tmpl: Meteor.isClient && Template.clinic_depositAction
        },
        {data: "_id", title: "ID"},
        {data: "depositDate", title: "Deposit Date"},
        {data: "registerId", title: "Register ID"},
        {data: "amount", title: "Amount"}
    ],
    order: [["1", "desc"]],
    autoWidth: false,
    columnDefs: [{"width": "12px", "targets": 0}]
});