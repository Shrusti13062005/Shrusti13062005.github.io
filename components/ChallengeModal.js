function ChallengeModal({ isVisible, challenge, onSubmit, onClose }) {
    try {
        if (!isVisible) return null;

        const [answer, setAnswer] = React.useState('');
        const [error, setError] = React.useState('');

        const handleSubmit = (e) => {
            e.preventDefault();
            if (answer === challenge.answer) {
                setError('');
                onSubmit();
                setAnswer('');
            } else {
                setError('Incorrect answer. Please try again.');
            }
        };

        return (
            <div data-name="challenge-modal" className="modal-overlay">
                <div data-name="modal-content" className="modal-content">
                    <div data-name="modal-header" className="text-xl font-bold mb-4">
                        Verification Required
                    </div>
                    <div data-name="challenge-content" className="mb-4">
                        <p className="text-gray-600 mb-2">
                            Please solve this challenge to continue:
                        </p>
                        <div className="text-2xl font-bold text-gray-800 mb-4">
                            {challenge.question}
                        </div>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded mb-2"
                                placeholder="Enter your answer"
                                autoFocus
                            />
                            {error && (
                                <div className="text-red-500 text-sm mb-2">{error}</div>
                            )}
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('ChallengeModal component error:', error);
        reportError(error);
        return null;
    }
}
