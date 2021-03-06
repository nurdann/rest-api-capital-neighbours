// Define API address
const API_URL : string = 'https://restcountries.eu';

/* 
    Create response types
*/
interface Country {
    name: string,
    borders: string[],
    region: string,
    capital: string
}
interface RegionCountry {
    name: string,
    capital: string,
    alpha3Code: string
}

interface CodeMap {
    [code : string]: string
}
/*
    API fetch functions
*/

async function getCountryByName(country : string) : Promise<Country[]> {
    // Get name, borders, region and capital fields
    const response = await fetch(`${API_URL}/rest/v2/name/${country}?fields=name;borders;region;capital`);
    return await response.json();
}

async function getCountryCapitalsByCodes(codes : string[]) : Promise<string[]> {
    if(codes.length == 0) {
        return [];
    }

    const codeString : string = codes.join(';');
    const response = await fetch(`${API_URL}/rest/v2/alpha?codes=${codeString}`);
    const json : string[] = await response.json();
    const capitals : string[] = json.map((country : any) => country.capital);
    return capitals;
}

/*
    Get border countries with one API request
*/
async function getCapitalNeighbours(country : Country, codeMap : CodeMap) : Promise<string[]> {
    const neighbourCountries : string[] = country.borders.map((code : string) => codeMap[code]);
    const capitals : string[] = await getCountryCapitalsByCodes(country.borders);
    capitals.push(country.capital);
    return capitals;
}

// Populate element cointainer with list of capitals of neighbouring countries inclusive
async function requestAndPopulateNeighbourCapitals(event) : Promise<void> {
    event.preventDefault();
    // Get input from input text
    const countryInput  = document.getElementById('input-text-country') as HTMLInputElement;
    const countryName : string = countryInput.value;
    if(countryName.length == 0) {
        console.log('Empty input for country name!');
        return;
    }
    // Clear input text
    countryInput.value = "";

    // Get country information
    const matchingCountries : Country[] = await getCountryByName(countryName);

    // Check for matching countries
    if(matchingCountries.length == 0) {
        console.log('No match found!');
        return;
    }

    // Get first matching country object
    const country : Country = matchingCountries[0];

    // Get border countries in one request
    const capitals : string[] = await getCapitalNeighbours(country, codeMap);

    // Display results to DOM
    populateNeighbourCapitals(capitals);
}

