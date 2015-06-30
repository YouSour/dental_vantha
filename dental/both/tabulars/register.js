Dental.TabularTable.Register = new Tabular.Table({
    name: "dentalRegisterList",
    collection: Dental.Collection.Register,
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.dental_registerAction},
        {title: '<i class="fa fa-print"></i>', tmpl: Meteor.isClient && Template.dental_registerPrintAction},
        {data: "_id", title: "ID"},
        {
            data: "patientId",
            title: "Patient",
            render: function (val, doc, type) {
                var data = Dental.Collection.Patient.findOne({_id: val});
                return data._id + " | " + data.name;
            }
        },
        {data: "registerDate", title: "Register Date"},
        {
            data: "patientId",
            title: "Photo",
            render: function (val, doc, type) {
                var data = Dental.Collection.Patient.findOne({_id: val});
                var img = data.photo;
                if (_.isUndefined(val)) {
                    return null;
                } else {
                    var img = Files.findOne(img);
                    return '<img src="' + img.url() + '" class="img-circle" width="50px" height="50px">';
                }
            }
        },
        {data: "des", title: "Description"}
    ],
    order: [['2', 'desc']],
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0},
        {"width": "12px", "targets": 1}
    ]
});