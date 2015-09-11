Dental.TabularTable.Treatment = new Tabular.Table({
    name: "dentalTreatmentList",
    collection: Dental.Collection.Treatment,
    columns: [
        {title: "<i class='fa fa-bars'></i>", tmpl: Meteor.isClient && Template.dental_treatmentAction},
        //{data: "_id", title: "ID"},
        {data: "treatmentDate", title: "Treatment Date"},
        //{data: "patientId", title: "Patient"},
        //{data: "registerId", title: "Register"},
        {data: "des", title: "Description"},
        {data: "doctorId", title: "Doctor ID"},
        {data: "_doctor.name", title: "Doctor Name"},
        {
            data: "attachFile", title: "<i class='fa fa-paperclip'></i>",
            render: function (val, type, doc) {
                //console.log(doc._doctor.name);
                if (_.isUndefined(val)) {
                    return null;
                } else {
                    var attacheFile = Files.findOne(val);
                    return lightbox(attacheFile.url(), doc._id,doc.doctorId, 'paperclip');
                }
            }
        }
    ],
    order: [["1", "desc"]],
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0},
        {"width": "12px", "targets": 5}
    ]
});