function populateNeighbourCapitals(capitals : string[]) : void {
    const ul : HTMLElement = document.getElementById('display-countries');

    // Clear container before filling in
    ul.innerHTML = '';

    capitals.forEach((capital : string) => {
        const li : HTMLElement = document.createElement('li');
        const liText : Text = document.createTextNode(capital);
        li.appendChild(liText);
        ul.appendChild(li);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('get-country-button');
    button.addEventListener('click', requestAndPopulateNeighbourCapitals);
});

// Save map in the same file because Typescript cannot determine its existence and transpile without nodejs server
const codeMap : CodeMap = {"AFG": "Afghanistan", "ALA": "Aland Islands", "ALB": "Albania", "DZA": "Algeria", "ASM": "American Samoa", "AND": "Andorra", "AGO": "Angola", "AIA": "Anguilla", "ATA": "Antarctica", "ATG": "Antigua and Barbuda", "ARG": "Argentina", "ARM": "Armenia", "ABW": "Aruba", "AUS": "Australia", "AUT": "Austria", "AZE": "Azerbaijan", "BHS": "Bahamas", "BHR": "Bahrain", "BGD": "Bangladesh", "BRB": "Barbados", "BLR": "Belarus", "BEL": "Belgium", "BLZ": "Belize", "BEN": "Benin", "BMU": "Bermuda", "BTN": "Bhutan", "BOL": "Bolivia", "BES": "Bonaire, Sint Eustatius and Saba", "BIH": "Bosnia and Herzegovina", "BWA": "Botswana", "BVT": "Bouvet Island", "BRA": "Brazil", "IOT": "British Indian Ocean Territory", "BRN": "Brunei Darussalam", "BGR": "Bulgaria", "BFA": "Burkina Faso", "BDI": "Burundi", "KHM": "Cambodia", "CMR": "Cameroon", "CAN": "Canada", "CPV": "Cape Verde", "CYM": "Cayman Islands", "CAF": "Central African Republic", "TCD": "Chad", "CHL": "Chile", "CHN": "China", "CXR": "Christmas Island", "CCK": "Cocos (Keeling) Islands", "COL": "Colombia", "COM": "Comoros", "COG": "Congo", "COD": "Congo, The Democratic Republic of ", "COK": "Cook Islands", "CRI": "Costa Rica", "CIV": "Cote d'Ivoire", "HRV": "Croatia", "CUB": "Cuba", "CUW": "Cura\u00e7ao", "CYP": "Cyprus", "CZE": "Czechia", "DNK": "Denmark", "DJI": "Djibouti", "DMA": "Dominica", "DOM": "Dominican Republic", "ECU": "Ecuador", "EGY": "Egypt", "SLV": "El Salvador", "GNQ": "Equatorial Guinea", "ERI": "Eritrea", "EST": "Estonia", "ETH": "Ethiopia", "FLK": "Falkland Islands (Malvinas)", "FRO": "Faroe Islands", "FJI": "Fiji", "FIN": "Finland", "FRA": "France", "GUF": "French Guiana", "PYF": "French Polynesia", "ATF": "French Southern Territories", "GAB": "Gabon", "GMB": "Gambia", "GEO": "Georgia", "DEU": "Germany", "GHA": "Ghana", "GIB": "Gibraltar", "GRC": "Greece", "GRL": "Greenland", "GRD": "Grenada", "GLP": "Guadeloupe", "GUM": "Guam", "GTM": "Guatemala", "GGY": "Guernsey", "GIN": "Guinea", "GNB": "Guinea-Bissau", "GUY": "Guyana", "HTI": "Haiti", "HMD": "Heard and Mc Donald Islands", "VAT": "Holy See (Vatican City State)", "HND": "Honduras", "HKG": "Hong Kong", "HUN": "Hungary", "ISL": "Iceland", "IND": "India", "IDN": "Indonesia", "IRN": "Iran, Islamic Republic of", "IRQ": "Iraq", "IRL": "Ireland", "IMN": "Isle of Man", "ISR": "Israel", "ITA": "Italy", "JAM": "Jamaica", "JPN": "Japan", "JEY": "Jersey", "JOR": "Jordan", "KAZ": "Kazakstan", "KEN": "Kenya", "KIR": "Kiribati", "PRK": "Korea, Democratic People's Republic of", "KOR": "Korea, Republic of", "XKX": "Kosovo (temporary code)", "KWT": "Kuwait", "KGZ": "Kyrgyzstan", "LAO": "Lao, People's Democratic Republic", "LVA": "Latvia", "LBN": "Lebanon", "LSO": "Lesotho", "LBR": "Liberia", "LBY": "Libyan Arab Jamahiriya", "LIE": "Liechtenstein", "LTU": "Lithuania", "LUX": "Luxembourg", "MAC": "Macao", "MKD": "Macedonia, The Former Yugoslav Republic Of", "MDG": "Madagascar", "MWI": "Malawi", "MYS": "Malaysia", "MDV": "Maldives", "MLI": "Mali", "MLT": "Malta", "MHL": "Marshall Islands", "MTQ": "Martinique", "MRT": "Mauritania", "MUS": "Mauritius", "MYT": "Mayotte", "MEX": "Mexico", "FSM": "Micronesia, Federated States of", "MDA": "Moldova, Republic of", "MCO": "Monaco", "MNG": "Mongolia", "MNE": "Montenegro", "MSR": "Montserrat", "MAR": "Morocco", "MOZ": "Mozambique", "MMR": "Myanmar", "NAM": "Namibia", "NRU": "Nauru", "NPL": "Nepal", "NLD": "Netherlands", "NCL": "New Caledonia", "NZL": "New Zealand", "NIC": "Nicaragua", "NER": "Niger", "NGA": "Nigeria", "NIU": "Niue", "NFK": "Norfolk Island", "MNP": "Northern Mariana Islands", "NOR": "Norway", "OMN": "Oman", "PAK": "Pakistan", "PLW": "Palau", "PSE": "Palestinian Territory, Occupied", "PAN": "Panama", "PNG": "Papua New Guinea", "PRY": "Paraguay", "PER": "Peru", "PHL": "Philippines", "PCN": "Pitcairn", "POL": "Poland", "PRT": "Portugal", "PRI": "Puerto Rico", "QAT": "Qatar", "SRB": "Republic of Serbia", "REU": "Reunion", "ROU": "Romania", "RUS": "Russia Federation", "RWA": "Rwanda", "BLM": "Saint Barth\u00e9lemy", "SHN": "Saint Helena", "KNA": "Saint Kitts & Nevis", "LCA": "Saint Lucia", "MAF": "Saint Martin", "SPM": "Saint Pierre and Miquelon", "VCT": "Saint Vincent and the Grenadines", "WSM": "Samoa", "SMR": "San Marino", "STP": "Sao Tome and Principe", "SAU": "Saudi Arabia", "SEN": "Senegal", "SYC": "Seychelles", "SLE": "Sierra Leone", "SGP": "Singapore", "SXM": "Sint Maarten", "SVK": "Slovakia", "SVN": "Slovenia", "SLB": "Solomon Islands", "SOM": "Somalia", "ZAF": "South Africa", "SGS": "South Georgia & The South Sandwich Islands", "SSD": "South Sudan", "ESP": "Spain", "LKA": "Sri Lanka", "SDN": "Sudan", "SUR": "Suriname", "SJM": "Svalbard and Jan Mayen", "SWZ": "Swaziland", "SWE": "Sweden", "CHE": "Switzerland", "SYR": "Syrian Arab Republic", "TWN": "Taiwan, Province of China", "TJK": "Tajikistan", "TZA": "Tanzania, United Republic of", "THA": "Thailand", "TLS": "Timor-Leste", "TGO": "Togo", "TKL": "Tokelau", "TON": "Tonga", "TTO": "Trinidad and Tobago", "TUN": "Tunisia", "TUR": "Turkey", "XTX": "Turkish Rep N Cyprus (temporary code)", "TKM": "Turkmenistan", "TCA": "Turks and Caicos Islands", "TUV": "Tuvalu", "UGA": "Uganda", "UKR": "Ukraine", "ARE": "United Arab Emirates", "GBR": "United Kingdom", "USA": "United States", "UMI": "United States Minor Outlying Islands", "URY": "Uruguay", "UZB": "Uzbekistan", "VUT": "Vanuatu", "VEN": "Venezuela", "VNM": "Vietnam", "VGB": "Virgin Islands, British", "VIR": "Virgin Islands, U.S.", "WLF": "Wallis and Futuna", "ESH": "Western Sahara", "YEM": "Yemen", "ZMB": "Zambia", "ZWE": "Zimbabwe"};