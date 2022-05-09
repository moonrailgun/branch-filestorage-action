"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = exports.action = void 0;
const core_1 = require("@actions/core");
const utils_1 = require("./utils");
exports.action = {
    branch: (0, core_1.getInput)('branch'),
    path: (0, core_1.getInput)('path'),
    token: (0, core_1.getInput)('token'),
    workspace: (0, core_1.getInput)('workspace') || process.env.GITHUB_WORKSPACE || '.',
    singleCommit: !(0, utils_1.isNullOrUndefined)((0, core_1.getInput)('single-commit'))
        ? (0, core_1.getInput)('single-commit').toLowerCase() === 'true'
        : false,
};
/** Status codes for the action. */
var Status;
(function (Status) {
    Status["SUCCESS"] = "success";
    Status["FAILED"] = "failed";
    Status["SKIPPED"] = "skipped";
    Status["RUNNING"] = "running";
})(Status = exports.Status || (exports.Status = {}));
