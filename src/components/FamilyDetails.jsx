import React from 'react'

const FamilyDetails = ({family}) => {
  return (
    <>
    <h2>Family Information</h2>
      <h5>Family Name</h5>
      <div>{family.name}</div>
      <hr />
      <h5>Address</h5>
      {family.address && (
        <>
          <p>{family.address.name}</p>
          <p>{family.address.address}</p>
          <p>{family.address.placeFormatted}</p>
        </>
      )}
      <hr />
      <h5>Family Members</h5>
      {family.users &&
        family.users.map((user) => {
          return <p key={user._id}>{user.firstName}</p>;
        })}
      <hr />
      <h5>Family Cars</h5>
      {family.cars &&
        family.cars.map((car) => {
          return (
            <p key={car._id}>
              {car.make} {car.model}
            </p>
          );
        })}
    </>
  )
}

export default FamilyDetails