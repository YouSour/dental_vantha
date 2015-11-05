// Collection
Dental.Collection.Treatment.cacheDoc(
    'register',
    Dental.Collection.Register,
    ['registerDate', 'des', 'patientId', '_patient']
);

Dental.Collection.Treatment.cacheDoc(
    'doctor',
    Dental.Collection.Doctor,
    ['name', 'gender', 'address', 'startDate', 'telephone', 'photo']
);
