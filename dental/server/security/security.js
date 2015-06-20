/**
 * Staff
 */
Dental.Collection.Staff.permit(['insert', 'update', 'remove'])
    .dental_ifGeneral()
    .apply();

/*
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
 * Expense Type
 */

Dental.Collection.expenseType.permit(['insert', 'update', 'remove'])
    .dental_ifGeneral()
    .apply();

/*
 *Expense
 */

Dental.Collection.Expense.permit(['insert', 'update', 'remove'])
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
Dental.Collection.orderCategory.permit(['insert', 'update', 'remove'])
    .dental_ifGeneral()
    .apply();

/*
 *Order Item
 */
Dental.Collection.orderItem.permit(['insert', 'update', 'remove'])
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
 *Purchase
 */
Dental.Collection.Purchase.permit(['insert', 'update', 'remove'])
    .dental_ifGeneral()
    .apply();

