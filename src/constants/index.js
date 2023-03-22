export const COLLECTION = "Inventory";
export const COLLECTION_ID = "SL.NO";

export const DEFAULT_COLUMNS = [
  "SL.No",
  "RFQ NO",
  "PN",
  "ALT PN",
  "DESCRIPTION",
  "QTY",
  "UOM",
  "VENDOR",
  "OUTRIGHT/EXCHANGE/FLAT",
  "UNIT PRICE",
  "MOQ/REQUESTED QTY",
  "TOTAL PRICE",
  "CUR",
  "LOC",
  "COND",
  "CERTI",
  "CORE CHARGES",
  "WARRANTY",
  "LT",
  "REMARKS",
  "EXPIRY DATE",
];

export const FORM_TYPES = {
  text: "text",
  number: "number",
  select: "select",
  dependentSelect: "dependentSelect",
  date:'date'
};

export const DEFAULT_FORM = [
  {
    valueKey: "RFQ NO",
    label: "RFQ NO",
    type: "text",
  },
  {
    label: "PART #",
    valueKey: "PN",
    type: "text",
  },
  {
    label: "ALT PART #",
    valueKey: "ALT PN",
    type: "text",
  },
  {
    label: "DESCRIPTION",
    valueKey: "DESCRIPTION",
    type: "text",
  },
  {
    label: "UOM",
    valueKey: "UOM",
    type: "text",
  },
  {
    label: "VENDOR",
    valueKey: "VENDOR",
    type: "text",
  },
  {
    label: "OUTRIGHT/EXCHANGE/FLAT",
    valueKey: "OUTRIGHT/EXCHANGE/FLAT",
    type: "select",
    menuItems: ["OUTRIGHT", "EXCHANGE", "FLAT"],
  },
  {
    label: "CORE CHARGES",
    valueKey: "CORE CHARGES",
    type: "number",
    disabled: true,
  },

  {
    label: "UNIT PRICE",
    valueKey: "UNIT PRICE",
    type: "number",
    adornment: "USD",
  },

  {
    label: "MOQ/REQUESTED QTY",
    valueKey: "MOQ/REQUESTED QTY",
    type: "number",
  },

  {
    label: "CURRENCY",
    valueKey: "CUR",
    type: "select",
    menuItems: ["USD"],
  },
  {
    label: "LOCATION",
    valueKey: "LOC",
    type: "text",
  },
  {
    label: "CONDITION",
    valueKey: "COND",
    type: "select",
    menuItems: ["INS", "OH", "REP", "SV"],
  },
  {
    label: "CERTIFICATE",
    valueKey: "CERTI",
    type: "text",
    menuItems: [
      "DUAL RELEASE 21",
      "EASA 21",
      "TAG SEP-21",
      "FAA 8130",
      "EASA F1 21",
    ],
  },

  // {
  //   label: "TOTAL PRICE",
  //   valueKey: "TOTAL PRICE",
  //   type: "number",
  //   adornment: "USD",
  //   disabled: true,
  // },
  {
    label: "WARRANTY",
    valueKey: "WARRANTY",
    type: "text",
    menuItems: [
      "1 M",
      "2 M",
      "3 M",
      "4 M",
      "5 M",
      "6 M",
      "7 M",
      "8 M",
      "9 M",
      "10 M",
      "11 M",
      "1 Y",
    ],
  },
  {
    label: "LT",
    valueKey: "LT",
    type: "text",
    menuItems: ["IN STOCK", "4-5 Days"],
  },
  {
    label: "REMARKS",
    valueKey: "REMARKS",
    type: "text",
  },
  {
    label: "EXPIRY DATE",
    valueKey: "EXPIRY DATE",
    type: "date",
  },
];
