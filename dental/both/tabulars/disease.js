Clinic.TabularTable.Disease = new Tabular.Table({
    name: "clinicDiseaseList",
    collection: Clinic.Collection.Disease,
    columns: [
        {
            title: '<i class="fa fa-bars"></i>',
            tmpl: Meteor.isClient && Template.clinic_diseaseAction
        },
        {data: "_id", title: "ID"},
        {data: "code", title: "Code"},
        {data: "name", title: "Name"},
        {data: "price", title: "Price"},
        {data: "memberPrice", title: "Member Price"},
        {
            data: "diseaseCategoryId",
            title: "Disease Category",
            render: function (val, type, doc) {
                var diseaseCategory = Clinic.Collection.diseaseCategory.findOne({_id: val});
                return labelCon(diseaseCategory.name, diseaseCategory.name, "primary", "");
            }
        }
    ],
    order: [['1', 'desc']],
    autoWidth:false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ]
});