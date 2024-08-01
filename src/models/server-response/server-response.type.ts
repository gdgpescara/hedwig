type ServerError<C extends string> = {
  code: C;
  message: string;
};

type ServerResponseShape = {
  status: "success" | "error";
};

export type ServerResponseSuccess<T> = ServerResponseShape & {
  status: "success";
  data: T;
};

export type ServerResponseError<T> = ServerResponseShape & {
  status: "error";
  data: T;
};

type ServerResponse<R, EC extends string> =
  | ServerResponseSuccess<R>
  | ServerResponseError<ServerError<EC>>;

export type { ServerResponse };
