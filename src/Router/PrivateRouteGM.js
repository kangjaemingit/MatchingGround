import React, {useState, useEffect} from 'react';
import { Route, Redirect } from 'react-router-dom';

  const PrivateRouteGM = ({component: Component, ...rest}) => { 
    const [groundmanager, setGroundmanager] = useState({
      email:window.sessionStorage.getItem('id'),
      ground_manager : 1,
    });
    
    function getGroundManager(){
      fetch("http://localhost:3001/router/groundmanager", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(groundmanager),
      })
        .then((res) => res.json())
        .then((json) => {
          setGroundmanager({
            ground_manager : json[0].ground_manager
          });
          console.log(groundmanager.ground_manager);
            
        });
    }

      useEffect(() => {
        getGroundManager();
      }, [])

      return (
          <Route {...rest} render={props => (
            groundmanager.ground_manager ?
                <Component {...props}/>
                :<Redirect to="/notgroundmanager" />
          )} />
      );
  };

export default PrivateRouteGM;