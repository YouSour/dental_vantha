Router.route('clinic/orderCategory', function () {
    this.render(Template.clinic_orderCategory);
}, {
    name: "clinic.orderCategory",
    header: {title: "orderCategory", sub: "", icon: "fa fa-shopping-cart"},
    title: "OrderCategory",
    waitOn: function () {
        return Meteor.subscribe('clinicOrderCategory');
    }
});