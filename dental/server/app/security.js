/**
 * Admin
 */
Security.defineMethod("clinicIfAdmin", {
    fetch: [],
    transform: null,
    deny: function (type, arg, userId) {
        return !Roles.userIsInRole(userId, ['admin'], 'Clinic');
    }
});

/**
 * General
 */
Security.defineMethod("clinicIfGeneral", {
    fetch: [],
    transform: null,
    deny: function (type, arg, userId) {
        return !Roles.userIsInRole(userId, ['general'], 'Clinic');
    }
});

/**
 * Reporter
 */
Security.defineMethod("clinicIfReporter", {
    fetch: [],
    transform: null,
    deny: function (type, arg, userId) {
        return !Roles.userIsInRole(userId, ['reporter'], 'Clinic');
    }
});
