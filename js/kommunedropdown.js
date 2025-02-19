const urlKommune = "https://api.dataforsyningen.dk/kommuner";
const ddKommuner = document.getElementById("ddKommuner");
const pbFetchKommuner = document.getElementById("pbFetchKommuner");
const linkContainer = document.getElementById("linkContainer");
const kommunesearch = document.getElementById("kommunesearch");

//const kommArr = [];
function fetchKommuner(any) {
    return fetch(any).then(response => response.json());
}

async function actionFetch() {
    const kommuner = await fetchKommuner(urlKommune);
    console.log(kommuner)
    kommuner.sort((a, b) => a.navn.localeCompare(b.navn)); // Alfabetisk sortering baseret på navn attribut

    kommuner.forEach(item => fillDropdownObj(item))

}

function fillDropdownObj(item) {
    const el = document.createElement("option");
    el.textContent=item.navn;
    el.value=item.kode;
    el.kommune = item
    console.log("Kommune="+item)
    ddKommuner.appendChild(el);
}

function selectKommuner(el) {
    console.log(el)
    const index = ddKommuner.selectedIndex;
    const selkom = ddKommuner.options[index];
    const kommune = selkom.kommune; //Kommune objektet ? for brug som argument til linkKommune().
    console.log("SelectKommuner: "+kommune.href)
    linkKommune(kommune)
}

function linkKommune(kommune) {
    const link = document.createElement("a");
    link.href = kommune.href; //json-element har et href felt med api website for enkelte kommune
    link.textContent = kommune.navn; //linket navgives efter kommune navn.
    //document.body.appendChild(link)
    linkContainer.innerHTML=""; //Rydde tidligere indsatte links
    linkContainer.append(link);
}

function searchKommune() {
    const searchInp = kommunesearch.value.toLowerCase();

    const selectedKommune = Array.from(ddKommuner.options).
    find(option => option.textContent.toLowerCase() === searchInp);
    console.log(selectedKommune)

    if (selectedKommune) {
        const kommune = selectedKommune.kommune;
        linkKommune(kommune);
    }

}

pbFetchKommuner.addEventListener('click', actionFetch)
ddKommuner.addEventListener('change', selectKommuner)
kommunesearch.addEventListener('input', searchKommune)