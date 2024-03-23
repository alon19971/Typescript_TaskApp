// src/classes/taskNote.ts
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
var TaskNote = /** @class */ (function (_super) {
    __extends(TaskNote, _super);
    function TaskNote(id, date, title, text, photoAddress, lastExecutionDate) {
        var _this = _super.call(this, id, date, title, text, photoAddress) || this;
        _this.lastExecutionDate = lastExecutionDate;
        return _this;
    }
    TaskNote.prototype.notification = function () {
        console.log("Task notification for ".concat(this.title));
    };
    TaskNote.prototype.alertCreationAndExecution = function () {
        console.log("Created on: ".concat(this.date, ", Last Execution Date: ").concat(this.lastExecutionDate));
    };
    return TaskNote;
}(Note));
