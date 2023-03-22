import { arrayUnion, doc, setDoc } from "firebase/firestore";
import { utils, writeFile } from "xlsx";
import db from "../config/Firebase";
import { COLLECTION, DEFAULT_COLUMNS } from "../constants";
import { store } from "../store/Store";

export const insertMultipleData = async (data = []) => {
  try {
    if (data && data.length > 0) {
      await data.forEach(async (d) => {
        insertData(d);
      });
      return true;
    }
  } catch (err) {
    console.log("Error : " + err);
  }
  return false;
};

export const insertData = async (data = {}) => {
  try {
    if (data) {
      const email = store.getState().user.email;
      await setDoc(
        doc(db, COLLECTION, email),
        { inventory: arrayUnion(data) },
        { merge: true }
      );
      return true;
    }
  } catch (err) {
    console.log("Error : " + err);
  }
  return false;
};

export const exportAll = (sheetData = []) => {
  const wb = utils.book_new();
  let dummyData = DEFAULT_COLUMNS.reduce((o, key) => Object.assign(o, {[key]: ''}), {});
  const ws = utils.json_to_sheet([dummyData,...sheetData]);
  utils.book_append_sheet(wb, ws, "Inventory");
  writeFile(wb, "Inventory.xlsx");
};
