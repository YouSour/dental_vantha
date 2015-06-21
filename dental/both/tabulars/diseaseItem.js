Dental.TabularTable.DiseaseItem = new Tabular.Table({
    name: "dentalDiseaseItemList",
    collection: Dental.Collection.DiseaseItem,
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.dental_diseaseItemAction},
        {data: "_id", title: "ID"},
        {data: "code", title: "Code"},
        {data: "name", title: "Name"},
        {
            data: "price",
            title: "Price",
            render: function (val, doc, type) {
                return labelCon(val, val, "success");
            }
        },
        {
            data: "memberPrice",
            title: "Member Price",
            render: function (val, doc, type) {
                return labelCon(val, val, "warning");
            }
        },
        {data: "_diseaseCategory.code", title: "Category"}
    ],
    order: [['1', 'desc']],
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ]
});