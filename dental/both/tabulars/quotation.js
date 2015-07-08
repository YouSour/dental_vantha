Dental.TabularTable.Quotation = new Tabular.Table({
    name: "dentalQuotationList",
    collection: Dental.Collection.Quotation,
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.dental_quotationAction},
        {data: "_id", title: "ID"},
        {
            data: "patientId",
            title: "Patient",
            render: function (val, type, doc) {
                var patient = Dental.Collection.Patient.findOne({_id: val});
                return val + " (" + patient.name + ")";
            }
        },
        {data: "quotationDate", title: "Quotation Date"},
        {
            data: "disease", title: "Disease",
            render: function (val, type, doc) {
                var items = '<ul>';

                _.each(val, function (obj) {
                    var disease = Dental.Collection.DiseaseItem.findOne({_id: obj.item});
                    items +=
                        "<li>"
                        + 'Item: ' + disease.name
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
        },
        {data: "des", title: "Description"}
    ],
    order: [['1', 'desc']],
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0},
        {"width": "12px", "targets": 1}
    ]
});