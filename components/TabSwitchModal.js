function TabSwitchModal({ isVisible, onResume }) {
    try {
        if (!isVisible) return null;

        return (
            <div data-name="tab-switch-modal" className="modal-overlay">
                <div data-name="modal-content" className="modal-content">
                    <div data-name="modal-icon" className="text-red-500 text-5xl mb-4">
                        <i className="fas fa-exclamation-triangle"></i>
                    </div>
                    <h2 data-name="modal-title" className="text-2xl font-bold text-gray-800 mb-4">
                        Warning: Tab Switch Detected
                    </h2>
                    <p data-name="modal-message" className="text-gray-600 mb-6">
                        Switching tabs or applications is not allowed during the assessment. 
                        This incident has been recorded and will affect your risk score.
                    </p>
                    <button
                        data-name="resume-button"
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        onClick={onResume}
                    >
                        Resume Assessment
                    </button>
                </div>
            </div>
        );
    } catch (error) {
        console.error('TabSwitchModal component error:', error);
        reportError(error);
        return null;
    }
}
