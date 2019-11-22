import { getData } from "@govtechsg/open-attestation";

export const HeaderImageSelecter = (
  profileSelected,
  profilesArray,
  updateRightPhoto,
  updateLeftPhoto
) => {
  let rightPhoto;
  let leftPhoto;

  // If there is a main pass stored in phone
  if (profilesArray[0].workpass !== null) {
    // More than one pass in phone
    if (
      profilesArray.length > 0 &&
      profileSelected <= profilesArray.length - 1
    ) {
      // rightIndex to check whether its last profile selected
      const rightIndex =
        profileSelected + 1 === profilesArray.length ? -1 : profileSelected + 1;
      rightPhoto =
        rightIndex >= 0
          ? getData(profilesArray[rightIndex].workpass).recipient.photo
          : null;

      const cleanWorkpass = getData(profilesArray[0].workpass);
      // Case where left is main pass photo
      if (profileSelected === 1) {
        leftPhoto = cleanWorkpass.recipient.photo;
      } else if (profileSelected > 1) {
        // Case where left not main pass photo
        leftPhoto = getData(profilesArray[profileSelected - 1].workpass)
          .recipient.photo;
      }
    }
  } else if (profilesArray.length > 2) {
    // If no main pass
    // Displaying right photo if its not the last pass in array
    if (profileSelected < profilesArray.length - 1) {
      rightPhoto = getData(profilesArray[profileSelected + 1].workpass)
        .recipient.photo;
    }
    // Displaying left photo
    if (profileSelected > 1) {
      leftPhoto = getData(profilesArray[profileSelected - 1].workpass).recipient
        .photo;
    }
  }

  updateLeftPhoto(leftPhoto);
  updateRightPhoto(rightPhoto);
};
