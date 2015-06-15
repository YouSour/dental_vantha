Clinic.TabularTable.Staff = new Tabular.Table({
    name: "clinicStaffList",
    collection: Clinic.Collection.Staff,
    columns: [
        {
            title: '<i class="fa fa-bars"></i>',
            tmpl: Meteor.isClient && Template.clinic_staffAction
        },
        {data: "_id", title: "ID"},
        {data: "name", title: "Name"},
        {data: "gender", title: "Gender"},
        {data: "position", title: "Position"},
        {
            data: "startDate",
            title: "Register Date",
            render: function (val, doc, type) {
                return moment(val).format('YYYY-MM-DD');
            }
        },
        {data: "address", title: "Address"},
        {data: "telephone", title: "Telephone"}
    ],
    order: [['1', 'desc']],
    autoWidth:false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ]
});