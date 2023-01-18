const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
// Maximum number of saved High Scores
const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;
// Enables Save Button after username is inputted
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value,
    };
    highScores.push(score);
    // Functions that saves the top 5 scores
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);
    
    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('index.html');
};