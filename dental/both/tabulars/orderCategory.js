Dental.TabularTable.orderCategory = new Tabular.Table({
    name: "dentalOrderCategoryList",
    collection: Dental.Collection.orderCategory,
    columns: [
        {
            title: "<i class='fa fa-bars'></i>",
            tmpl: Meteor.isClient && Template.dental_orderCategoryAction
        },
        {data: "_id", title: "ID"},
        {data: "name", title: "Name"},
        {data: "des", title: "Description"}
    ],
    autoWidth:false,
    order: [["1", "desc"]],
    columnDefs: [{"width": "12px", target: 0}]
});