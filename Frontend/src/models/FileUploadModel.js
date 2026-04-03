export class FileUploadModel {
    constructor() {
        this.config = {
            MAX_FILE_SIZE: 5 * 1024 * 1024,
            ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png']
        };
    }

    validateFile(file) {
        // Check file type
        if (!this.config.ALLOWED_TYPES.includes(file.type)) {
            return {
                isValid: false,
                message: 'Mohon pilih file gambar (JPG, PNG, JPEG)'
            };
        }

        // Check file size
        if (file.size > this.config.MAX_FILE_SIZE) {
            return {
                isValid: false,
                message: 'Ukuran file terlalu besar. Maksimal 5MB'
            };
        }

        return { isValid: true };
    }
}