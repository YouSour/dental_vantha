Dental.TabularTable.Patient = new Tabular.Table({
    name: "dentalPatientList",
    collection: Dental.Collection.Patient,
    columns: [
        {
            title: '<i class="fa fa-bars"></i>',
            tmpl: Meteor.isClient && Template.dental_patientAction
        },
        {data: "_id", title: "ID"},
        {data: "name", title: "Name"},
        {data: "gender", title: "Gender"},
        {data: "age", title: "Age"},
        {data: "address", title: "Address"},
        {data: "telephone", title: "Telephone"},
        {data: "memberId", title: "Member ID"},
        {data: "memberDate", title: "Member Date"},
        {data: "des", title: "Description"}
    ],
    autoWidth: false,
    order: [['1', 'desc']],
    columnDefs: [
        {"width": "12px", "targets": 0}
    ]
});