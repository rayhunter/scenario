import React, {useState, useEffect} from 'react';
import './App.css';

const App = () => {
  
  useEffect(() => {
    var marker = document.querySelector('#marker');
    var item = document.querySelectorAll('nav a');

    function indicator(e){
      marker.style.left = e.offsetLeft + "px";
      marker.style.width = e.offsetWidth + "px";
    }

    function setActive(e){
      // grab navbar container
      let navBar = document.querySelector('nav');

      // grab all links inside navbar
      let links = navBar.querySelectorAll('a');

      // loop through links and add the active class to the current/clicked anchor
      for (let i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function() {
          let current = document.getElementsByClassName('active');

          // if no active class
          if (current.length > 0) {
            current[0].className = current[0].className.replace(' active', '');
          }
          // add the active class to current/clicked link
          this.className += " active";
        });
      } 
    }

    item.forEach(link => {
      link.addEventListener('click', (e)=> {
        indicator(e.target);
        setActive(e);
        e.preventDefault();
      })
    })
  });

/*   const displaySection = event => {  
    alert();
  } */ 

  const locations = [
    {
      "section": "cupertino",
      "label": "Cupertino"
    },
    {
      "section": "new-york-city",
      "label": "New York City"
    },
    {
      "section": "london",
      "label": "London"
    },
    {
      "section": "amsterdam",
      "label": "Amsterdam"
    },
    {
      "section": "tokyo",
      "label": "Tokyo"
    },
    {
      "section": "hong-kong",
      "label": "Hong Kong"
    },
    {
      "section": "sydney",
      "label": "Sydney"
    }
  ];

  return (
    <>    
      <nav>
        <div id="marker"></div>
        <div id="markerbg"></div>
        { 
          locations.map((objLink, i) => {
            return ( <a key={i} href='#' id={objLink.section} data-tab={i} className=''>{objLink.label}</a> )
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
