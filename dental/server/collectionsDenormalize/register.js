// Collection
Dental.Collection.Register.cacheDoc(
    'patient',
    Dental.Collection.Patient,
    ['name', 'gender', 'age', 'address', 'telephone', 'member', 'des', 'photo'],
    {
        referenceField: 'patientId'
    }
);
