export interface Response<DataType> {
    data: DataType;
    status: number;
    message: string;
}