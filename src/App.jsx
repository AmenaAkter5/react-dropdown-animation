import Dropdown from "./components/Dropdown";

function App() {
  const options = ["manik", "amena", "ami"];
  return (
    <>
      <Dropdown options={options} />
    </>
  );
}

export default App;
