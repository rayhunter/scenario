import React, {useState, useEffect} from 'react';
import './App.css';

const App = () => {
  const [currentRegion, setCurrentRegion] = useState('Cupertino');
  const [currentOffset, setCurrentOffset] = useState(-7);
  const [theTime, setTheTime] = useState('');
  
  useEffect(() => {

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
      let navBar = document.querySelector('nav');
      let links = navBar.querySelectorAll('a');
      for (let i = 0; i < links.length; i++) {
        links[i].className = "";
        //console.log(e.target);
      }
    }

    function setActive(){
      let navBar = document.querySelector('nav');
      let links = navBar.querySelectorAll('a');

      // loop through links and add the active class to the current/clicked anchor
      for (let i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function() {
          let current = document.getElementsByClassName('active');
          console.log(current);

          // if no active class
          if (current.length > 0) {
            current[0].className = current[0].className.replace(' active', '');
          }
          // add the active class to current/clicked link
          this.className += " active";
          //setCurrentRegion(this.id);
        });
      } 
    }

    let marker = document.querySelector('#marker');
    let item = document.querySelectorAll('nav a');

    indicator(document.querySelectorAll('nav a')[0]);
    document.querySelectorAll('nav a')[0].className = 'active';

    item.forEach(link => {
      link.addEventListener('click', (e)=> {
        e.preventDefault();
        indicator(e.target);
        e.target.className = 'active';
  
        let navBar = document.querySelector('nav');
        let links = navBar.querySelectorAll('a');

        let current = document.getElementsByClassName('active');

          // if no active class
          if (current.length > 0) {
            current[0].className = current[0].className.replace(' active', '');
          }

          //setCurrentRegion(this.id);  
      })
    })
  });

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
        <div>Current Local Time in</div><div className="region">{currentRegion}</div><div>is {theTime}</div>
      </div>  
      <nav>
        <div id="marker"></div>
        <div id="markerbg"></div>
        { 
          locations.map((objLink, i) => {
            return ( <a key={i} href={objLink.section} id={objLink.label} data-tab={i} className=''>{objLink.label}</a> )
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
