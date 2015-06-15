Router.route('clinic/supplier', function () {
    this.render(Template.clinic_supplier);
}, {
    name: "clinic.supplier",
    header: {title: "Supplier", sub: "", icon: "fa fa-truck"},
    title: "Supplier",
    waitOn: function () {
        return Meteor.subscribe('clinicSupplier');
    }
});