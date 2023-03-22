import { doc, getDoc } from "firebase/firestore";
import { get } from "lodash";

import db from "../config/Firebase";
import { COLLECTION } from "../constants";
import { store } from "../store/Store";

export const fetchProperty = (keyProperty = "PN") => {
  const inventoryData = store.getState().inventory.data;
  if (inventoryData && Array.isArray(inventoryData)) {
    let finalList = [
      ...new Set(
        inventoryData.map((i) =>
          i[keyProperty] ? (i[keyProperty] + "").trim() : ""
        )
      ),
    ];
    return finalList.filter((e) => e && e.trim() !== "");
  }
  return [];
};

export const fetchData = async () => {
  try {
    const email = store.getState().user.email;
    const docRef = doc(db, COLLECTION, email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      const inventoryData = docSnap.data()?.inventory;
      return inventoryData;
    } else {
      console.log("No such document!");
    }
    return [];
  } catch (err) {
    console.log("Error : " + err);
  }
};

const getPropertyValue = (data, key) => {
  return get(data, key, "") + "";
};

export const queryData = async (
  partNumber = "",
  altPartNumber = "",
  description = "",
  excludeExpired = false
) => {
  const inventory = [...store.getState().inventory.data] || [];
  if (!partNumber && !altPartNumber && !description) {
    return inventory;
  }
  let finalData = inventory.filter((data, index) => {
    if ((partNumber || altPartNumber) && description) {
      return (
        (getPropertyValue(data, "PN")?.includes(partNumber) ||
          getPropertyValue(data, "ALT PN")?.includes(partNumber)) &&
        data["DESCRIPTION"]?.includes(description)
      );
    } else if (partNumber || altPartNumber) {
      console.log(index);
      return (
        (partNumber && getPropertyValue(data, "PN")?.includes(partNumber)) ||
        (altPartNumber &&
          getPropertyValue(data, "ALT PN")?.includes(altPartNumber))
      );
    } else if (description) {
      return getPropertyValue(data, "DESCRIPTION")?.includes(description);
    }
    return false;
  });
  // let finalData = inventory.filter((data) => {
  // if (data) {
  //     if (excludeExpired) {
  //       if (data["EXPIRY DATE"]) {
  //         return compareDates(new Date(data["EXPIRY DATE"]), new Date());
  //       }
  //     }

  //   }
  // });

  return finalData;
};

export const compareDates = (dateOne, dateTwo) => {
  return dateOne && dateTwo && dateOne > dateTwo;
};
