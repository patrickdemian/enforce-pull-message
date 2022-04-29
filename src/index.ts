import * as core from "@actions/core";
import * as github from "@actions/github";

const ASANA_REGEX = /https?:\/\/app.asana.com\/0\/\d+\/\d+(\/f)?/gi;
const FIRE_REGEX = /FIRE/g;

function isError(err: any): err is Error {
    return typeof err === "object" && err !== null && "message" in err && "name" in err;
}

async function main() {
    try {
        const body = github.context.payload.pull_request?.body;
        if(!body) {
            core.info("description was null");
            throw new Error("Action must be set for PRs only");
        }
        core.info("description found");

        if(ASANA_REGEX.test(body)) { 
            core.info("description has asana link");
        }
        else if(FIRE_REGEX.test(body)) {
            core.info("description has 'FIRE' keyword");
        }
        else {
            core.info("Could not find Asana link nor 'FIRE' keyword");
            throw new Error("Could not find Asana link nor 'FIRE' in description.");
        }
    }
    catch(error) {
        if(isError(error)) {
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