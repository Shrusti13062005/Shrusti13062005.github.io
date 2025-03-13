function MCQQuestion({ question, selectedAnswer, onAnswerSelect }) {
    try {
        return (
            <div data-name="mcq-question" className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h3 data-name="question-text" className="text-xl text-gray-800 mb-4">
                    {question.text}
                </h3>
                <div data-name="options-list" className="space-y-3">
                    {question.options.map((option, index) => (
                        <div
                            key={index}
                            data-name={`option-${index}`}
                            className={`option-hover p-4 rounded-lg cursor-pointer border-2 ${
                                selectedAnswer === index
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-blue-200'
                            }`}
                            onClick={() => onAnswerSelect(index)}
                        >
                            <div className="flex items-center">
                                <div className={`w-6 h-6 flex items-center justify-center rounded-full border-2 mr-3 ${
                                    selectedAnswer === index
                                        ? 'border-blue-500 bg-blue-500'
                                        : 'border-gray-300'
                                }`}>
                                    {selectedAnswer === index && (
                                        <i className="fas fa-check text-white text-sm"></i>
                                    )}
                                </div>
                                <span className="text-gray-700">{option}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('MCQQuestion component error:', error);
        reportError(error);
        return null;
    }
}
