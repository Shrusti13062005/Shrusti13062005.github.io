function AssessmentArea({ onInput }) {
    try {
        const handleCopyPaste = (e) => {
            e.preventDefault();
            window.behaviorTracker?.copyPaste();
        };

        return (
            <div data-name="assessment-area" className="bg-white rounded-lg shadow-sm p-4">
                <h2 data-name="assessment-title" className="text-lg font-semibold mb-4">
                    Assessment Area
                </h2>
                <textarea
                    data-name="assessment-input"
                    className="assessment-textarea w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type your answer here..."
                    onInput={onInput}
                    onCopy={handleCopyPaste}
                    onPaste={handleCopyPaste}
                    onCut={handleCopyPaste}
                ></textarea>
                <div data-name="assessment-instructions" className="mt-2 text-sm text-gray-600">
                    <p>Please stay within this tab while completing your assessment.</p>
                    <p className="text-red-600">Important:</p>
                    <ul className="list-disc ml-5 text-red-600">
                        <li>Switching tabs or applications is not allowed</li>
                        <li>Copy and paste actions are not allowed</li>
                        <li>All violations will increase your risk score</li>
                    </ul>
                </div>
            </div>
        );
    } catch (error) {
        console.error('AssessmentArea component error:', error);
        reportError(error);
        return null;
    }
}
