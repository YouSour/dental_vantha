Clinic.TabularTable.expenseType = new Tabular.Table({
    name: "clinicExpenesTypeList",
    collection: Clinic.Collection.expenseType,
    columns: [
        {
            title: "<i class='fa fa-bars'></i>",
            tmpl: Meteor.isClient && Template.clinic_expenseTypeAction
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