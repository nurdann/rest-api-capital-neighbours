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