import { PATH_DEFAULT } from "./constantUtils";

export const getTodayFormatted = () => {
  const today = new Date();
  return `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`
}

export const goback = (e: Event, setRoute: (v: object) => void) => {
  var defaultLocation = PATH_DEFAULT;
  var oldHash = window.location.hash;

  // eslint-disable-next-line no-restricted-globals
  history.back();

  var newHash = window.location.hash;

  /* If the previous page hasn't been loaded in a given time (in this case
  * 1000ms) the user is redirected to the default location given above.
  * This enables you to redirect the user to another page.
  */

  if(
    newHash === oldHash &&
    (typeof(document.referrer) !== "string" || document.referrer  === "")
  ){
    window.setTimeout(function(){
      // redirect to default location
      window.location.href = defaultLocation;
    }, 1000); // set timeout in ms
  }
  if(e){
    if(e.preventDefault)
      e.preventDefault();
    // if(e.preventPropagation)
    //   e.preventPropagation();
  }
  setRoute(null)
}

export function openFullscreen() {
  // Trigger fullscreen
  const docElmWithBrowsersFullScreenFunctions = document.documentElement as HTMLElement & {
    mozRequestFullScreen(): Promise<void>;
    webkitRequestFullscreen(): Promise<void>;
    msRequestFullscreen(): Promise<void>;
  };

  if (docElmWithBrowsersFullScreenFunctions.requestFullscreen) {
    docElmWithBrowsersFullScreenFunctions.requestFullscreen();
  } else if (docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen) { /* Firefox */
    docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen();
  } else if (docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen();
  } else if (docElmWithBrowsersFullScreenFunctions.msRequestFullscreen) { /* IE/Edge */
    docElmWithBrowsersFullScreenFunctions.msRequestFullscreen();
  }
}

export function closeFullscreen() {
  const docWithBrowsersExitFunctions = document as Document & {
    mozCancelFullScreen(): Promise<void>;
    webkitExitFullscreen(): Promise<void>;
    msExitFullscreen(): Promise<void>;
  };
  if (docWithBrowsersExitFunctions.exitFullscreen) {
    docWithBrowsersExitFunctions.exitFullscreen();
  } else if (docWithBrowsersExitFunctions.mozCancelFullScreen) { /* Firefox */
    docWithBrowsersExitFunctions.mozCancelFullScreen();
  } else if (docWithBrowsersExitFunctions.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    docWithBrowsersExitFunctions.webkitExitFullscreen();
  } else if (docWithBrowsersExitFunctions.msExitFullscreen) { /* IE/Edge */
    docWithBrowsersExitFunctions.msExitFullscreen();
  }
}