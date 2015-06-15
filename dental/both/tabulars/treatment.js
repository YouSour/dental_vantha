Clinic.TabularTable.Treatment = new Tabular.Table({
    name: "clinicTreatmentList",
    collection: Clinic.Collection.Treatment,
    columns: [
        {
            title: "<i class='fa fa-bars'></i>",
            tmpl: Meteor.isClient && Template.clinic_treatmentAction
        },
        {data: "_id", title: "ID"},
        {data: "treatmentDate", title: "Treatment Date"},
        {data: "staffId", title: "Staff"},
        {data: "registerId", title: "Register ID"},
        {data: "des", title: "Description"},
        {data: "attachFile", title: "Image",
        render:function(val,type,doc){
            var img=Images.findOne(val);
            return '<img src="'+img.url()+'" width="45px" class="img-responsive img-thumbnail" >'
        }}
    ],
    order: [["1", "desc"]],
    autoWidth: false,
    columnDefs: [{width: "12px", target: 0}]
});