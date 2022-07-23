import { useState, useEffect } from "react";

function App() {
  const [location, setLocation] = useState({});

  useEffect(() => {
    const wathId = navigator.geolocation.watchPosition(handlePositionReceive);

    return () => navigator.geolocation.clearWatch(wathId);
  }, []);

  function handlePositionReceive({ coords }) {
    const { latitude, longitude } = coords;
    setLocation({ latitude, longitude });
  }

  return (
    <>
      Latitude: {location.latitude} <br />
      Longitude: {location.longitude}
    </>
  );
}

export default App;
