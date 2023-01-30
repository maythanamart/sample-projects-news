export interface BaseResponse<T> {
    data: T;
    successful: boolean;
}