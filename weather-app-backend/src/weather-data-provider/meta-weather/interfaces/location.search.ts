export interface LocationSearch {
  title: string; // 'London';
  location_type: 'City' | 'Region' | 'State' | 'Province' | 'Country' | 'Continent';
  woeid: number; // 44418 - where on earth id
  latt_long: string; // 51.506321,-0.12714
}
