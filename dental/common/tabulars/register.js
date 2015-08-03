Dental.TabularTable.Register = new Tabular.Table({
    name: "dentalRegisterList",
    collection: Dental.Collection.Register,
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.dental_registerAction},
        {title: '<i class="fa fa-print"></i>', tmpl: Meteor.isClient && Template.dental_registerPrintAction},
        {data: "_id", title: "ID"},
        {data: "registerDate", title: "Register Date"},
        {data: "des", title: "Description"},
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
        },
        {
            data: "_treatmentCount",
            title: "T+",
            tmpl: Meteor.isClient && Template.dental_treatmentLinkAction
        },
        {
            data: "_appointmentCount",
            title: "A+",
            tmpl: Meteor.isClient && Template.dental_appointmentLinkAction
        },
        {
            data: "_depositCount",
            title: "D+",
            tmpl: Meteor.isClient && Template.dental_depositLinkAction
        },
        {
            data: "_invoiceCount",
            title: "I+",
            tmpl: Meteor.isClient && Template.dental_invoiceLinkAction
        }
    ],
    order: [['2', 'desc']],
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0},
        {"width": "12px", "targets": 1}
    ]
});