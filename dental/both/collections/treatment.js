Images = new FS.Collection('images', {
    stores: [new FS.Store.GridFS("images", {})]
});

/**
 *
 * @type {Mongo.Collection}
 */
Clinic.Collection.Treatment = new Mongo.Collection('clinic_treatment');

/**
 *
 * @type {SimpleSchema}
 */
Clinic.Schema.Treatment = new SimpleSchema({
    treatmentDate: {
        type: String,
        label: "Treatment Date",
        defaultValue: function () {
            var currentDate = moment(ReactiveMethod.call("currentDate"), 'YYYY-MM-DD H:mm:ss').format('YYYY-MM-DD H:mm:ss');
            return currentDate;
        }
    },
    staffId: {
        type: String,
        label: "Staff",
        autoform: {
            type: "select2",
            options: function () {
                return Clinic.List.staff();
            }
        }
    },
    registerId: {
        type: String,
        label: "Register ID",
        autoform: {
            type: "select2",
            options: function () {
                return Clinic.List.register();
            }
        }
    },
    des: {
        type: String,
        label: "Description"
    },
    attachFile: {
        type: String,
        autoform: {
            afFieldInput: {
                type: 'fileUpload',
                collection: 'Images'
            }
        },
        label: 'Choose file'
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

Clinic.Collection.Treatment.attachSchema(Clinic.Schema.Treatment);

Images.allow({
    insert: function (userId, doc) {
        return true;
    },
    update: function (userId, doc) {
        return true;
    },
    remove: function (userId, doc) {
        return true;
    },
    download: function (userId, doc) {
        return true;
    }
});