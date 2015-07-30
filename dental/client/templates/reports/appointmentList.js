Dental.ListForReportState = new ReactiveObj();
/************ Form *************/
Template.dental_appointmentListReport.onCreated(function () {
    createNewAlertify('exchange');
});

Template.dental_appointmentListReport.onRendered(function () {
    var name = $('[name="date"]');
    DateTimePicker.dateRange(name);
});

Template.dental_appointmentListReport.events({
    'click .exchangeAddon': function (e, t) {
        alertify.exchange(fa("plus", "Exchange"), renderTemplate(Template.cpanel_exchangeInsert));
    }
});

/************ Generate *************/
Template.dental_appointmentListReportGen.helpers({
    data: function () {
        var self = this;
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

        var branch,doctor;

        var branchDoc = Cpanel.Collection.Branch.findOne({_id:self.branchId});
        var doctorDoc = Dental.Collection.Doctor.findOne({_id:self.doctorId});

        if (self.branchId != "") {branch = self.branchId+" | "+branchDoc.enName} else {branch = "All";}
        if (self.doctorId != "") {doctor = self.doctorId+" | "+doctorDoc.name} else {doctor = "All";}


        data.header = [
            {col1: 'Branch: ' + branch, col2:'', col3:'Doctor: '+ doctor}
        ];

        /********** Content & Footer **********/
        var content = [];

        var selector = {};

        var date = self.date.split(" To ");
        var fromDate = moment(date[0] + " 00:00:00").format("YYYY-MM-DD HH:mm:ss");
        var toDate = moment(date[1] + " 23:59:59").format("YYYY-MM-DD HH:mm:ss");
        if (fromDate != null && toDate != null) selector.start = {$gte: fromDate, $lte: toDate};
        if (self.branchId != "") selector.branchId = self.branchId;
        if (self.doctorId != "") selector.doctorId = self.doctorId;

        // Get Appointment
        var getAppointment = Dental.Collection.CalendarEvent.find(selector);

        var index = 1;

        if (!_.isUndefined(getAppointment)) {
            getAppointment.forEach(function (obj) {
                obj.index = index;
                obj.doctor = obj.doctorId + " : " + obj._doctor.name + " (" + obj._doctor.gender + ")";
                obj.patient = obj._register.patientId + " : " + obj._register._patient.name + " (" + obj._register._patient.gender + ")";

                if(!_.isUndefined(obj._register._patient.telephone)) {
                    obj.telephone = obj._register._patient.telephone;
                }else{
                    obj.telephone = "None";
                }

                content.push(obj);

                index += 1;
            });
        }

        if (content.length > 0) {
            data.content = content;

            return data;
        } else {
            data.content.push({index: 'no results'});
            return data;
        }
    }
});