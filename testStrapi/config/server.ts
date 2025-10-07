 export default ({ env }) => ({
   host: env('HOST', '0.0.0.0'),

   port: env.int('PORT', 1340),
   url: env('PUBLIC_URL', 'https://kdu.projects.nnmc.kz/server'),
   app: {
     keys: env.array('APP_KEYS'),
   },
 });

//export default ({ env }) => ({
//    host: env("HOST", "0.0.0.0"),
//    url: env("PUBLIC_URL", "https://kdu.projects.nnmc.kz/server"),
//    port: env.int("PORT", 1340),
//    app: {
//        keys: env.array("APP_KEYS"),
//    },
//    webhooks: {
//        populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
//    },
//    allowedHosts: ["kdu.projects.nnmc.kz"],
//});
