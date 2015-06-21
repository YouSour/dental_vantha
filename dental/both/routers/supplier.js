Router.route('dental/supplier', function () {
    this.render(Template.dental_supplier);
}, {
    name: "dental.supplier",
    header: {title: "Supplier", sub: "", icon: "fa fa-truck"},
    title: "Supplier"
});