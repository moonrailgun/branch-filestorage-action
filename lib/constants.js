"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = exports.action = void 0;
const core_1 = require("@actions/core");
const utils_1 = require("./utils");
const github = __importStar(require("@actions/github"));
const { repository } = github.context.payload;
exports.action = {
    branch: (0, core_1.getInput)('branch'),
    path: (0, core_1.getInput)('path'),
    token: (0, core_1.getInput)('token'),
    workspace: (0, core_1.getInput)('workspace') || process.env.GITHUB_WORKSPACE || '.',
    repositoryName: !(0, utils_1.isNullOrUndefined)((0, core_1.getInput)('repository-name'))
        ? (0, core_1.getInput)('repository-name')
        : repository && repository.full_name
            ? repository.full_name
            : process.env.GITHUB_REPOSITORY,
    singleCommit: !(0, utils_1.isNullOrUndefined)((0, core_1.getInput)('single-commit'))
        ? (0, core_1.getInput)('single-commit').toLowerCase() === 'true'
        : false,
    hostname: process.env.GITHUB_SERVER_URL
        ? (0, utils_1.stripProtocolFromUrl)(process.env.GITHUB_SERVER_URL)
        : 'github.com',
    sshKey: (0, utils_1.isNullOrUndefined)((0, core_1.getInput)('ssh-key'))
        ? false
        : !(0, utils_1.isNullOrUndefined)((0, core_1.getInput)('ssh-key')) &&
            (0, core_1.getInput)('ssh-key').toLowerCase() === 'true'
            ? true
            : (0, core_1.getInput)('ssh-key'),
};
/** Status codes for the action. */
var Status;
(function (Status) {
    Status["SUCCESS"] = "success";
    Status["FAILED"] = "failed";
    Status["SKIPPED"] = "skipped";
    Status["RUNNING"] = "running";
})(Status = exports.Status || (exports.Status = {}));
