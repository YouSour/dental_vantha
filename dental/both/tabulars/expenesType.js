Dental.TabularTable.expenseType = new Tabular.Table({
    name: "dentalExpenesTypeList",
    collection: Dental.Collection.expenseType,
    columns: [
        {
            title: "<i class='fa fa-bars'></i>",
            tmpl: Meteor.isClient && Template.dental_expenseTypeAction
        },
        {data: "_id", title: "ID"},
        {data: "name", title: "Name"},
        {data: "des", title: "Description"}
    ],
    order: [['1', 'desc']],
    autoWidth:false,
    columnDefs: [
        {"width": "12px", "target": 0}
    ]
});