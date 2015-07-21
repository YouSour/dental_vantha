/**
 * Created by sour on 7/16/15.
 */
Template.dental_navbar.onRendered(function () {
    setInterval(function(){

    var alertDate = moment().format('YYYY-MM-DD HH:mm:ss');
    var endDate = moment().format('YYYY-MM-DD') + ' 23:59:59';
    var numberOfAppointment = appointmentCount(alertDate, endDate);
    $('#appointmentCount').text(numberOfAppointment);
    },1000);


});

Template.dental_navbar.helpers({
    appointmentCount: function () {

        var alertDate = moment().format('YYYY-MM-DD HH:mm:ss');
        var endDate = moment().format('YYYY-MM-DD') + ' 23:59:59';

        return appointmentCount(alertDate, endDate);
    },
    appointmentDoc: function () {
        var alertDate = moment().format('YYYY-MM-DD HH:mm:ss');
        var endDate = moment().format('YYYY-MM-DD') + ' 23:59:59';
        var calList = [];

        var calendar = Dental.Collection.CalendarEvent.find({start: {$gte: alertDate, $lte: endDate}});

        calendar.forEach(function (c) {
            var patientPhoto = c._register._patient.photo;
            if (!_.isUndefined(patientPhoto)) {
                c.image = Files.findOne(patientPhoto).url();
            }
            c.time = moment(c.start).format('h:mm:ss a');
            calList.push(c);
        });

        return calList;
    }

});

function appointmentCount(alertDate, endDate) {
    return Dental.Collection.CalendarEvent.find({start: {$gte: alertDate, $lte: endDate}}).count();
}

