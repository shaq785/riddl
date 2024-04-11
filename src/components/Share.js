import React, {useContext} from "react";
import { AppContext } from '../App'
import Button from 'react-bootstrap/Button'

function Share(props) {
    // const canonical = document.querySelector("link[rel=canonical]");
    const {shareGrid, onNewAlert} = useContext(AppContext);
    // let url = canonical ? canonical.href : document.location.href;
   
    const dt = new Date();
    const shr = shareGrid.map((item,i) => {
            if (item[0].length === 0) return null;
            return <span key={i}><br/>{`${item.join('')}`}</span>;
            //return null;
          });
    
    const shareHelper = () => {
        //let shareText = "";
        
        return <div>
                <p>Riddl: {dt.getMonth()+1 +'/'+ dt.getDate() +'/'+  dt.getFullYear().toString().substr(-2) }</p>
                {shr}
                <p class="mt-3 sr-only">Play now: www.riddl.us</p>
            </div>
    }
    const handleShareClick = () => {
        let range = document.createRange();
        range.selectNode(document.getElementById("share-text"));
        window.getSelection().removeAllRanges(); // clear current selection
        window.getSelection().addRange(range); // to select text
        document.execCommand("copy");
        window.getSelection().removeAllRanges();// to deselect
        onNewAlert('Copied results to clipboard')
    }

    const shrDevice = shareGrid.map((item,i) => {
      if (item[0].length === 0) return null;
        return `${item.join('')}\n`;
        //return null;
    });

    const shareDetails =  {text: `Riddl: ${dt.getMonth()+1 +'/' + dt.getDate() +'/'+  dt.getFullYear().toString().substr(-2) } \n${shrDevice.join('')} \nPlay now: www.riddl.us`} ;

    console.log('Share Details:', shareDetails)
  
    const handleSharing = async () => {
      if(navigator.canShare){
        if (navigator.canShare(shareDetails)) {
          try {
            await navigator
              .share(shareDetails)
              .then(() =>
                onNewAlert('Copied results to clipboard')
              );
          } catch (error) {
            console.log(`Oops! I couldn't share to the world because: ${error}`);
          }
        } else {
          // fallback code
          console.log(
            "Web share is currently not supported on this browser. Please provide a callback"
          );
        }
      } else{
      }
    };
    return (
        <>
            <div id="share-text" className='sr-only' aria-hidden="true" >
                {shareHelper()}
            </div>

            <Button type="primary" id="desktopShare" onClick={handleShareClick}>share game</Button>

            <button id="mobileShare" className="btn btn-primary" onClick={handleSharing}>
               {props.label}
            </button>
        </>
    );
  }
  export default Share;