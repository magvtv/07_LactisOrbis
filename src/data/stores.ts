
export interface Store {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  hours: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  features: string[];
}

export const stores: Store[] = [
  {
    id: "rubis-gigiri",
    name: "Rubis Gigiri",
    address: "Gigiri Shopping Centre, UN Avenue",
    city: "Nairobi",
    phone: "+254 700 123 456",
    hours: "9:00 AM - 9:00 PM",
    coordinates: { lat: -1.2345, lng: 36.8123 },
    features: ["Drive-through", "Outdoor seating", "Kids area"]
  },
  {
    id: "galleria-mall",
    name: "Galleria Mall",
    address: "Galleria Shopping Mall, Langata Road",
    city: "Nairobi", 
    phone: "+254 700 123 457",
    hours: "10:00 AM - 10:00 PM",
    coordinates: { lat: -1.3167, lng: 36.7833 },
    features: ["Food court", "Family friendly", "Free parking"]
  },
  {
    id: "junction-mall",
    name: "Junction Mall",
    address: "Junction Mall, Ngong Road",
    city: "Nairobi",
    phone: "+254 700 123 458", 
    hours: "10:00 AM - 10:00 PM",
    coordinates: { lat: -1.3030, lng: 36.7828 },
    features: ["Mall location", "Air conditioned", "Free WiFi"]
  },
  {
    id: "garden-city",
    name: "Garden City Mall",
    address: "Garden City Mall, Thika Road",
    city: "Nairobi",
    phone: "+254 700 123 459",
    hours: "10:00 AM - 10:00 PM", 
    coordinates: { lat: -1.2167, lng: 36.8833 },
    features: ["Large seating area", "Birthday parties", "Catering"]
  },
  {
    id: "sarit-centre",
    name: "Sarit Centre",
    address: "Sarit Centre, Westlands",
    city: "Nairobi",
    phone: "+254 700 123 460",
    hours: "9:00 AM - 9:00 PM",
    coordinates: { lat: -1.2635, lng: 36.8097 },
    features: ["Premium location", "Valet parking", "Corporate orders"]
  },
  {
    id: "nyali",
    name: "Nyali Centre",
    address: "Nyali Centre, Mombasa Road",
    city: "Mombasa",
    phone: "+254 700 123 461", 
    hours: "9:00 AM - 9:00 PM",
    coordinates: { lat: -4.0435, lng: 39.7123 },
    features: ["Coastal location", "Beach vibes", "Tourist friendly"]
  }
];
