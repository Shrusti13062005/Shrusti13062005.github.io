const sampleQuestions = [
    {
        text: "Which of the following is a fundamental principle of React?",
        options: [
            "Two-way data binding",
            "Unidirectional data flow",
            "Direct DOM manipulation",
            "Synchronous state updates"
        ],
        correctAnswer: 1
    },
    {
        text: "What is the purpose of the 'key' prop in React lists?",
        options: [
            "To style list items",
            "To make items clickable",
            "To help React track list items efficiently",
            "To set the item's visibility"
        ],
        correctAnswer: 2
    },
    {
        text: "Which hook should be used for side effects in React?",
        options: [
            "useState",
            "useEffect",
            "useRef",
            "useReducer"
        ],
        correctAnswer: 1
    }
];

function getMCQQuestions() {
    return sampleQuestions;
}
