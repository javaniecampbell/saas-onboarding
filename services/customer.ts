import stripe from "@/helpers/stripe";

interface CreateCustomer {
    email: string
    firstName?: string
    lastName?: string
    auth0Id?: string
}

async function createStripeCustomer({ email, ...params }: CreateCustomer) {
    let input = {
        email: email,
        first_name: '',
        last_name: '',
    };
    if (params.firstName) {
        input.first_name = params.firstName;
    }

    if (params.lastName) {
        input.last_name = params.lastName;
    }

    const customer = await stripe.customers.create({
        email: input.email,
        name: input.first_name + ' ' + input.last_name,
        description: 'Customer for generated for SaaS Onboarding Platform',
        metadata: {
            auth0Id: params?.auth0Id!,
            firstName: input.first_name,
            lastName: input.last_name,
        }
    }, {
        idempotencyKey: params?.auth0Id,
    });
    return { customer };
}
async function findCustomer({ id }: { id: string }) {
    const customer = await stripe.customers.retrieve(id);
    if (!customer) {
        throw new Error('Customer not found');
    }
    return customer;
}
export {
    createStripeCustomer,
    findCustomer
}