import { createContext, useEffect, useState } from "react";
import { get } from "../services/dataService";
const LoadingContext = createContext();

const LoadingProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dataIsLoading, setDataIsLoading] = useState(true);
  const [cars, setCars] = useState([]);
  const [events, setEvents] = useState([]);
  const [family, setFamily] = useState({});
  const [familyEvents, setFamilyEvents] = useState([]);
  const [familySnapshots, setFamilySnapshots] = useState([]);
  const [familyCars, setFamilyCars] = useState([]);
  const [familyLocations, setFamilyLocations] = useState([]);
  const [familyUsers, setFamilyUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [location, setLocation] = useState({ lng: 0, lat: 0 });
  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  });

  const getToken = () => {
    return localStorage.getItem("authToken");
  };

  const getFamilyInfo = async () => {
    try {
      const familyDataPromise = await get(
        `/families/user-family-info/${user._id}`
      );
      console.log("GOT FAMILY DATA PROMISE", familyDataPromise.data);

      const familyData = familyDataPromise.data;

      setFamily(familyData.family);
      setFamilyLocations(familyData.locations);
      setFamilyCars(familyData.family.cars);

      let allFamilyEvents = [];
      for (let snapshot of familyData.snapshots) {
        allFamilyEvents = [...allFamilyEvents, ...snapshot.events];
      }
      setFamilyEvents(allFamilyEvents);
      setFamilyUsers(familyData.family.users);
      setFamilySnapshots(familyData.snapshots);

      setDataIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    getToken();
    if (user) {
      getFamilyInfo();
    }
  }, [user]);

  return (
    <LoadingContext.Provider
      value={{
        errorMessage,
        setErrorMessage,
        user,
        setUser,
        setIsLoading,
        isLoading,
        getToken,
        cars,
        setCars,
        events,
        setEvents,
        family,
        setFamily,
        familyEvents,
        setFamilyEvents,
        getFamilyInfo,
        familySnapshots,
        setFamilySnapshots,
        familyCars,
        setFamilyCars,
        familyLocations,
        setFamilyLocations,
        familyUsers,
        setFamilyUsers,
        location,
        setLocation,
        viewport,
        setViewport
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export { LoadingContext, LoadingProvider };
