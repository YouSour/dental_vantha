Meteor.methods({
  dental_registerByDiseaseList: function(params) {

    var self = params;
    var data = {
      title: {},
      header: [],
      content: [],
      footer: [],
      deposit: []
    };

    /********* Title *********/
    var company = Cpanel.Collection.Company.findOne();
    data.title = {
      company: company,
      date: self.date
    };

    /********* Header ********/

    var branch, disease;

    var branchDoc = Cpanel.Collection.Branch.findOne({
      _id: self.branchId
    });

    var diseaseDoc = Dental.Collection.DiseaseItem.findOne({
      _id: self.diseaseItemId
    });

    if (self.branchId != "") {
      branch = self.branchId + " | " + branchDoc.enName;
    } else {
      branch = "All";
    }

    if (self.diseaseItemId != "") {
      disease = self.diseaseItemId + " | " + diseaseDoc.name;
    }

    data.header = [{
      col1: '<b>' + 'Branch: ' + '</b>' + branch,
      col2: '<b>' + 'Doisease Item ID: ' + '</b>' + disease
    }];

    /********** Content & Footer **********/
    var content = [];

    var selector = {};
    var date = self.date.split(" To ");
    var fromDate = moment(date[0] + " 00:00:00").format(
      "YYYY-MM-DD HH:mm:ss");
    var toDate = moment(date[1] + " 23:59:59").format(
      "YYYY-MM-DD HH:mm:ss");
    if (fromDate != null && toDate != null) selector.registerDate = {
      $gte: fromDate,
      $lte: toDate
    };
    if (self.branchId != "") selector.branchId = self.branchId;

    // Get register
    var getRegister = Dental.Collection.Register.find(selector);

    var index = 1;

    if (!_.isUndefined(getRegister)) {
      getRegister.forEach(function(obj) {
        obj.index = index;
        obj.patient = obj._patient.name + " (" + obj._patient.gender +
          ")";

        if (!_.isUndefined(obj._patient.age)) {
          obj.age = obj._patient.age;
        } else {
          obj.age = "None";
        }

        if (!_.isUndefined(obj._patient.address)) {
          obj.address = obj._patient.address;
        } else {
          obj.address = "None";
        }

        if (!_.isUndefined(obj._patient.telephone)) {
          obj.telephone = obj._patient.telephone;
        } else {
          obj.telephone = "None";
        }

        if (!_.isUndefined(obj.des)) {
          obj.description = obj.des;
        } else {
          obj.description = "None";
        }

        //loop Disease
        var diseaseId = '';
        obj.disease.forEach(function(d) {
          diseaseId = d.item;
          if (diseaseId == self.diseaseItemId) {
            content.push(obj);
          }
        });

        index += 1;
      });
    }

    if (content.length > 0) {
      data.content = content;

      return data;
    } else {
      data.content.push({
        index: 'no results'
      });
      return data;
    }
  }
});
