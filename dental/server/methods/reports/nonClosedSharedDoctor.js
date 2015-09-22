Meteor.methods({
    dental_nonClosedShareDoctor: function (params) {
        var self = params;

        var data = {
            title: {},
            header: {},
            content: [],
            doctorContent: [],
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

        selector.status = "Close";
        selectorDoctor.status = "Close";

        if (self.branchId != "") {
            selector.branchId = self.branchId;
            selectorDoctor.branchId = self.branchId;
        }

        if (self.date != null) {
            selectorDoctor.closingDate = {
                $gte: fromDate,
                $lte: toDate
            };
            selector.closingDate = {
                $gte: fromDate,
                $lte: toDate
            };
        }
        // get Doctor
        // Dental.Collection.Doctor.find().forEach(function(objdr) {
        //   // get Register
        //   var registerContent = [];
        //   var RegisterDoc = Dental.Collection.Register.find().forEach(
        //     function(objrr) {
        //       // loop doctorShare
        //       objrr.doctorShare.forEach(objdrs) {
        //         if (objdrs.doctor == objdr._id) {
        //
        //         }
        //       }
        //     });
        // });


        if (content.length > 0) {
            data.content = content;
            return data;
        } else {
            data.content.push({
                registerId: 'no results'
            });
            return data;
        }

    }
});
