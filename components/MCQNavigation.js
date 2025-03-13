function MCQNavigation({ currentQuestion, totalQuestions, answers, onNavigate, onSubmit }) {
    try {
        return (
            <div data-name="mcq-navigation" className="flex justify-between items-center bg-white rounded-lg shadow-sm p-4">
                <button
                    data-name="prev-button"
                    className={`px-4 py-2 rounded-lg flex items-center ${
                        currentQuestion > 0
                            ? 'bg-blue-500 text-white hover:bg-blue-600'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                    onClick={() => currentQuestion > 0 && onNavigate(currentQuestion - 1)}
                    disabled={currentQuestion === 0}
                >
                    <i className="fas fa-chevron-left mr-2"></i>
                    Previous
                </button>
                <div data-name="question-progress" className="text-gray-600">
                    Question {currentQuestion + 1} of {totalQuestions}
                </div>
                {currentQuestion < totalQuestions - 1 ? (
                    <button
                        data-name="next-button"
                        className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 flex items-center"
                        onClick={() => onNavigate(currentQuestion + 1)}
                    >
                        Next
                        <i className="fas fa-chevron-right ml-2"></i>
                    </button>
                ) : (
                    <button
                        data-name="submit-button"
                        className={`px-4 py-2 rounded-lg flex items-center ${
                            answers.every(a => a !== null)
                                ? 'bg-green-500 text-white hover:bg-green-600'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                        onClick={onSubmit}
                        disabled={!answers.every(a => a !== null)}
                    >
                        Submit
                        <i className="fas fa-check ml-2"></i>
                    </button>
                )}
            </div>
        );
    } catch (error) {
        console.error('MCQNavigation component error:', error);
        reportError(error);
        return null;
    }
}
