Template.dental_appointmentInfo.helpers({
    data: function () {
        var self = this;
        var data = [];
       Dental.Collection.CalendarEvent.find({registerId: self.registerId}).forEach(function(obj){
           obj.doctor = obj._doctor.name + " ("+obj._doctor.gender+")";
            data.push(obj);
        });

        return data;
    }
});