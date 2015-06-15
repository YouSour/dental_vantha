Clinic.TabularTable.Supplier = new Tabular.Table({
    name: "clinicSupplierList",
    collection: Clinic.Collection.Supplier,
    columns: [
        {
            title: "<i class='fa fa-bars'></i>",
            tmpl: Meteor.isClient && Template.clinic_supplierAction
        },
        {data: "_id", title: "ID"},
        {data: "name", title: "Name"},
        {data: "telephone", title: "Telephone"},
        {data: "address", title: "Address"},
        {data: "des", title: "Description"}
    ],
    order: [["1", "desc"]],
    autoWidth: false,
    columnDefs: [{"width": "12px", target: 0}]
});