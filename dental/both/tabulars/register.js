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
                //return JSON.stringify(val);
                var disease = "";
                val.forEach(function (obj) {
                    if (obj != null) {
                        diagnosis +=
                            "<label class='label label-info'>"
                            + "Diagnosis Id = " + obj.item
                            + " | Qty : " + obj.qty
                            + " | Price : " + obj.price
                            + " | Discount : " + obj.discount
                            + " | Amount : " + obj.amount
                            + "</label>" + "<br>";
                    }
                });

                return disease;
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