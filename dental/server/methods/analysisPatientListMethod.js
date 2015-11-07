Meteor.methods({
  analysisPatient: function(selector) {
    var data = Dental.Collection.Register.aggregate([{
      $unwind: "$disease"
    }, {
      $match: selector
    }, {
      $group: {
        _id: {
          item: "$disease.item"
        },
        total: {
          $sum: 1
        }
      }
    }, {
      $sort: {
        "_id.item": 1
      }
    }]);

    return data;

  }
});
