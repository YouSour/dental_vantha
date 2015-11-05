Dental.Collection.Purchase.cacheDoc('supplier',Dental.Collection.Supplier,['name','telephone','address'],{
   refField:"supplierId"
});

Dental.Collection.Purchase.cacheDoc('register',Dental.Collection.Register,['patientId','registerDate','des','_patient'],{
    refField:"registerId"
});

Dental.Collection.Purchase.cacheArrayField('items');