import fetch from 'node-fetch';

process.stdin.on("data", async (input) => {
  const data = JSON.parse(input.toString());
  const city = data.query || "London";

  const apiKey = "demo"; // Replace with your own API key if needed
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  try {
    const response = await fetch(url);
    const weather = await response.json();
    const result = {
      location: weather.location?.name || city,
      temperature_c: weather.current?.temp_c,
      condition: weather.current?.condition?.text,
    };
    process.stdout.write(JSON.stringify(result));
  } catch (error) {
    process.stdout.write(JSON.stringify({ error: "Failed to fetch weather data" }));
  }
});
