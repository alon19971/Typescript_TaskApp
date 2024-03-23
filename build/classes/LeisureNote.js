// src/classes/leisureNote.ts
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var LeisureNote = /** @class */ (function (_super) {
    __extends(LeisureNote, _super);
    function LeisureNote(id, date, title, text, photoAddress, location, trainingDate, time, requiredEquipment) {
        var _this = _super.call(this, id, date, title, text, photoAddress) || this;
        _this.location = location;
        _this.trainingDate = trainingDate;
        _this.time = time;
        _this.requiredEquipment = requiredEquipment;
        return _this;
    }
    LeisureNote.prototype.notification = function () {
        console.log("Reminder for '".concat(this.title, "' at ").concat(this.location, " on ").concat(this.trainingDate.toISOString(), " at ").concat(this.time));
    };
    LeisureNote.prototype.alertDetails = function () {
        console.log("Sports/Leisure Event: '".concat(this.title, "' - Location: ").concat(this.location, ", Date: ").concat(this.trainingDate.toDateString(), ", Time: ").concat(this.time, ", Equipment Needed: ").concat(this.requiredEquipment.join(", ")));
    };
    return LeisureNote;
}(Note));
