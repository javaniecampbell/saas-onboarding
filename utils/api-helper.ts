import { NextApiRequest, NextApiResponse } from 'next'

interface Context {
    req: NextApiRequest;
    res: NextApiResponse;
}

interface ApiParams {
    // callback: ApiFnCallback;
    // elseCallback?: ApiElseFnCallback;
    onSuccess: ApiFnCallback;
    onFailure?: ApiElseFnCallback;
}

type ApiFnCallback = (req: NextApiRequest, res: NextApiResponse) => void;
type ApiElseFnCallback = (res: NextApiResponse) => void;
class ApiHelper {
    private req: NextApiRequest;
    private res: NextApiResponse;
    constructor({ req, res }: Context) {
        this.req = req;
        this.res = res;
    }
    private request(method: String, callback: ApiFnCallback, elseCallback?: ApiElseFnCallback) {
        if (this.req.method === method.toUpperCase()) {
            callback(this.req, this.res);
        } else {
            if (elseCallback) {
                elseCallback(this.res);
                return;
            }
            this.res.setHeader('Allow', method.toUpperCase());
            this.res.status(405).end('Method Not Alowed');
        }
    }
    // public post(params: ApiParams) {
    //     this.request("post", params.callback, params.elseCallback);
    // }

    // public get(params: ApiParams) {
    //     this.request("get", params.callback, params.elseCallback);
    // }

    public post(callback:ApiFnCallback, elseCallback?:ApiElseFnCallback) {
        this.request("post", callback, elseCallback);
    }

    public get(callback:ApiFnCallback, elseCallback?:ApiElseFnCallback) {
        this.request("get", callback, elseCallback);
    }

}

function createApiHelper(req: NextApiRequest, res: NextApiResponse) {
    return new ApiHelper({ req, res });
}
export default ApiHelper;
export { ApiHelper, createApiHelper }; 