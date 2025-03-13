function createChallengeGenerator() {
    const generator = {
        generateMathChallenge: () => {
            const num1 = Math.floor(Math.random() * 10) + 1;
            const num2 = Math.floor(Math.random() * 10) + 1;
            const operator = ['+', '-', '*'][Math.floor(Math.random() * 3)];
            
            let answer;
            switch(operator) {
                case '+': answer = num1 + num2; break;
                case '-': answer = num1 - num2; break;
                case '*': answer = num1 * num2; break;
            }

            return {
                question: `${num1} ${operator} ${num2} = ?`,
                answer: answer.toString()
            };
        },

        generateCaptchaChallenge: () => {
            const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
            let captcha = '';
            for (let i = 0; i < 6; i++) {
                captcha += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return {
                question: captcha,
                answer: captcha
            };
        }
    };

    return generator;
}
