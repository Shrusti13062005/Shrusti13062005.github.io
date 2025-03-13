function calculateRisk(behaviorData, environmentData, integrityData) {
    let riskScore = 0;

    // Inactivity penalty
    const inactivitySeconds = behaviorData.inactivityTime / 1000;
    if (inactivitySeconds > 10) {
        riskScore += Math.floor((inactivitySeconds - 10) / 10) * 10;
    }

    // Tab switching penalty
    if (behaviorData.tabSwitches > 2) {
        riskScore += (behaviorData.tabSwitches - 2) * 15;
    }

    // Copy-paste penalty
    if (behaviorData.copyPasteEvents > 0) {
        riskScore += behaviorData.copyPasteEvents * 20;
    }

    // Environment checks
    if (environmentData.isVM) {
        riskScore += 30;
    }
    if (environmentData.isRemote) {
        riskScore += 30;
    }
    if (environmentData.hasDevTools) {
        riskScore += 20;
    }
    if (environmentData.hasSuspiciousExtensions) {
        riskScore += 25;
    }

    // Integrity violations
    const integrityViolations = integrityData.length;
    if (integrityViolations > 0) {
        riskScore += integrityViolations * 25;
    }

    // Mouse movement analysis
    if (behaviorData.mouseEvents.length >= 2) {
        let totalDistance = 0;
        for (let i = 1; i < behaviorData.mouseEvents.length; i++) {
            const prev = behaviorData.mouseEvents[i - 1];
            const curr = behaviorData.mouseEvents[i];
            const distance = Math.sqrt(
                Math.pow(curr.x - prev.x, 2) + Math.pow(curr.y - prev.y, 2)
            );
            totalDistance += distance;
        }
        const avgDistance = totalDistance / (behaviorData.mouseEvents.length - 1);
        if (avgDistance > 200) {
            riskScore += 10;
        }
    }

    // Keystroke pattern analysis
    if (behaviorData.keystrokes.length >= 2) {
        for (let i = 1; i < behaviorData.keystrokes.length; i++) {
            const timeBetweenStrokes =
                behaviorData.keystrokes[i].timestamp - behaviorData.keystrokes[i - 1].timestamp;
            if (timeBetweenStrokes > 3000) {
                riskScore += 5;
            }
        }
    }

    return Math.min(100, Math.max(0, riskScore));
}
