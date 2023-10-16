import { useState } from 'react'
import './App.css'

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  const [currentImage, setCurrentImage] = useState(null);
  const [banList, setBanList] = useState([]);
  const [historyList, setHistoryList] = useState([]);

  const [attribute, setAttributes] = useState({
    name: "",
    weight: "",
    life_span: ""
});

  const makeQuery = () => {

    let hasBreeds = 1;
    let query = `https://api.thedogapi.com/v1/images/search?has_breeds=${hasBreeds}&api_key=${ACCESS_KEY}`;
    
    callAPI(query).catch(console.error);
  };

  const callAPI = async (query) => {
    const response = await fetch(query);
    const json = await response.json();
    console.log(json);
    setDogStats(json);
  }

  const setDogStats = (json) => {
    let stats = json[0].breeds[0];
    setAttributes({
      name: stats.name,
      weight: stats.weight.imperial + " lbs",
      life_span: stats.life_span ,
    });
    setCurrentImage(json[0].url);
    setHistoryList((historyList) => [
      ...historyList,
      { url: json[0].url, name: attribute.name},
    ]);
  };

  const addToBanList = (event) => {
    setBanList((banList) => [...banList, event.target.innerHTML]);
    console.log(banList);
  };

  const removeBan = (event) => {
    let index = banList.indexOf(event);
    if (index > -1) {
      banList.splice(index, 1);
    }
    setBanList(banList);
  };

  return (
    <>
      <div className="whole-page">
        <h1>Dog Paradise</h1>
        <h3>Discover your favorite dogs here!</h3>
        <br />
        <div className="discover-container">
          <div className="listing-container">
            <h2>Dog</h2>
            <div className="buttons">
            {attribute.name &&
                        Object.entries(attribute).map(([key, value], index) => (
                        <button type = "attribute" className="attribute-buttons" onClick={addToBanList}>{value}</button>
                    ))}
                    <br /><br /> <br />
            </div>
            {currentImage ? (
              <img src={currentImage} 
              alt="Random Dog" 
              height = "300px" 
              width = "300px"/>
              ) : (
                <div> </div>
              ) 
            }
            
          </div>

          <br />
          <button type = "discover" className = "discover-btn" onClick = {makeQuery}>Find your dog soulmate!</button>

          
        </div>
      </div>
      <div className='BanList'>
                <h2>Ban List</h2>
                <h4>Select an attribute in your listing to ban it.</h4>
                {banList && banList.length > 0 ? (
                banList.map((item, index) => (
                <button type = "banned item"
                    className="banned-buttons" key={index} onClick={removeBan}>
                        {item}
                </button>
                ))
            ) : (
                <div>
                </div>
            )}
            </div>

      <div className="history-sidebar">
        <h2>Who have we seen so far?</h2>
        <div className="history-container">
          {historyList ? (
            historyList.map((item, index) => (
              <li className="gallery" key={index}>
                <img
                  className="cat-pic"
                  src={item.url}
                  alt="Random Cat" 
                  height="50px" 
                  width="50px"
                />
                <p>A {item.name} cat from {item.origin}</p>
              </li>
            ))
          ) : (
            <div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App;