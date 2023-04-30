const removeDuplicate = (data) => {
  const uniqueVehicle = [
    ...new Map(data && data.map((m) => [m.id_vehicle, m])).values(),
  ];
  return uniqueVehicle;
};

export default removeDuplicate;
