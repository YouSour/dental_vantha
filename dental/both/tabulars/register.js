Dental.TabularTable.Register = new Tabular.Table({
    name: "dentalRegisterList",
    collection: Dental.Collection.Register,
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.dental_registerAction},
        {title: '<i class="fa fa-print"></i>', tmpl: Meteor.isClient && Template.dental_registerPrintAction},
        {data: "_id", title: "ID"},
        {data: "registerDate", title: "Register Date"},
        {data: "des", title: "Description"},
        {data: "_patient.name", title: "Patient Name"},
        {
            data: "_patient",
            title: "Photo",
            render: function (val, doc, type) {
                var photo = val.photo;
                if (_.isUndefined(photo)) {
                    return null;
                } else {
                    var img = Files.findOne(photo);
                    return '<img src="' + img.url() + '" class="img-circle" width="50px" height="50px">';
                }
            }
        }
    ],
    order: [['2', 'desc']],
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0},
        {"width": "12px", "targets": 1}
    ]
});