namespace NodeJS {
    interface ProcessEnv {
        /**
         * Path to the .well-known/openid-configuration.
         */
        AUTH_OPENID_CONFIGURATION: string;
        AUTH_AUTHORIZE: string;
        AUTH_TOKEN: string;
        AUTH_ISSUER: string;
        AUTH_CLIENT_ID: string;

        /**
         * Secret used by next-auth/auth.js in order to encrypt the session.
         */
        AUTH_SECRET: string;

        /**
         * Path to the confirmate REST API endpoint.
         */
        CONFIRMATE_REST_API: string;

        /**
         * Whether to enable the CSAF UI plugin.
         */
        PLUGIN_CSAF_ENABLE: boolean;

        /**
         * Path to the CSAF generator API.
         */
        PLUGIN_CSAF_API_BASE: string;
    }
}