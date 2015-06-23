Dental.TabularTable.Purchase = new Tabular.Table({
    name: "dentalPurchaseList",
    collection: Dental.Collection.Purchase,
    columns: [
        {
            title: "<i class='fa fa-bars'></i>",
            tmpl: Meteor.isClient && Template.dental_purchaseAction
        },
        {data: "_id", title: "ID"},
        {
            data: "purchaseDate",
            title: "Purchase Date",
            render: function (val, doc, type) {
                return moment(val).format("YYYY-MM-DD");
            }
        },
        {
            data: "supplierId",
            title: "Suppiler"
            //,
            //render: function (val, doc, type) {
            //    return labelCon(val, val, "primary");
            //}
        },
        {
            data: "registerId",
            title: "Register"
            //,
            //render: function (val, doc, type) {
            //    return labelCon(val, val, "primary");
            //}
        },
        {
            data: "items",
            title: "Purchase Detail",
            render: function (val, doc, type) {
                var purchaseDetail = "";

                val.forEach(function (obj) {
                    if (obj != null) {
                        purchaseDetail +=
                            "<label class='label label-info'>" +
                            "OrderItem Id : " + obj.OrderItemId +
                            " | Qty : " + obj.qty +
                            " | Price : " + obj.price +
                            " | Amount : " + obj.amount +
                            "</label>" + "<br>";
                    }
                });

                return purchaseDetail;
            }
        },
        {
            data: "total",
            title: "Total"
            //,
            //render: function (val, doc, type) {
            //    return labelCon(val, val, "success");
            //}
        }
    ],
    order: [["0", "desc"]],
    autoWidth: false,
    colomnDefs: [{"width": "12px", "target": 0}]
});