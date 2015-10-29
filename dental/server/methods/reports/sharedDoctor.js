Meteor.methods({
  dental_sharedDoctor: function(params) {
    var self = params;

    var data = {
      title: {},
      header: {},
      content: [],
      deposit: [],
      footer: {}
    };

    /********* Title *********/
    var company = Cpanel.Collection.Company.findOne();
    data.title = {
      company: company,
      date: self.date
    };

    /********* Header ********/
    var branch;

    var branchDoc = Cpanel.Collection.Branch.findOne({
      _id: self.branchId
    });

    if (self.branchId != "") {
      branch = self.branchId + " | " + branchDoc.enName;
    } else {
      branch = "All";
    }

    data.header = [{
      col1: 'Branch: ' + branch
    }];

    /********** Content & Footer **********/

    var selectorDoctor = {};
    var selector = {};

    var date = self.date.split(" To ");

    var fromDate = moment(date[0] + " 00:00:00").format(
      "YYYY-MM-DD HH:mm:ss");
    var toDate = moment(date[1] + " 23:59:59").format(
      "YYYY-MM-DD HH:mm:ss");

    // selector.status = "Close";
    // selectorDoctor.status = "Close";

    var selectorPayment = {};
    var selectorDeposite = {};



    if (self.branchId != "") {
      selector.branchId = self.branchId;
      selectorDoctor.branchId = self.branchId;
      selectorPayment.branchId = self.branchId;
      selectorDeposite.branchId = self.branchId;
    }

    if (self.date != null) {
      // selectorDoctor.closingDate = {
      //   $gte: fromDate,
      //   $lte: toDate
      // };
      // selector.closingDate = {
      //   $gte: fromDate,
      //   $lte: toDate
      // };
      selectorPayment.paymentDate = {
        $gte: fromDate,
        $lte: toDate
      };
      selectorDeposite.depositDate = {
        $gte: fromDate,
        $lte: toDate
      };
    }



    var paymentDoc = Dental.Collection.Payment.find(selectorPayment);
    var depositeDoc = Dental.Collection.Deposit.find(selectorDeposite);

    var shareDoc = [];
    var registerId = [];


    paymentDoc.forEach(function(payDoc) {
      registerId.push(payDoc.registerId);
      shareDoc.push({
        registerId: payDoc.registerId,
        amount: payDoc.paidAmount
      });
    })

    depositeDoc.forEach(function(depDoc) {
      registerId.push(depDoc.registerId);
      shareDoc.push({
        registerId: depDoc.registerId,
        amount: depDoc.amount
      });
    });


    selector._id = {
      $in: registerId
    };



    var doctorList = Dental.Collection.Register.aggregate([{
      $unwind: "$doctorShare"
    }, {
      $match: selectorDoctor
    }, {
      $group: {
        _id: {
          doctorId: "$doctorShare.doctor",
        },
        amount: {
          $sum: "$doctorShare.amount"
        }
      }
    }, {
      $sort: {
        "_id.doctorId": 1
      }
    }]);

    var content = [];
    doctorList.forEach(function(doctorObj) {
      selector['doctorShare.doctor'] = doctorObj._id.doctorId;
      var results = Dental.Collection.Register.find(selector);

      var doctorDoc = Dental.Collection.Doctor.findOne({
        _id: doctorObj._id.doctorId
      });

      content.push({
        isHeader: true,
        isFooter: false,
        doctorId: doctorObj._id.doctorId + " : " + doctorDoc.name
          // ,
          // totalAmount: doctorObj.amount
      });

      var totalAmount = 0;
      var totalAmountBeforeDateFinal = 0;
      results.forEach(function(obj) {
        var detailObj = {};
        var paidAmount = 0;
        var paidAmountTotal = 0;
        var depositAmount = 0;
        var depositAmountTotal = 0;
        var paidAmountTotalBeforeDate = 0;
        var depositAmountTotalBeforeDate = 0;

        detailObj.registerId = obj._id;
        detailObj.date = obj.registerDate;
        detailObj.patient = obj.patientId + ' : ' + obj._patient.name +
          ' (' + obj._patient.gender + ')';
        detailObj.subTotal = obj.subTotal;
        // detailObj.deposit = obj.deposit;
        detailObj.subDiscount = obj.subDiscount;
        detailObj.totalDue = obj.total;
        detailObj.invoiceAmount = obj.subTotal - obj.subDiscount;

        // Amount Pay until the end of Date Filter
        Dental.Collection.Payment.find({
          registerId: obj._id,
          paymentDate: {
            $lte: toDate
          }
        }).forEach(function(obj) {
          paidAmountTotal += obj.paidAmount;
        });
        // Amount Pay Before Date Filter
        Dental.Collection.Payment.find({
          registerId: obj._id,
          paymentDate: {
            $lt: fromDate
          }
        }).forEach(function(obj) {
          paidAmountTotalBeforeDate += obj.paidAmount;
        });

        // Amount Pay at Date Filter
        selectorPayment.registerId = obj._id;
        Dental.Collection.Payment.find(
          selectorPayment
        ).forEach(function(obj) {
          paidAmount += obj.paidAmount;
        });

        // Amount Deposit Until the end Date Filter
        Dental.Collection.Deposit.find({
          registerId: obj._id,
          depositDate: {
            $lte: toDate
          }
        }).forEach(function(obj) {
          depositAmountTotal += obj.amount;
        });
        // Amount Deposit Before Date Filter
        Dental.Collection.Deposit.find({
          registerId: obj._id,
          depositDate: {
            $lt: fromDate
          }
        }).forEach(function(obj) {
          depositAmountTotalBeforeDate += obj.amount;
        });
        // Amount Deposit at Date Filter
        selectorDeposite.registerId = obj._id;
        Dental.Collection
          .Deposit.find(
            selectorDeposite
          ).forEach(function(obj) {
            depositAmount += obj.amount;
          });


        detailObj.paidAmount = paidAmount;
        detailObj.deposit =
          depositAmount;
        detailObj.closedDate = obj.closingDate;
        var totalAmountFinal = 0;
        var totalAmountBeforeDate = 0;

        var amountPay = detailObj.paidAmount + depositAmount;
        var amountPayTotal = paidAmountTotal +
          depositAmountTotal;

        var amountPayBeforeDate = paidAmountTotalBeforeDate +
          depositAmountTotalBeforeDate;

        var amountPayAtTime = amountPayTotal - amountPay;
        obj.doctorShare.forEach(function(ob) {
          if (ob.doctor == doctorObj._id.doctorId) {
            detailObj.invoiceShare = ob.amount;
          }
          //  Amount Share
          if (ob.amount > amountPayAtTime) {
            var amountRule = ob.amount - amountPayAtTime;
          } else {
            var amountRule = 0;
            amountPayAtTime = amountPayAtTime - ob.amount;
          }

          if (amountPay < amountRule) {
            totalAmountFinal = amountPay;
            amountRule = amountRule - amountPay;
            amountPay = amountPay - amountPay;
          } else {
            totalAmountFinal = amountRule;
            amountPay = amountPay - amountRule;
          }

          // Amount Share Before Date


          var amountRuleBeforDate = ob.amount;

          if (amountPayBeforeDate < amountRuleBeforDate) {
            totalAmountBeforeDate = amountPayBeforeDate;
            amountRuleBeforDate = amountRuleBeforDate -
              amountPayBeforeDate;
            amountPayBeforeDate = amountPayBeforeDate -
              amountPayBeforeDate;
          } else {
            totalAmountBeforeDate = amountRuleBeforDate;
            amountPayBeforeDate = amountPayBeforeDate -
              amountRuleBeforDate;
          }

          // Check With Doctor Id
          if (ob.doctor == doctorObj._id.doctorId) {
            detailObj.isHeader = false,
              detailObj.isFooter = false,
              detailObj.amount = totalAmountFinal;
            detailObj.amountBeforeDate =
              totalAmountBeforeDate;
            totalAmount += totalAmountFinal;
            totalAmountBeforeDateFinal +=
              totalAmountBeforeDate;
          }
        });

        content.push(detailObj);

      });
      content.push({
        isFooter: true,
        isHeader: false,
        totalAmount: totalAmount,
        totalAmountBeforeDateFinal: totalAmountBeforeDateFinal
      });
    });

    if (content.length > 0) {
      data.content = content;
      return data;
    } else {
      data.content.push({
        registerId: 'no results'
      });
      return data;
    }

  },

});
