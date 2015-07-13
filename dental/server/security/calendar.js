// Security
Dental.Collection.Calendar.permit(['insert', 'update', 'remove'])
    .dental_ifGeneral()
    .apply();