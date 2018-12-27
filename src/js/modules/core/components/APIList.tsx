import * as React from "react";
import injectSheet from "react-jss/lib/injectSheet";
import { Styles } from "react-jss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReact } from "@fortawesome/free-brands-svg-icons/faReact";
import { Theme, JssRules } from "../../types";
import { faAws } from "@fortawesome/free-brands-svg-icons/faAws";

interface APIListStyles<T> extends Styles {
  APIList: T
}

const styles: APIListStyles<JssRules> = {
  APIList:{ 
    display: "flex", 
    width: "100px", 
    justifyContent: "space-around", 
    maxWidth: "500px"
  }
};
  
  class APIList extends React.Component<JssRules> {
    render (){
      return(
      <div>
        <h1> API List </h1>
        <div>
          <p>
            HackNYU has several APIs available from NYU. You can take a look at them below:
          </p>
         <ul>
             <li>Class Roster/Albert</li>
             <li>Bus Locations</li>
             <li>Course Catalog</li>
             <li>Public Safety</li>
             <li>Engage</li>
             <li>Third-party APIs: Data.gov, NYC Public Data, GitHub REST API</li>
             <li>Events</li>
             <li>Faculty Bibliography</li>
             <li>Library Share Space</li>
             <li>Academic Calendar</li>
        </ul>
        </div>
      </div>
      )
    }
  }
  
  export default injectSheet(styles)(APIList);
