export class AxiosResponse<T> {
  data!:T;
  status!: number;
  statusText!: string;
}