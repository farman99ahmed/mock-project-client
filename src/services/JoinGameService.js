const URL = "https://jsonplaceholder.typicode.com/posts";

async function joinGame(data) {
  try {
    const response = await fetch(URL,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': `bearer ${data.token}`
      },
      body: JSON.stringify(data)
    }, 2 * 10 * 60 * 1000);

    if (!response.ok) {
      throw response
    }

    const json_response = await response.json()
    return json_response;

  } catch (err) {

  }
}

export default joinGame;