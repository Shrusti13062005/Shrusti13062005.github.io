function createIntegrityChecker() {
    const state = {
        originalFunctions: new Map(),
        originalElements: new Map(),
        violations: []
    };

    const checker = {
        initialize: () => {
            // Store original function references
            state.originalFunctions.set('eval', window.eval);
            state.originalFunctions.set('setTimeout', window.setTimeout);
            state.originalFunctions.set('setInterval', window.setInterval);

            // Store original DOM elements
            const criticalElements = ['root'];
            criticalElements.forEach(id => {
                const element = document.getElementById(id);
                if (element) {
                    state.originalElements.set(id, element.cloneNode(true));
                }
            });

            // Monitor for tampering
            checker.monitorFunctions();
            checker.monitorElements();
        },

        monitorFunctions: () => {
            state.originalFunctions.forEach((originalFn, name) => {
                Object.defineProperty(window, name, {
                    get: () => originalFn,
                    set: (newFn) => {
                        state.violations.push({
                            type: 'function_override',
                            name,
                            timestamp: Date.now()
                        });
                        return originalFn;
                    }
                });
            });
        },

        monitorElements: () => {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach(mutation => {
                    if (mutation.type === 'childList' || mutation.type === 'attributes') {
                        state.violations.push({
                            type: 'dom_mutation',
                            target: mutation.target.id || mutation.target.tagName,
                            timestamp: Date.now()
                        });
                    }
                });
            });

            state.originalElements.forEach((_, id) => {
                const element = document.getElementById(id);
                if (element) {
                    observer.observe(element, {
                        attributes: true,
                        childList: true,
                        subtree: true
                    });
                }
            });
        },

        getViolations: () => {
            return [...state.violations];
        },

        clearViolations: () => {
            state.violations = [];
        }
    };

    return checker;
}
