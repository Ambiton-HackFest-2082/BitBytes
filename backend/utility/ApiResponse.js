class ApiResponse {
    constructor(message, data, statusCode) {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = true;
    }
}
export { ApiResponse };
