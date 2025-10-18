
export enum EventType {
  Launch = "Launch",
  ISSPass = "ISS Pass",
  MeteorShower = "Meteor Shower",
  SatelliteDeployment = "Satellite Deployment",
}

export interface SpaceEvent {
  id: string;
  name: string;
  date: string;
  location: string;
  status: {
    abbrev: string;
    description: string;
  };
  description: string;
  agency: string;
  rocket: string;
  eventType: EventType;
  image: string | null;
}

// API Response Types from thespacedevs.com
export interface LaunchApiResponse {
  results: Launch[];
}

export interface Launch {
  id: string;
  name: string;
  net: string;
  status: LaunchStatus;
  launch_service_provider: {
    name: string;
  };
  rocket: {
    configuration: {
      full_name: string;
    };
  };
  mission: {
    description: string;
  } | null;
  pad: {
    location: {
      name: string;
    };
  };
  image: string | null;
}

export interface LaunchStatus {
  id: number;
  name: string;
  abbrev: string;
  description: string;
}
