import { errorMessage } from './errorMessage';

export class CustomError extends Error {
  private errorCode: string;
  private originalError: Error | undefined;

  constructor(errorCode: string, e?: Error, addtionaMessage?: string) {
    super();
    this.errorCode = errorCode;
    this.originalError = e;
    this.message = errorCode in errorMessage ? errorMessage[errorCode] : 'unknow error';
    this.message = addtionaMessage ? this.message + addtionaMessage : this.message;
  }

  outputErrorMessage(): void {
    const loggerMessage = {
      errorType: this.originalError?.name ?? 'CustomError',
      errorCode: this.errorCode,
      errorMessage: this.message,
      errorMessageDetail: this.originalError?.message ?? '',
    };

    console.error(JSON.stringify(loggerMessage));
  }

  getErrorMessage(): { errorCode: string; errorMessage: string } {
    return {
      errorCode: this.errorCode,
      errorMessage: this.message,
    };
  }
}
