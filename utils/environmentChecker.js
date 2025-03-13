function createEnvironmentChecker() {
    const checks = {
        isVirtualMachine: () => {
            const performance = window.performance || {};
            const timing = performance.timing || {};
            const nav = window.navigator;
            
            // Check for common VM indicators
            const vmIndicators = [
                nav.hardwareConcurrency < 2,
                !nav.deviceMemory,
                !nav.platform,
                /virtual|vmware|virtualbox/i.test(nav.userAgent)
            ];
            
            return vmIndicators.filter(Boolean).length >= 2;
        },

        isRemoteSession: () => {
            const screen = window.screen;
            const remoteIndicators = [
                screen.width < 800,
                screen.height < 600,
                screen.colorDepth < 24,
                !screen.orientation
            ];
            
            return remoteIndicators.filter(Boolean).length >= 2;
        },

        hasDevTools: () => {
            const devToolsHeight = window.outerHeight - window.innerHeight;
            return devToolsHeight > 100;
        },

        hasSuspiciousExtensions: () => {
            // Check for common extension interference
            const originalFunctions = {
                createElement: document.createElement,
                getElementById: document.getElementById,
                querySelector: document.querySelector
            };

            return Object.entries(originalFunctions).some(
                ([key, fn]) => document[key] !== fn
            );
        },

        getData: () => {
            return {
                isVM: checks.isVirtualMachine(),
                isRemote: checks.isRemoteSession(),
                hasDevTools: checks.hasDevTools(),
                hasSuspiciousExtensions: checks.hasSuspiciousExtensions(),
                userAgent: navigator.userAgent,
                platform: navigator.platform,
                screenResolution: `${screen.width}x${screen.height}`,
                colorDepth: screen.colorDepth,
                hardwareConcurrency: navigator.hardwareConcurrency,
                deviceMemory: navigator.deviceMemory
            };
        }
    };

    return checks;
}
