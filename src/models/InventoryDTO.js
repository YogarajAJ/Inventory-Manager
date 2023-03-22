export class InventoryDTO { 
    constructor(data){
        console.log(data)
        this["SL.No"] = data["SL.No"];
        this["RFQ NO"] = data["RFQ NO"];
        this["PN"] = data["PN"];
        this["ALT PN"] = data["ALT PN"];
        this["DESCRIPTION"] = data["DESCRIPTION"];
        this["QTY"] = data["QTY"];
        this["UOM"] = data["UOM"];
        this["VENDOR"] = data["VENDOR"];
        this["OUTRIGHT/EXCHANGE/FLAT"] = data["OUTRIGHT/EXCHANGE/FLAT"];
        this["UNIT PRICE"] = data["UNIT PRICE"];
        this["MOQ/REQUESTED QTY"] = data["MOQ/REQUESTED QTY"];
        this["TOTAL PRICE"] = data["TOTAL PRICE"];
        this["CUR"] = data["CUR"];
        this["LOC"] = data["LOC"];
        this["COND"] = data["COND"];
        this["CERTI"] = data["CERTI"];
        this["CORE CHARGES"] = data["CORE CHARGES"];
        this["WARRANTY"] = data["WARRANTY"];
        this["LT"] = data["LT"];
        this["REMARKS"] = data["REMARKS"];
        this["EXPIRY DATE"] = data["EXPIRY DATE"];
    }
}

