Dental.TabularTable.Deposit = new Tabular.Table({
    name: "dentalDepositList",
    collection: Dental.Collection.Deposit,
    columns: [
        {
            title: "<i class='fa fa-bars'></i>",
            tmpl: Meteor.isClient && Template.dental_depositAction
        },
        {data: "_id", title: "ID"},
        {data: "depositDate", title: "Deposit Date"},
        {
            data: "registerId",
            title: "Register ID",
            render: function (val, doc, type) {
                return labelCon(val, val, "primary");
            }
        },
        {
            data: "amount",
            title: "Amount",
            render: function (val, doc, type) {
                return labelCon(val, val, "success");
            }
        }
    ],
    order: [["1", "desc"]],
    autoWidth: false,
    columnDefs: [{"width": "12px", "targets": 0}]
});