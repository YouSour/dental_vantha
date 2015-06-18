Clinic.TabularTable.Register = new Tabular.Table({
    name: "clinicRegisterList",
    collection: Clinic.Collection.Register,
    columns: [
        {
            title: '<i class="fa fa-bars"></i>',
            tmpl: Meteor.isClient && Template.clinic_registerAction
        },
        {data: "_id", title: "ID"},
        {data: "registerDate", title: "Register Date"},
        {
            data: "patientId",
            title: "Patient",
            render: function (val, doc, type) {
                return labelCon(val, val, "primary")
            }
        },
        {
            data: "diagnosis", title: "Diagnosis",
            render: function (val, type, doc) {
                //return JSON.stringify(val);
                var diagnosis = "";
                val.forEach(function (o) {
                    if (o != null) {
                        diagnosis +=
                            "<label class='label label-info'>" +
                            "Diagnosis Id = " + o.diagnosisId +
                            " | Qty : " + o.qty +
                            " | Price : " + o.price +
                            " | Discount : " + o.discount +
                            " | Amount : " + o.amount +
                            "</label>" + "<br>";
                    }
                });
                return diagnosis;
            }
        },
        {
            data: "total",
            title: "Total",
            render: function (val, doc, type) {
                return labelCon(val, val, "success", "")
            }
        },
        {data: "des", title: "Description"}
    ],
    order: [['1', 'desc']],
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ]
});