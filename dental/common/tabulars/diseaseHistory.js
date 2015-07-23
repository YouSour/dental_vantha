Dental.TabularTable.DiseaseHistory = new Tabular.Table({
    name: 'dentalDiseaseHistoryList',
    collection: Dental.Collection.DiseaseHistory,
    columns: [
        {
            title: "<i class='fa fa-bars'></i>",
            tmpl: Meteor.isClient && Template.dental_diseaseHistoryAction
        },
        {data: "_id", title: "ID"},
        {data: "name", title: "Name"},
        {data: "des", title: "Description"}
    ],
    order: [["1", "desc"]],
    autoWidth: false,
    columnsDef: [{"width": "12px", "targets": 0}]
});