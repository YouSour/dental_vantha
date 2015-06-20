Dental.TabularTable.Treatment = new Tabular.Table({
    name: "dentalTreatmentList",
    collection: Dental.Collection.Treatment,
    columns: [
        {
            title: "<i class='fa fa-bars'></i>",
            tmpl: Meteor.isClient && Template.dental_treatmentAction
        },
        {data: "_id", title: "ID"},
        {data: "treatmentDate", title: "Treatment Date"},
        {
            data: "staffId",
            title: "Staff",
            render: function (val, doc, type) {
                return labelCon(val, val, "primary");
            }
        },
        {
            data: "registerId",
            title: "Register ID",
            render: function (val, doc, type) {
                return labelCon(val, val, "primary");
            }
        },
        {data: "des", title: "Description"},
        {
            data: "attachFile", title: "Image",
            render: function (val, type, doc) {
                var img = Files.findOne(val);
                return '<img src="' + img.url() + '" width="45px" class="img-responsive img-thumbnail" >'
            }
        }
    ],
    order: [["1", "desc"]],
    autoWidth: false,
    columnDefs: [{width: "12px", target: 0}]
});