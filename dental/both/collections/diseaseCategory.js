/**
 * Collection
 *
 * @type {Mongo.Collection}
 */
Dental.Collection.DiseaseCategory = new Mongo.Collection("dental_diseaseCategory");

/**
 * Schema
 *
 * @type {SimpleSchema}
 */
Dental.Schema.DiseaseCategory = new SimpleSchema({
    code: {
        type: String,
        unique: true,
        max: 50
    },
    name: {
        type: String,
        unique: true,
        max: 250
    },
    createdDate: {
        type: Date,
        autoValue: function () {
            if (this.isInsert) {
                return new Date();
            }
        },
        denyUpdate: true
    },
    updatedDate: {
        type: Date,
        autoValue: function () {
            return new Date();
        }
    }
});

/**
 * Attach schema
 */
Dental.Collection.DiseaseCategory.attachSchema(Dental.Schema.DiseaseCategory);
