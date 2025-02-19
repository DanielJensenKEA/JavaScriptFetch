console.log("Im in fetchurl")
const inpUrl = document.getElementById("inpUrl");
const fetchUrl = document.getElementById("pbFetchUrl");
const textarea = document.getElementById("txt")

async function actionFetchUrl(btn) {
    const url = inpUrl.value;
    console.log(url);
    const jsonOutput = await fetchAnyUrlText(url);
    let showTxt="";
    if (Array.isArray(jsonOutput)) {
        showTxt=getKeysAndValuesFromObj(jsonOutput[0]);
    } else {
        showTxt = getKeysAndValuesFromObj(jsonOutput);
    }
    textarea.textContent = showTxt;
    console.log(jsonOutput)

    textarea.textContent = jsonOutput;
    console.log(jsonOutput)

}

function fetchAnyUrlText(url) {
    console.log("inside fetch text url="+url);
    return fetch(url).then(response => response.text());
}

function getKeysAndValuesFromObj(obj) {
    const keys = Object.keys(obj);
    return keys.map(key => `${key} : ${obj[key]}`)
}


/*
########
# Event Listeners
########
 */

fetchUrl.addEventListener('click', actionFetchUrl)