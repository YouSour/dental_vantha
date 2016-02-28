Meteor.methods({
  removePaitent:function(id) {
    Dental.Collection.Patient.remove(id);
  }
});
