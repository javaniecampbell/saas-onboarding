import { ManagementClient, AuthenticationClient } from 'auth0';
import { generate } from 'generate-password'
const auth0 = new ManagementClient({
    domain: process.env.AUTH0_MANAGEMENT_DOMAIN!,
    audience: process.env.AUTH0_MANAGEMENT_AUDIENCE,
    clientId: process.env.AUTH0_MANAGEMENT_CLIENT_ID,
    clientSecret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET,
    scope: "read:roles update:users update:users_app_metadata"
});



const authClient = new AuthenticationClient({
    domain: process.env.AUTH0_MANAGEMENT_DOMAIN!,
    clientId: process.env.AUTH0_MANAGEMENT_CLIENT_ID,
    clientSecret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET,
});

async function inviteUser({ email, name, password }: { email: string, name: string, password?: string }) {
    await auth0.createUser({
        connection: "Username-Password-Authentication",
        email: email,
        email_verified: false, // this is implicitly set to true when the user follows the reset password link in the email they receive, but should be false for now
        name: name,
        password: password ?? generate({
            length: 10,
            numbers: true,
            uppercase: true,
            excludeSimilarCharacters: true,
            symbols: true,
            lowercase: true,
        }), // e.g. "npm install generate-password"
    });

    await authClient.requestChangePasswordEmail({
        email: email,
        connection: "Username-Password-Authentication",
    });
}

export { auth0, inviteUser };