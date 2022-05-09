"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runSave = exports.runCheckout = void 0;
const core_1 = require("@actions/core");
const constants_1 = require("./constants");
const git_1 = require("./git");
const utils_1 = require("./utils");
/**
 * Checkout file from branch
 */
function runCheckout(options) {
    return __awaiter(this, void 0, void 0, function* () {
        let status = constants_1.Status.RUNNING;
        try {
            status = yield (0, git_1.checkout)(options);
            if (status === constants_1.Status.SUCCESS) {
                yield (0, git_1.cleanupJobs)(options);
            }
        }
        catch (error) {
            status = constants_1.Status.FAILED;
            (0, core_1.setFailed)((0, utils_1.extractErrorMessage)(error));
        }
        finally {
            if (status === constants_1.Status.FAILED) {
                (0, core_1.notice)('Checkout file failed! ❌');
            }
            else if (status === constants_1.Status.SUCCESS) {
                (0, core_1.info)('Checkout Completed successfully! ✅');
            }
            else {
                (0, core_1.info)('Exiting early… 📭');
            }
            (0, core_1.exportVariable)('storage_checkout_status', status);
            (0, core_1.setOutput)('storage-checkout-status', status);
        }
    });
}
exports.runCheckout = runCheckout;
/**
 * Save file into branch
 */
function runSave(options) {
    return __awaiter(this, void 0, void 0, function* () {
        let status = constants_1.Status.RUNNING;
        try {
            status = yield (0, git_1.save)(options);
            if (status === constants_1.Status.SUCCESS) {
                yield (0, git_1.cleanupJobs)(options);
            }
        }
        catch (error) {
            status = constants_1.Status.FAILED;
            (0, core_1.setFailed)((0, utils_1.extractErrorMessage)(error));
        }
        finally {
            if (status === constants_1.Status.FAILED) {
                (0, core_1.notice)('Save file failed! ❌');
            }
            else if (status === constants_1.Status.SUCCESS) {
                (0, core_1.info)('Save Completed successfully! ✅');
            }
            else {
                (0, core_1.info)('Exiting early… 📭');
            }
            (0, core_1.exportVariable)('storage_save_status', status);
            (0, core_1.setOutput)('storage-save-status', status);
        }
    });
}
exports.runSave = runSave;
