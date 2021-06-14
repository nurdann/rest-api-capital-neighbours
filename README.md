# How to use

Open `index.html` in the browser, and type into the input box a country, and a list of neighbouring capital cities will be listed.

# Walkthrough for Restcountries API project

## Setup Typescript

Install `tsc` via `npm install -g typescript`.

Create `tsconfig.json` configuration file at project root directory
```
# ./tsconfig.json
{
    "compilerOptions": {
        "target": "ES6",
        "module": "CommonJS",
        "sourceMap": true
    }
}
```

In you are on VS Code, press `Ctrl+Shift+B` and choose `watch` option so that file changes will automatically transpile `.tsx` or `.ts` files into `.js` files.

## Get country codes

We will be using ISO 3166-1 3-letter country codes because it is used in `border` field so we do not have to fetch for country name.

We can download [Excel file](https://www.dnb.com/content/dam/english/dnb-solutions/sales-and-marketing/iso_3digit_alpha_country_codes.xls) with country codes and names and then convert it JSON format. For that we can create simple Python script,

The script `xlsToJson.py` needs
```
python3 -m pip install xlrd json
```

Then feed the `.xls` file to generate dictionary of code to country names as follows,

```
python3 cvsToJson.py iso_3digit_alpha_country_codes.xls 
```

However, since I am not using NodeJS server I have included the object map inside the script file.

## Challenges

Main challenges was to setup environment and make TypeScript work without NodeJS server. I could not keep country code map in a separate folder even if I included it in the HTML file because TypeScript would give an not-found error. 

API features of https://restcountries.eu/ were straightforward once I have read the documention. The country can be searched by name via `/rest/v2/name/<country-name>` call from which borders can be extracted. Then issue an additional call to get capital cities using `/rest/v2/alpha?code=<country-code>;<country-code>`.