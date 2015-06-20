/**
 * Admin
 */
Security.defineMethod("dental_ifAdmin", {
    fetch: [],
    transform: null,
    deny: function (type, arg, userId) {
        return !Roles.userIsInRole(userId, ['admin'], 'Dental');
    }
});

/**
 * General
 */
Security.defineMethod("dental_ifGeneral", {
    fetch: [],
    transform: null,
    deny: function (type, arg, userId) {
        return !Roles.userIsInRole(userId, ['general'], 'Dental');
    }
});

/**
 * Reporter
 */
Security.defineMethod("dental_ifReporter", {
    fetch: [],
    transform: null,
    deny: function (type, arg, userId) {
        return !Roles.userIsInRole(userId, ['reporter'], 'Dental');
    }
});
