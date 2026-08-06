export interface ApiResponse<T> {
  success: boolean;
  data: T; // work for every return types. like string,list etc,
}
