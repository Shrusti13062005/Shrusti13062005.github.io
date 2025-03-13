function Warning({ message, isVisible }) {
    try {
        if (!isVisible) return null;

        return (
            <div data-name="warning" className="warning-banner p-4 rounded-lg mb-4">
                <div data-name="warning-content" className="flex items-start">
                    <i className="fas fa-exclamation-circle text-red-500 mt-1 mr-3"></i>
                    <div data-name="warning-message" className="text-red-700">
                        {message}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Warning component error:', error);
        reportError(error);
        return null;
    }
}
