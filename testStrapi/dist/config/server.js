"use strict";
// export default ({ env }) => ({
//   host: env('HOST', '0.0.0.0'),
//   port: env.int('PORT', 1337),
//   app: {
//     keys: env.array('APP_KEYS'),
//   },
// });
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ env }) => ({
    host: env("HOST", "0.0.0.0"),
    url: env("PUBLIC_URL", "https://kdu.projects.nnmc.kz/server"),
    port: env.int("PORT", 1340),
    app: {
        keys: env.array("APP_KEYS"),
    },
    webhooks: {
        populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
    },
    allowedHosts: ["kdu.projects.nnmc.kz"],
});
