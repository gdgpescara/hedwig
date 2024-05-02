type IdPathParam = {
  id: string;
};

type GenericResponse = {
  message: string;
};

type ErrorResponse = {
  statusCode: number;
  code?: string;
  error: string;
  message: string;
};

export { IdPathParam, GenericResponse, ErrorResponse };
