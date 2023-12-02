/**
 * Custom error class for application-specific errors.
 */
class AppError extends Error {
    public readonly message: string;
    public readonly details?: any;

    constructor(message: string, details: any = null) {
        super(message);

        this.message = message;
        this.details = details;

        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;
