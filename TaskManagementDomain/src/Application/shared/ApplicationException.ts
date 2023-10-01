export class ApplicationException extends Error {
  readonly status: number;
  readonly code: string;

  constructor(message: string, status = 400, code = 'bad_request') {
    super(message);

    this.name = 'ApplicationException';
    this.status = status;
    this.code = code;

    Object.setPrototypeOf(this, ApplicationException.prototype);
  }
}
