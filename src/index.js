import './style.css';
import './module/postgame.js';

const getGameId = async () => {
  const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games';
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Abu Game',
      }),
    });
    const game = await response.json();
    const gameId = game.result.split(': ')[1].replace(' added.', '');
    localStorage.setItem('gameId', gameId);
  } catch (error) {
    // console.error('Error fetching game ID:', error);
  }
};

if (!localStorage.getItem('gameId')) {
  getGameId();
}