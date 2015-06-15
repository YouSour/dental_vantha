Router.route('clinic/orderItem',function(){
   this.render(Template.clinic_orderItem);
},{
    name:"clinic.orderItem",
    header:{title:"orderItem",sub:"",icon:"fa fa-shopping-cart"},
    title:"OrderItem",
    waitOn:function(){
        return Meteor.subscribe('clinicOrderItem');
    }
});