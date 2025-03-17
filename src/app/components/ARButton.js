export default function ARButton() {
  const startAR = () => {
    if (navigator.xr) {
      navigator.xr.requestSession('immersive-ar').then((session) => {
        // Логіка для запуску AR
        alert('AR починається');
      });
    }
  };

  return (
    <button onClick={startAR}>
      Перегляд у доповненій реальності
    </button>
  );
}
