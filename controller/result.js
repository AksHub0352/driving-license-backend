const checkResult = async (req, res) => {
    const { selectedAnswers } = req.body;
    console.log(req.user);

    const userId = req.user.userId;

    if (!selectedAnswers?.length) {
        return res.status(404).json({ success: false, message: 'No invalid url' });
    }
    try {
        const passThreshold = 0.1;
        let answeredQuestions = 0;
        let totalPoints = 0;
        const correctAnswers = ['Slow down', 'Give way', 'Two-way traffic', 'Go', 'No parking', 'School zone', 'Proceed with caution', 'Parking area', 'School zone', 'No entry']

        selectedAnswers.forEach((selectedAnswer, index) => {
            if (selectedAnswer !== null && selectedAnswer === correctAnswers[index]) {
                totalPoints++;

            }
            if (selectedAnswer !== null) {
                answeredQuestions++;
            }
        });

        const totalQuestions = 10;
        const passOrFail = totalPoints / totalQuestions >= passThreshold ? "Pass" : "Fail";

        res.status(200).json({
            success: true,
            message: {
                totalPoints,
                passOrFail,
                passThreshold,
                answeredQuestions,
                loginId: userId
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Invalid token or token expired' });
    }
};

module.exports = { checkResult };
