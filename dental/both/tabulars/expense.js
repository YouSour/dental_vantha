Clinic.TabularTable.Expense = new Tabular.Table({
    name: "clinicExpenseList",
    collection: Clinic.Collection.Expense,
    columns: [
        {
            title: "<i class='fa fa-bars'></i>",
            tmpl: Meteor.isClient && Template.clinic_expenseAction
        },
        {data: "_id", title: "ID"},
        {
            data: "expenseDate",
            title: "Expense Date",
            render: function (val, doc, type) {
                return moment(val).format("YYYY-MM-DD");
            }
        },
        {
            data: "expenseTypeId",
            title: "Expense Type",
            render: function (val, doc, type) {
                var tempExpenseTypeId = Clinic.Collection.expenseType.findOne({_id: val});
                return labelCon(tempExpenseTypeId.name, tempExpenseTypeId.name, "primary");
            }
        },
        {
            data: "amount",
            title: "Amount",
            render: function (val, doc, type) {
                return labelCon(val, val, "success");
            }
        },
        {data: "des", title: "Description"}
    ],
    autoWidth: false,
    order: [['1', 'desc']],
    colummDefs: [{"width": "12px", "target": 0}]
});