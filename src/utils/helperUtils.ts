export const getTodayFormatted = () => {
  const today = new Date();
  return `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`
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