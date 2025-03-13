function createBehaviorTracker() {
    const state = {
        mouseEvents: [],
        keystrokes: [],
        tabSwitches: 0,
        copyPasteEvents: 0,
        lastActivity: Date.now(),
    };

    const track = {
        mouse: (event) => {
            state.mouseEvents.push({
                x: event.clientX,
                y: event.clientY,
                timestamp: Date.now(),
            });
            state.lastActivity = Date.now();
        },

        keystroke: (event) => {
            state.keystrokes.push({
                key: event.key,
                timestamp: Date.now(),
            });
            state.lastActivity = Date.now();
        },

        tabSwitch: () => {
            state.tabSwitches += 1;
            state.lastActivity = Date.now();
        },

        copyPaste: () => {
            state.copyPasteEvents += 1;
            state.lastActivity = Date.now();
        },

        getInactivityTime: () => {
            return Date.now() - state.lastActivity;
        },

        getData: () => {
            return {
                mouseEvents: [...state.mouseEvents],
                keystrokes: [...state.keystrokes],
                tabSwitches: state.tabSwitches,
                copyPasteEvents: state.copyPasteEvents,
                inactivityTime: track.getInactivityTime(),
            };
        },

        reset: () => {
            state.mouseEvents = [];
            state.keystrokes = [];
        },
    };

    return track;
}
