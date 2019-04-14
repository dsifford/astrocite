export class EUtilsError extends Error {
    uid?: string;
    apiError = false;
    constructor(message: string, uid: string | true) {
        super(message);
        if (typeof uid === 'boolean') {
            this.apiError = true;
        } else {
            this.uid = uid;
        }
    }
}
