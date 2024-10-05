export interface Country {
    name: string;
    iso2: string;
    dialCode: string;
    maxLength: number;
  }
  
  export const countries: Country[] = [
    {
      name: "United States",
      iso2: "US",
      dialCode: "+1",
      maxLength: 10,
    },
    {
      name: "Pakistan",
      iso2: "PK",
      dialCode: "+92",
      maxLength: 10,
    },
    {
      name: "India",
      iso2: "IN",
      dialCode: "+91",
      maxLength: 10,
    },
    // Add more countries as needed
  ];
  