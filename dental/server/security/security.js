/**
 * Customer
 */
//Sample.Collection.Customer.permit(['insert', 'update', 'remove'])
//    .sampleIfGeneral()
//    .apply();

/**
 * Staff
 */
Clinic.Collection.Staff.permit(['insert', 'update', 'remove'])
    .clinicIfGeneral()
    .apply();

/*
 * DiseaseCategory
 */

Clinic.Collection.diseaseCategory.permit(['insert', 'update', 'remove'])
    .clinicIfGeneral()
    .apply();

/*
 * Disease
 */

Clinic.Collection.Disease.permit(['insert', 'update', 'remove'])
    .clinicIfAdmin()
    .apply();

/*
 * Patient
 */

Clinic.Collection.Patient.permit(['insert', 'update', 'remove'])
    .clinicIfGeneral()
    .apply();

/*
 * Expense Type
 */

Clinic.Collection.expenseType.permit(['insert', 'update', 'remove'])
    .clinicIfGeneral()
    .apply();

/*
 *Expense
 */

Clinic.Collection.Expense.permit(['insert', 'update', 'remove'])
    .clinicIfGeneral()
    .apply();

/*
 *Supplier
 */
Clinic.Collection.Supplier.permit(['insert', 'update', 'remove'])
    .clinicIfGeneral()
    .apply();

/*
 * Order Category
 */
Clinic.Collection.orderCategory.permit(['insert', 'update', 'remove'])
    .clinicIfGeneral()
    .apply();

/*
 *Order Item
 */
Clinic.Collection.orderItem.permit(['insert', 'update', 'remove'])
    .clinicIfGeneral()
    .apply();

/*
 *Register
 */
Clinic.Collection.Register.permit(['insert', 'update', 'remove'])
    .clinicIfGeneral()
    .apply();

/*
 *Treatment
 */
Clinic.Collection.Treatment.permit(['insert', 'update', 'remove'])
    .clinicIfGeneral().
    apply();

/*
 *Deposit
 */
Clinic.Collection.Deposit.permit(['insert', 'update', 'remove'])
    .clinicIfGeneral()
    .apply();

/*
 *Purchase
 */
Clinic.Collection.Purchase.permit(['insert', 'update', 'remove'])
    .clinicIfGeneral()
    .apply();

