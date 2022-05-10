import stripe from "@/helpers/stripe";

enum Plan {
    FREE = 'free',
    BASIC = 'basic',
    PREMIUM = 'premium',
    INSTITUTIONS = 'institutions',
}

function getPlan(plan: Plan): string {
    switch (plan) {
        case Plan.FREE:
            return 'price_1KrzuqIbK49C2Ib69gVrgWUZ';
        case Plan.BASIC:
            return 'price_1KryWNIbK49C2Ib6t1mLlHyi';
        case Plan.PREMIUM:
            return 'price_1KryYuIbK49C2Ib6rVVWwYSvM';
        case Plan.INSTITUTIONS:
            return 'price_1KryaRIbK49C2Ib6f4BFLPz5';
        default:
            return 'price_1KrzuqIbK49C2Ib69gVrgWUZ';
    }
}

async function subsribeToPlan({ plan, customerId, idempotencyKey }: { plan?: Plan; customerId: string; idempotencyKey?: string; }): Promise<import("stripe").Stripe.Response<import("stripe").Stripe.Subscription>>{

    if (plan) {
        //TODO: const planId = plan === Plan.FREE ? 'price_1KrzuqIbK49C2Ib69gVrgWUZ' : plan === Plan.BASIC ? 'price_1KryWNIbK49C2Ib6t1mLlHyi' : plan === Plan.PREMIUM ? 'price_1KryYuIbK49C2Ib6rVVWwYSvM' : plan === Plan.INSTITUTIONS ? 'price_1KryaRIbK49C2Ib6f4BFLPz5' : null;
        const planId = getPlan(plan);
        return stripe.subscriptions.create({
            customer: customerId,
            items: [{ price: planId }],
        }, {
            idempotencyKey: idempotencyKey
        });
    } else {
        return stripe.subscriptions.create({
            customer: customerId,
            items: [{ price: getPlan(Plan.FREE) }],
        }, {
            idempotencyKey: idempotencyKey
        });
    }
}

export {
    subsribeToPlan,
    Plan
}