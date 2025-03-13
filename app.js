function App() {
    try {
        const [riskScore, setRiskScore] = React.useState(0);
        const [warning, setWarning] = React.useState({ visible: false, message: '' });
        const [isTabSwitched, setIsTabSwitched] = React.useState(false);
        const [challenge, setChallenge] = React.useState(null);
        const [isChallengeVisible, setIsChallengeVisible] = React.useState(false);
        
        // MCQ state
        const [currentQuestion, setCurrentQuestion] = React.useState(0);
        const [answers, setAnswers] = React.useState([]);
        const [timeLeft, setTimeLeft] = React.useState(3600); // 1 hour
        const [examSubmitted, setExamSubmitted] = React.useState(false);
        
        const questions = React.useMemo(() => getMCQQuestions(), []);
        
        const behaviorTrackerRef = React.useRef(null);
        const environmentCheckerRef = React.useRef(null);
        const integrityCheckerRef = React.useRef(null);
        const challengeGeneratorRef = React.useRef(null);

        React.useEffect(() => {
            // Initialize answers array
            setAnswers(new Array(questions.length).fill(null));

            // Initialize trackers and checkers
            behaviorTrackerRef.current = createBehaviorTracker();
            environmentCheckerRef.current = createEnvironmentChecker();
            integrityCheckerRef.current = createIntegrityChecker();
            challengeGeneratorRef.current = createChallengeGenerator();

            window.behaviorTracker = behaviorTrackerRef.current;
            integrityCheckerRef.current.initialize();

            const handleMouseMove = (e) => behaviorTrackerRef.current.mouse(e);
            const handleKeyPress = (e) => behaviorTrackerRef.current.keystroke(e);
            
            const handleVisibilityChange = () => {
                if (document.hidden) {
                    behaviorTrackerRef.current.tabSwitch();
                    setIsTabSwitched(true);
                }
            };

            const handleBlur = () => {
                behaviorTrackerRef.current.tabSwitch();
                setIsTabSwitched(true);
            };

            // Environment check on startup
            const envData = environmentCheckerRef.current.getData();
            if (envData.isVM || envData.isRemote) {
                setChallenge(challengeGeneratorRef.current.generateCaptchaChallenge());
                setIsChallengeVisible(true);
            }

            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('keypress', handleKeyPress);
            document.addEventListener('visibilitychange', handleVisibilityChange);
            window.addEventListener('blur', handleBlur);

            // Timer
            const timerInterval = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 0 || examSubmitted) {
                        clearInterval(timerInterval);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            // Risk assessment
            const assessmentInterval = setInterval(() => {
                const behaviorData = behaviorTrackerRef.current.getData();
                const envData = environmentCheckerRef.current.getData();
                const integrityViolations = integrityCheckerRef.current.getViolations();
                
                const newRiskScore = calculateRisk(behaviorData, envData, integrityViolations);
                setRiskScore(newRiskScore);

                if (newRiskScore >= 75 && !isChallengeVisible) {
                    setChallenge(challengeGeneratorRef.current.generateMathChallenge());
                    setIsChallengeVisible(true);
                }

                if (newRiskScore >= 75) {
                    setWarning({
                        visible: true,
                        message: 'High risk behavior detected. Please focus on your assessment.',
                    });
                } else if (newRiskScore >= 50) {
                    setWarning({
                        visible: true,
                        message: 'Warning: Your behavior indicates potential risk.',
                    });
                } else {
                    setWarning({ visible: false, message: '' });
                }

                behaviorTrackerRef.current.reset();
                integrityCheckerRef.current.clearViolations();
            }, 5000);

            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('keypress', handleKeyPress);
                document.removeEventListener('visibilitychange', handleVisibilityChange);
                window.removeEventListener('blur', handleBlur);
                window.behaviorTracker = null;
                clearInterval(assessmentInterval);
                clearInterval(timerInterval);
            };
        }, [questions.length, examSubmitted]);

        const handleAnswerSelect = (answerIndex) => {
            setAnswers(prev => {
                const newAnswers = [...prev];
                newAnswers[currentQuestion] = answerIndex;
                return newAnswers;
            });
        };

        const handleNavigate = (questionIndex) => {
            setCurrentQuestion(questionIndex);
        };

        const handleSubmit = () => {
            if (answers.every(a => a !== null)) {
                setExamSubmitted(true);
                // Handle exam submission
            }
        };

        const handleResumeAssessment = () => {
            setIsTabSwitched(false);
        };

        const handleChallengeComplete = () => {
            setIsChallengeVisible(false);
            setChallenge(null);
        };

        return (
            <React.Fragment>
                <div data-name="app-container" className={`min-h-screen bg-gray-50 ${isTabSwitched || isChallengeVisible ? 'blur-background' : ''}`}>
                    <Header />
                    <main data-name="main-content" className="container mx-auto px-4 py-8">
                        <div className="flex justify-between items-start mb-6">
                            <RiskScore score={riskScore} />
                            <Timer timeLeft={timeLeft} totalTime={3600} />
                        </div>
                        <Warning isVisible={warning.visible} message={warning.message} />
                        {!examSubmitted ? (
                            <React.Fragment>
                                <MCQQuestion
                                    question={questions[currentQuestion]}
                                    selectedAnswer={answers[currentQuestion]}
                                    onAnswerSelect={handleAnswerSelect}
                                />
                                <MCQNavigation
                                    currentQuestion={currentQuestion}
                                    totalQuestions={questions.length}
                                    answers={answers}
                                    onNavigate={handleNavigate}
                                    onSubmit={handleSubmit}
                                />
                            </React.Fragment>
                        ) : (
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                    Exam Completed
                                </h2>
                                <p className="text-gray-600">
                                    Thank you for completing the exam. Your responses have been recorded.
                                </p>
                            </div>
                        )}
                    </main>
                </div>
                <TabSwitchModal 
                    isVisible={isTabSwitched}
                    onResume={handleResumeAssessment}
                />
                <ChallengeModal
                    isVisible={isChallengeVisible}
                    challenge={challenge}
                    onSubmit={handleChallengeComplete}
                />
            </React.Fragment>
        );
    } catch (error) {
        console.error('App component error:', error);
        reportError(error);
        return null;
    }
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
