/**
 *
 * @type {Mongo.Collection}
 */
Dental.Collection.DiseaseHistory = new Mongo.Collection('dental_diseaseHistory');

/**
 *
 * @type {SimpleSchema}
 */
Dental.Schema.DiseaseHistory = new SimpleSchema({
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

Dental.Collection.DiseaseHistory.attachSchema(Dental.Schema.DiseaseHistory);