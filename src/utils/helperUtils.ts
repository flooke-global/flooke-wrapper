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
  const elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  }
  // else if (elem.webkitRequestFullscreen) { /* Safari */
  //   elem.webkitRequestFullscreen();
  // }
  // else if (elem.msRequestFullscreen) { /* IE11 */
  //   elem.msRequestFullscreen();
  // }
}

export function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  }
  // else if (document.webkitExitFullscreen) { /* Safari */
  //   document.webkitExitFullscreen();
  // }
  // else if (document.msExitFullscreen) { /* IE11 */
  //   document.msExitFullscreen();
  // }
}