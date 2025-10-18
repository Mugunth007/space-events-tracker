
import { useState, useEffect } from 'react';
import { SpaceEvent, LaunchApiResponse, Launch, EventType } from '../types';

const API_URL = "https://ll.thespacedevs.com/2.2.0/launch/upcoming/";

const eventTypes: EventType[] = [
  EventType.Launch,
  EventType.ISSPass,
  EventType.MeteorShower,
  EventType.SatelliteDeployment,
];

const assignEventType = (launchName: string, index: number): EventType => {
  const lowerCaseName = launchName.toLowerCase();
  if (lowerCaseName.includes("starlink")) return EventType.SatelliteDeployment;
  if (lowerCaseName.includes("iss") || lowerCaseName.includes("station")) return EventType.ISSPass;
  // Fallback to cycling through types for variety
  return eventTypes[index % eventTypes.length];
};

const mapLaunchToSpaceEvent = (launch: Launch, index: number): SpaceEvent => ({
  id: launch.id,
  name: launch.name,
  date: launch.net,
  location: launch.pad.location.name,
  status: {
    abbrev: launch.status.abbrev,
    description: launch.status.description,
  },
  description: launch.mission?.description || 'No detailed description available for this mission.',
  agency: launch.launch_service_provider.name,
  rocket: launch.rocket.configuration.full_name,
  eventType: assignEventType(launch.name, index),
  image: launch.image
});

export const useEvents = () => {
  const [events, setEvents] = useState<SpaceEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const data: LaunchApiResponse = await response.json();
        const mappedEvents = data.results.map(mapLaunchToSpaceEvent);
        setEvents(mappedEvents);
      } catch (e) {
        if (e instanceof Error) {
            setError(`An error occurred: ${e.message}`);
        } else {
            setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return { events, loading, error };
};
