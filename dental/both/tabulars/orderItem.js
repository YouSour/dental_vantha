Dental.TabularTable.orderItem = new Tabular.Table({
    name: "dentalOrderList",
    collection: Dental.Collection.orderItem,
    columns: [
        {
            title: "<i class='fa fa-bars'></i>",
            tmpl: Meteor.isClient && Template.dental_orderItemAction
        },
        {data: "_id", title: "ID"},
        {data: "name", title: "Name"},
        {data: "unit", title: "Unit"},
        {
            data: "orderCategoryId",
            title: "Category",
            render: function (val, doc, type) {
                var tempOrderCategoery = Dental.Collection.orderCategory.findOne({_id: val});
                return labelCon(tempOrderCategoery.name, tempOrderCategoery.name, "primary", "");
            }
        }
    ],
    order: [["1", "desc"]],
    autoWidth:false,
    columnDefs: [{"width": "12px", "target": 0}]
});