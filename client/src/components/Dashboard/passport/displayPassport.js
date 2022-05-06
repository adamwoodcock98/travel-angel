import React from "react"

export const DisplayPassport = ({passport}) => {
  return (
    <div className="">
      {passport.country}
      {passport.passportNumber}
      {passport.lastName}
      {passport.firstName}
      {passport.nationality}
      {passport.dob}
      {passport.gender}
      {passport.placeOfBirth}
      {passport.dateOfIssue}
      {passport.dateOfExpiry}
    </div>
  )

};
