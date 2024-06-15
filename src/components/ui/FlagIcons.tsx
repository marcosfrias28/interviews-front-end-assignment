
import ReactCountryFlag from "react-country-flag"

const countries = [
  {
    id: "1",
    code: "IT",
    name: "Italian",
  },
  {
    id: "2",
    code: "US",
    name: "American",
  },
  {
    id: "3",
    code: "MX",
    name: "Mexican",
  },
  {
    id: "4",
    code: "IN",
    name: "Indian",
  },
  {
    id: "5",
    code: "JP",
    name: "Japanese",
  },
  {
    id: "6",
    code: "ES",
    name: "Spanish",
  },
  {
    id: "7",
    code: "FR",
    name: "French",
  },
  {
    id: "8",
    code: "GR",
    name: "Greek",
  },
  {
    id: "9",
    code: "TH",
    name: "Thai",
  },
  {
    id: "10",
    code: "GB",
    name: "British",
  },
  {
    id: "11",
    code: "RU",
    name: "Russian",
  },
  {
    id: "12",
    code: "AE",
    name: "Middle Eastern",
  },
  {
    id: "13",
    code: "DZ",
    name: "North African",
  },
  {
    id: "14",
    code: "KR",
    name: "Korean",
  },
  {
    id: "15",
    code: "CN",
    name: "Chinese",
  },
  {
    id: "16",
    code: "VN",
    name: "Vietnamese",
  },
  {
    id: "17",
    code: "TR",
    name: "Turkish",
  },
  {
    id: "18",
    code: "BR",
    name: "Brazilian",
  },
  {
    id: "19",
    code: "CU",
    name: "Caribbean",
  },
  {
    id: "20",
    code: "MA",
    name: "Moroccan",
  },
  {
    id: "21",
    code: "ET",
    name: "Ethiopian",
  },
  {
    id: "22",
    code: "PE",
    name: "Peruvian",
  },
  {
    id: "23",
    code: "LB",
    name: "Lebanese",
  },
  {
    id: "24",
    code: "ID",
    name: "Indonesian",
  },
  {
    id: "25",
    code: "PH",
    name: "Filipino",
  },
  {
    id: "26",
    code: "DE",
    name: "German",
  },
  {
    id: "27",
    code: "PT",
    name: "Portuguese",
  },
  {
    id: "28",
    code: "CU",
    name: "Cuban",
  },
  {
    id: "29",
    code: "MY",
    name: "Malaysian",
  },
  {
    id: "30",
    code: "AR",
    name: "Argentinian",
  },
  {
    id: "31",
    code: "HU",
    name: "Hungarian",
  },
  {
    id: "32",
    code: "SE",
    name: "Swedish",
  },
];

export function GetFlag({ nationality }: any) {

  //This verify if the code is in the list of countries, if not, it will return undefined
  const code = countries.find((country) => country.id === nationality)?.code;
  
  return (
    <div>
      {
        code && <ReactCountryFlag countryCode={code} style={{
          fontSize: '2em',
        }}/>
      }
    </div>
  )
}
