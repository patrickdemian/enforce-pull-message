"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
const ASANA_REGEX = /https?:\/\/app.asana.com\/0\/\d+\/\d+(\/f)?/gi;
const FIRE_REGEX = /FIRE/gi;
function isError(err) {
    return typeof err === "object" && err !== null && "message" in err && "name" in err;
}
async function main() {
    var _a;
    try {
        const body = (_a = github.context.payload.pull_request) === null || _a === void 0 ? void 0 : _a.body;
        if (!body) {
            core.info("description was null");
            throw new Error("Action must be set for PRs only");
        }
        core.info("description found");
        if (ASANA_REGEX.test(body)) {
            core.info("description has asana link");
        }
        else if (FIRE_REGEX.test(body)) {
            core.info("description has 'FIRE' keyword");
        }
        else {
            core.info("Could not find Asana link nor 'FIRE' keyword");
            throw new Error("Could not find Asana link nor 'FIRE' in description.");
        }
    }
    catch (error) {
        if (isError(error)) {
            core.error(error);
            core.setFailed(error.message);
        }
        else {
            // should never happen, only Errors are thrown
            // just here just in case for debugging if it ever does
            core.error(JSON.stringify(error));
            core.setFailed(JSON.stringify(error));
        }
    }
}
main();
