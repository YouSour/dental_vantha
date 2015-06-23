Dental.TabularTable.Treatment = new Tabular.Table({
    name: "dentalTreatmentList",
    collection: Dental.Collection.Treatment,
    columns: [
        {title: "<i class='fa fa-bars'></i>", tmpl: Meteor.isClient && Template.dental_treatmentAction},
        //{data: "_id", title: "ID"},
        {data: "treatmentDate", title: "Treatment Date"},
        //{data: "patientId", title: "Patient"},
        //{data: "registerId", title: "Register"},
        {data: "doctorId", title: "Doctor"},
        {data: "des", title: "Description"},
        {
            data: "attachFile", title: "Attache",
            render: function (val, type, doc) {
                if (_.isUndefined(val)) {
                    return null;
                } else {
                    var attacheFile = Files.findOne(val);
                    return '<img src="' + attacheFile.url() + '" class="img-circle" width="50px" height="50px">';
                }
            }
        }
    ],
    order: [["1", "desc"]],
    autoWidth: false,
    columnDefs: [{width: "12px", target: 0}]
});