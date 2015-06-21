Router.route('dental/orderItem', function () {
    this.render('dental_orderItem');
}, {
    name: "dental.orderItem",
    header: {title: "Order Item", sub: "", icon: "fa fa-shopping-cart"},
    title: "Order Item"
});