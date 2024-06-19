export class RemovedFavouriteResponse {
    public removed: boolean = null;

    constructor(data: RemovedFavouriteResponse) {
        if (data.removed) {
            this.removed = data.removed;
        }
    }
}
