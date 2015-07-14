// Security
Dental.Collection.CalendarEvent.permit(['insert', 'update', 'remove'])
    .dental_ifGeneral()
    .apply();