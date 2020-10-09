import React, {useState, useEffect} from 'react';
import './App.css';

const App = () => {
  const [currentRegion, setCurrentRegion] = useState('Cupertino');
  const [theTime, setTheTime] = useState('');
  
  useEffect(() => {

    let marker = document.querySelector('#marker');
    let items = document.querySelectorAll('nav a');

    function calculateDateTime(offset) {
      // get current local time in milliseconds
      let date = new Date();
      let localTime = date.getTime();
      // get local timezone offset and convert to milliseconds
      let localOffset = date.getTimezoneOffset() * 60000;
      // obtain the UTC time in milliseconds
      let utc = localTime + localOffset;
      let newDateTime = utc + (3600000 * offset);
      let convertedDateTime = new Date(newDateTime);
      return convertedDateTime.toLocaleString();
    }

    function indicator(e){
      marker.style.left = e.offsetLeft + "px";
      marker.style.width = e.offsetWidth + "px";

      let localizedTime = calculateDateTime(e.dataset.tab);
      console.log(localizedTime);
      console.log(e.id);
      setTheTime(localizedTime);
      setCurrentRegion(e.id);

      let navBar = document.querySelector('nav');
      let links = navBar.querySelectorAll('a');
      for (let i = 0; i < links.length; i++) {
        links[i].className = "";
      }
    }

    // setting first city as active on load
    indicator(document.querySelectorAll('nav a')[0]);
    document.querySelectorAll('nav a')[0].className = 'active';

    items.forEach(link => {
      link.addEventListener('click', (e)=> {
        e.preventDefault();
        indicator(e.target);
        
        e.target.className = 'active';

        let navBar = document.querySelector('nav');
        let current = document.getElementsByClassName('active');

        // if no active class
        if (current.length > 0) {
          current[0].className = current[0].className.replace(' active', '');
        }  
      })
    })
  }, []);

  /* 
    I've mocked this object with UTC offsets for each city 
    in lieu of using importing luxon or hitting an external api 
  */ 
  const locations = [
    {
      "section": "cupertino",
      "label": "Cupertino",
      "offset": "-7"
    },
    {
      "section": "new-york-city",
      "label": "New York City",
      "offset": "-5"
    },
    {
      "section": "london",
      "label": "London",
      "offset": "0"
    },
    {
      "section": "amsterdam",
      "label": "Amsterdam",
      "offset": "5"
    },
    {
      "section": "tokyo",
      "label": "Tokyo",
      "offset": "9"
    },
    {
      "section": "hong-kong",
      "label": "Hong Kong",
      "offset": "8"
    },
    {
      "section": "sydney",
      "label": "Sydney",
      "offset": "10"
    }
  ];

  return (
    <>  
      <div id="localtime">
        <div>Local Date and Time in </div><div className="region">{currentRegion}</div> is <div className="time">{theTime}</div>
      </div>  
      <nav>
        <div id="marker"></div>
        <div id="markerbg"></div>
        { 
          locations.map((objLink, i) => {
            return ( <a key={i} href={objLink.section} id={objLink.label} data-tab={objLink.offset} className=''>{objLink.label}</a> )
          })
        }
      </nav>
      {/* <ul className="section-list">
        { 
          locations.map((objLink, k) => {
            return ( <li key={k} className="sections" id={objLink.label} data-tab-panel={k}>{objLink.label}</li> )
          })
        }
      </ul> */}
    </>
  );
}

export default App;
