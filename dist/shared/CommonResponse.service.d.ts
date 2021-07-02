export declare class CommonResponseFactory {
    create<T>(data: T): CommonResponse<T>;
}
export interface CommonResponse<T> {
    success: boolean;
    data: T;
}
