import client from "./http-client";

export const createData = (params: any, cb: any, errCb: any) => {
    client.post('polindrom', params)
        .then((res: any) => {
            cb(res);
        })
        .catch(e => {
            errCb(e);
        })
};

export const getData = (params: any, cb: any, errCb: any) => {
    client.post('polindrom', {params})
        .then((res: any) => {
            cb(res);
        })
        .catch(e => {
            errCb(e);
        })
};
