// Returns position of the first existing pass, if no pass exists return -1
export const checkIfPassExists = profileArray => {
  let i;
  for (i = 0; i < profileArray.length; i += 1) {
    if (profileArray[i].workpass !== null) return i;
  }
  return -1;
};
