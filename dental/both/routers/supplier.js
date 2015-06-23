Router.route('dental/supplier', function () {
    this.render('dental_supplier');
}, {
    name: "dental.supplier",
    header: {title: "Supplier", sub: "", icon: "fa fa-truck"},
    title: "Supplier"
});