import { ManagementClient } from 'auth0';
const auth0 = new ManagementClient({
    domain: process.env.AUTH0_MANAGEMENT_DOMAIN!,
    audience: process.env.AUTH0_MANAGEMENT_AUDIENCE,
    clientId: process.env.AUTH0_MANAGEMENT_CLIENT_ID,
    clientSecret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET,
    scope: "read:roles update:users update:users_app_metadata"
});


export { auth0 };