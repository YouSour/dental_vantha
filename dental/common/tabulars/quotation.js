Dental.TabularTable.Quotation = new Tabular.Table({
    name: "dentalQuotationList",
    collection: Dental.Collection.Quotation,
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.dental_quotationAction},
        {data: "_id", title: "ID"},
        {data: "quotationDate", title: "Quotation Date"},
        {
            data: "disease", title: "Disease",
            render: function (val, type, doc) {
                var items = '<table border="1" frame="void" style="border-collapse: collapse">' +
                    '<thead>' +
                    '<tr>' +
                    '<th>Item</th>' +
                    '<th>Qty</th>' +
                    '<th>Price</th>' +
                    '<th>Dis</th>' +
                    '<th>Amount</th>' +
                    '</tr>' +
                    '</thead>';

                _.each(val, function (obj) {
                    var disease = Dental.Collection.DiseaseItem.findOne({_id: obj.item});
                    items += '<tr>' +
                        '<td>' + disease.name + '</td>' +
                        '<td>' + obj.qty + '</td>' +
                        '<td>' + obj.price + '</td>' +
                        '<td>' + obj.discount + '</td>' +
                        '<td>' + obj.amount + '</td>' +
                        '</tr>';
                });
                items += '</table>';

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
        {data: "patientId", title: "Patient ID"},
        {data: "_patient.name", title: "Patient Name"},
        {
            data: "_patient.photo",
            title: "Photo",
            render: function (val, type, doc) {
                if (_.isUndefined(val)) {
                    return null;
                } else {
                    var img = Files.findOne(val);
                    return lightbox(img.url(), doc._id, doc._patient.name);
                }
            }
        }
    ],
    order: [['1', 'desc']],
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0},
        {"width": "12px", "targets": 1}
    ]
});