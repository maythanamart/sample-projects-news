export class News {
    public constructor(init?: Partial<News>) {
        Object.assign(this, init);
    }
    NewsId!: number
    NameNews!: string
    Detail!: string
    Status!: number
    UpdatedDate!: Date
    ButtonView!: number
    ButtonEdit!: number
    ButtonDelete!: number
    get StatusBool() {
        return this.Status == 1 ? true: false;
    }
    set StatusBool(status: boolean) {
        this.Status = status ? 1 : 0;
    }
}