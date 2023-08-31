const name = document.getElementById('name');
const score = document.getElementById('score');
const submit = document.getElementById('submit');
const ul = document.getElementById('ul');
const refresh = document.getElementById('refresh');

export const getGameId = localStorage.getItem('gameId');

export const clearInputFields = () => {
  name.value = '';
  score.value = '';
};

export const postData = async (gameId) => {
  const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: name.value,
      score: score.value,
    }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  clearInputFields(); // Clear input fields after successful submission
  // displayData(); // Fetch the results immediately to update the UI
  return data;
};

export const getData = async (getGameId) => {
  const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${getGameId}/scores`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

export const displayData = async () => {
  ul.innerHTML = '';
  try {
    const data = await getData(getGameId);
    const games = data.result;
    games.forEach((game) => {
      ul.innerHTML += `
        <li class='li'>
          <p>${game.user} ${game.score}</p>
        </li>`;
    });
  } catch (error) {
    // console.error('Error occurred:', error);
  }
};

submit.addEventListener('click', async () => {
  try {
    await postData(getGameId);
  } catch (error) {
    // console.error('Error posting data:', error);
  }
});

refresh.addEventListener('click', () => {
  displayData();
});

// Fetch the results immediately when the page loads
displayData();