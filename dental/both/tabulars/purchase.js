Clinic.TabularTable.Purchase = new Tabular.Table({
    name: "clinicPurchaseList",
    collection: Clinic.Collection.Purchase,
    columns: [
        {
            title: "<i class='fa fa-bars'></i>",
            tmpl: Meteor.isClient && Template.clinic_purchaseAction
        },
        {data: "_id", title: "ID"},
        {
            data: "purchaseDate",
            title: "Purchase Date",
            render: function (val, doc, type) {
                return moment(val).format("YYYY-MM-DD");
            }
        },
        {data: "supplierId", title: "Suppiler"},
        {data: "registerId", title: "Register"},
        {
            data: "items",
            title: "Purchase Detail",
            render: function (val, doc, type) {
                var purchaseDetail = "";

                val.forEach(function (obj) {
                    if (obj != null) {
                        purchaseDetail +=
                            "<label class='label label-info'>"+
                            "OrderItem Id : " + obj.orderItemId +
                            " | Qty : " + obj.qty +
                            " | Price : " + obj.price +
                            " | Amount : " + obj.amount +
                            "</label>"+"<br>";
                    }
                });

                return purchaseDetail ;
            }
        },
        {
            data: "total",
            title: "Total",
            render: function (val,doc,type) {
                return labelCon(val , val ,"success");
            }
        }
    ],
    order: [["0", "desc"]],
    autoWidth: false,
    colomnDefs: [{"width": "12px", "target": 0}]
});