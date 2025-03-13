function RiskScore({ score }) {
    try {
        const getRiskLevel = (score) => {
            if (score >= 75) return 'High Risk';
            if (score >= 50) return 'Medium Risk';
            return 'Low Risk';
        };

        const getRiskColor = (score) => {
            if (score >= 75) return 'risk-score-high';
            if (score >= 50) return 'risk-score-medium';
            return 'risk-score-low';
        };

        return (
            <div data-name="risk-score" className="bg-white rounded-lg shadow-sm p-4 mb-4">
                <h2 data-name="risk-score-title" className="text-lg font-semibold mb-2">
                    Current Risk Assessment
                </h2>
                <div data-name="risk-score-display" className="flex items-center">
                    <div data-name="risk-score-value" className={`text-3xl font-bold ${getRiskColor(score)}`}>
                        {score}
                    </div>
                    <div data-name="risk-score-label" className="ml-3 text-gray-600">
                        {getRiskLevel(score)}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('RiskScore component error:', error);
        reportError(error);
        return null;
    }
}
