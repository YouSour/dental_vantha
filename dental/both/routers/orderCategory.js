Router.route('dental/orderCategory', function () {
    this.render(Template.dental_orderCategory);
}, {
    name: "dental.orderCategory",
    header: {title: "orderCategory", sub: "", icon: "fa fa-shopping-cart"},
    title: "OrderCategory",
    waitOn: function () {
        return Meteor.subscribe('dentalOrderCategory');
    }
});