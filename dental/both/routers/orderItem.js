Router.route('dental/orderItem',function(){
   this.render(Template.dental_orderItem);
},{
    name:"dental.orderItem",
    header:{title:"orderItem",sub:"",icon:"fa fa-shopping-cart"},
    title:"OrderItem",
    waitOn:function(){
        return Meteor.subscribe('dentalOrderItem');
    }
});