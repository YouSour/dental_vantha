Dental.TabularTable.Register = new Tabular.Table({
    name: "dentalRegisterList",
    collection: Dental.Collection.Register,
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.dental_registerAction},
        {data: "_id", title: "ID"},
        {data: "registerDate", title: "Register Date"},
        {data: "patientId", title: "Patient"},
        {
            data: "disease", title: "Disease",
            render: function (val, type, doc) {
                var items = '<ul>';

                _.each(val, function (obj) {
                    items +=
                        "<li>"
                        + 'Item: ' + obj.item
                        + ' | Qty: ' + obj.qty
                        + ' | Price : ' + obj.price
                        + ' | Dis: ' + obj.discount
                        + ' | Amount: ' + obj.amount
                        + '</li>';
                });
                items += '</ul>';

                return items;
            }
        },
        {
            data: "total",
            title: "Total",
            render: function (val, doc, type) {
                return numeral(val).format('0,0.00');
            }
        }
    ],
    order: [['1', 'desc']],
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ]
});