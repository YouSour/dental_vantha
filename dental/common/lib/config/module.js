/**
 * Module
 */
Module = typeof Module === 'undefined' ? {} : Module;
Meteor.isClient && Template.registerHelper('Module', Module);

Module.Dental = {
    name: 'Dental Clinic System',
    version: '0.0.1',
    summary: 'Dental Clinic System is ...',
    roles: [
        'admin',
        'general',
        'reporter'
    ]
};
