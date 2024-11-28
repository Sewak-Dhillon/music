
export const formatTime = (time) => {
  const min = parseInt(time/60);
  const sec = parseInt(time%60);

  return `${min}`.padStart(2,'0')+`:`+`${sec}`.padStart(2,'0')
}