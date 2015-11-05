Meteor.methods({
  dental_patientHistoryList: function(params) {

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
    var branch, telephone, occupation, description;

    var branchDoc = Cpanel.Collection.Branch.findOne({
      _id: self.branchId
    });

    var patientDoc = Dental.Collection.Patient.findOne({
      _id: self.patientId
    });

    if (self.branchId != "") {
      branch = self.branchId + " | " + branchDoc.enName;
    } else {
      branch = "All";
    }

    if (!_.isUndefined(patientDoc.occupation)) {
      occupation = patientDoc.occupation;
    } else {
      occupation = "None";
    }

    if (!_.isUndefined(patientDoc.telephone)) {
      telephone = patientDoc.telephone;
    } else {
      telephone = "None";
    }

    if (!_.isUndefined(patientDoc.description)) {
      description = patientDoc.description;
    } else {
      description = "None";
    }

    data.header = [{
      col1: '<b>' + 'Branch: ' + '</b>' + branch,
      col2: '<b>' + 'Patient ID: ' + '</b>' + patientDoc._id,
      col3: '<b>' + 'Patient: ' + '</b>' + patientDoc.name + " (" +
        patientDoc.gender +
        ")",
      col3: '<b>' + 'Age: ' + '</b>' + patientDoc.age,
      col4: '<b>' + 'Occupation: ' + '</b>' + occupation,
      col5: '<b>' + 'Address: ' + '</b>' + patientDoc.address,
      col6: '<b>' + 'Telephone: ' + '</b>' + telephone,
      col7: '<b>' + 'Member: ' + '</b>' + patientDoc.member,
      col8: '<b>' + 'Description: ' + '</b>' + description
    }];

    /********** Content & Footer **********/
    var content = [];

    var selector = {};
    // var date = self.date.split(" To ");
    // var fromDate = moment(date[0] + " 00:00:00").format(
    //   "YYYY-MM-DD HH:mm:ss");
    // var toDate = moment(date[1] + " 23:59:59").format(
    //   "YYYY-MM-DD HH:mm:ss");
    // if (fromDate != null && toDate != null) selector.registerDate = {
    //   $gte: fromDate,
    //   $lte: toDate
    // };
    if (self.branchId != "") selector.branchId = self.branchId;
    if (self.patientId != "") selector.patientId = self.patientId;

    // Get register
    var getRegister = Dental.Collection.Register.find(selector);

    var index = 1;
    if (!_.isUndefined(getRegister)) {
      getRegister.forEach(function(obj) {
        obj.index = index;
        obj.patient = obj._patient.name + " (" + obj._patient.gender +
          ")";

        //loop Disease
        var disease = '';
        obj.disease.forEach(function(d) {

          var itemName = Dental.Collection.DiseaseItem.findOne(
              d.item)
            .name;

          disease += '<tr>' +
            '<td>' + itemName + '</td>' +
            '<td>' + d.qty + '</td>' +
            '<td>' + d.price + '</td>' +
            '<td>' + d.discount + '</td>' +
            '<td>' + d.amount + '</td>' +
            '</tr>'
        });

        obj.diseaseDoc = disease;

        //loop treatment
        // var treatmentIndex = 1;
        var treatment = '';
        Dental.Collection.Treatment.find({
          registerId: obj._id
        }).forEach(function(t) {

          treatment += '<tr>' +
            '<td>' + t._id + '</td>' +
            '<td>' + t.treatmentDate + '</td>' +
            '<td>' + t.doctorId + '</td>' +
            '<td>' + t._doctor.name + " (" + t._doctor.gender +
            ")" + '</td>' +
            '<td>' + t.des + '</td>' +
            '</tr>'
        });

        obj.treamentDoc = treatment;

        //loop Deposit
        var deposit = '';
        var total = 0;
        Dental.Collection.Deposit.find({
          registerId: obj._id
        }).forEach(function(d) {
          total += d.amount;
          deposit += '<tr>' +
            '<td>' + d._id + '</td>' +
            '<td>' + d.depositDate + '</td>' +
            '<td>' + d.amount + '</td>'
        });
        obj.depositDoc = deposit;

        //loop Payment
        var payment = '';
        Dental.Collection.Payment.find({
          registerId: obj._id
        }).forEach(function(p) {
          payment += '<tr>' +
            '<td>' + p._id + '</td>' +
            '<td>' + p.staffId + '</td>' +
            '<td>' + p.paymentDate + '</td>' +
            '<td>' + p.dueAmount + '</td>' +
            '<td>' + p.paidAmount + '</td>' +
            '<td>' + p.balance + '</td>' +
            '<td>' + p.des + '</td>' +
            '<td>' + p.status + '</td>' +
            '</tr>';
        });
        obj.paymentDoc = payment;

        content.push(obj);

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
