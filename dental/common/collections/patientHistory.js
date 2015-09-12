/**
 *
 * @type {Mongo.Collection}
 */
Dental.Collection.PatientHistory = new Mongo.Collection('dental_patientHistory');

/**
 *
 * @type {SimpleSchema}
 */
Dental.Schema.PatientHistory = new SimpleSchema({
    name: {
        type: String
    },
    des: {
        type: String,
        optional: true,
        label: "Description"
    }
});

/*
 * Attach Schema
 */

Dental.Collection.PatientHistory.attachSchema(Dental.Schema.PatientHistory);