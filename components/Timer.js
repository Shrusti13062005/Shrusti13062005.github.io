function Timer({ timeLeft, totalTime }) {
    try {
        const radius = 20;
        const circumference = 2 * Math.PI * radius;
        const progress = (timeLeft / totalTime) * circumference;
        const isWarning = timeLeft <= 300; // 5 minutes warning

        const formatTime = (seconds) => {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
        };

        return (
            <div data-name="timer" className="flex items-center space-x-2">
                <svg width="50" height="50" className="-rotate-90">
                    <circle
                        stroke="#e5e7eb"
                        strokeWidth="4"
                        fill="transparent"
                        r={radius}
                        cx="25"
                        cy="25"
                    />
                    <circle
                        className="progress-ring"
                        stroke={isWarning ? "#ef4444" : "#3b82f6"}
                        strokeWidth="4"
                        fill="transparent"
                        r={radius}
                        cx="25"
                        cy="25"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference - progress}
                    />
                </svg>
                <span className={`text-xl font-mono ${isWarning ? 'timer-warning' : 'text-gray-700'}`}>
                    {formatTime(timeLeft)}
                </span>
            </div>
        );
    } catch (error) {
        console.error('Timer component error:', error);
        reportError(error);
        return null;
    }
}
