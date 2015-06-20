Files = new FS.Collection('images', {
    stores: [new FS.Store.GridFS("images", {})]
});

/**
 *
 * @type {Mongo.Collection}
 */
Dental.Collection.Treatment = new Mongo.Collection('dental_treatment');

/**
 *
 * @type {SimpleSchema}
 */
Dental.Schema.Treatment = new SimpleSchema({
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
                return Dental.List.staff();
            }
        }
    },
    registerId: {
        type: String,
        label: "Register ID",
        autoform: {
            type: "select2",
            options: function () {
                return Dental.List.register();
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
                collection: 'Files'
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

Dental.Collection.Treatment.attachSchema(Dental.Schema.Treatment);