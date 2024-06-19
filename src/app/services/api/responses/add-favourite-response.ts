export class AddFavouriteResponse {
    public added: boolean = null;

    constructor(data: AddFavouriteResponse) {
        if (data.added) {
            this.added = data.added;
        }
    }
}
