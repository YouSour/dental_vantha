/**
 * Staff
 */
Dental.Collection.Staff.permit(['insert', 'update', 'remove'])
    .dental_ifGeneral()
    .apply();

/**
 * Doctor
 */
Dental.Collection.Doctor.permit(['insert', 'update', 'remove'])
    .dental_ifGeneral()
    .apply();

/**
 * Disease Category
 */

Dental.Collection.DiseaseCategory.permit(['insert', 'update', 'remove'])
    .dental_ifGeneral()
    .apply();

/*
 * Disease Item
 */

Dental.Collection.DiseaseItem.permit(['insert', 'update', 'remove'])
    .dental_ifAdmin()
    .apply();

/*
 * Patient
 */

Dental.Collection.Patient.permit(['insert', 'update', 'remove'])
    .dental_ifGeneral()
    .apply();

/*
 *Supplier
 */
Dental.Collection.Supplier.permit(['insert', 'update', 'remove'])
    .dental_ifGeneral()
    .apply();

/*
 * Order Category
 */
Dental.Collection.OrderCategory.permit(['insert', 'update', 'remove'])
    .dental_ifGeneral()
    .apply();

/*
 *Order Item
 */
Dental.Collection.OrderItem.permit(['insert', 'update', 'remove'])
    .dental_ifGeneral()
    .apply();

/*
 *Register
 */
Dental.Collection.Register.permit(['insert', 'update', 'remove'])
    .dental_ifGeneral()
    .apply();

/*
 *Treatment
 */
Dental.Collection.Treatment.permit(['insert', 'update', 'remove'])
    .dental_ifGeneral().
    apply();

/*
 *Deposit
 */
Dental.Collection.Deposit.permit(['insert', 'update', 'remove'])
    .dental_ifGeneral()
    .apply();

/*
 * Invoice
 */
Dental.Collection.Invoice.permit(['insert', 'update', 'remove'])
    .dental_ifGeneral()
    .apply();

/*
 *Purchase
 */
Dental.Collection.Purchase.permit(['insert', 'update', 'remove'])
    .dental_ifGeneral()
    .apply();

/**
 * Payment
 */
Dental.Collection.Payment.permit(['insert', 'update', 'remove'])
    .dental_ifGeneral()
    .apply();

