Clinic.TabularTable.orderCategory = new Tabular.Table({
    name: "clinicOrderCategoryList",
    collection: Clinic.Collection.orderCategory,
    columns: [
        {
            title: "<i class='fa fa-bars'></i>",
            tmpl: Meteor.isClient && Template.clinic_orderCategoryAction
        },
        {data: "_id", title: "ID"},
        {data: "name", title: "Name"},
        {data: "des", title: "Description"}
    ],
    autoWidth:false,
    order: [["1", "desc"]],
    columnDefs: [{"width": "12px", target: 0}]
});