//Returns position of the first existing pass, if no pass exists return -1
export const checkIfPassExists = profileArray => {
  var i;
  for(i=0; i< profileArray.length; i++){
    if(profileArray[i].workpass !== null) return i
  }
  return -1;
}