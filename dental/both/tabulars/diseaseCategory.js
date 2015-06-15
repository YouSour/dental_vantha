Clinic.TabularTable.diseaseCategory = new Tabular.Table({
    name: "clinicDiseaseCategoryList",
    collection: Clinic.Collection.diseaseCategory,
    columns: [
        {
            title: '<i class="fa fa-bars"></i>',
            tmpl: Meteor.isClient && Template.clinic_diseaseCategoryAction
        },
        {data: "_id", title: "ID"},
        {data: "name", title: "Name"}
    ],
    order: [['1', 'desc']],
    autoWidth:false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ]
});