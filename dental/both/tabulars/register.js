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
        {data: "patientId", title: "Patient"},
        {
            data: "diagnosis", title: "Diagnosis",
            render: function (val, type, doc) {
                //return JSON.stringify(val);
                var diagnosis = "";
                if (val != null) {
                    val.forEach(function (o) {
                        diagnosis +=
                            "Diagnosis Id = " + o.diagnosisId +
                            ", Qty = " + o.qty +
                            ", Price = " + o.price +
                            ", Discount = " + o.discount +
                            ", Amount = " + o.amount +
                            "<br>";
                    })
                }
                return diagnosis;
            }
        },
        {data: "total", title: "Total"},
        {data: "des", title: "Description"}
    ],
    order: [['1', 'desc']],
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ]
});