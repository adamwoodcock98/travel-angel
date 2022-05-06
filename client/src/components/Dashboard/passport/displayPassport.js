import React from "react"

export const DisplayPassport = ({passport}) => {
  return (
    <div className="passport-card">
       <div className="pass-country">{passport.country}</div>
      <div className="pass-pic"><img src="http://localhost:3000/profile-pic.png"/></div>
    
      <div className="pass-num"><h5>Passport No./Passeport No.</h5>
      {passport.passportNumber}</div>
      <h5>Surname/Nom</h5>
      <div className="pass-last-name">{passport.lastName}</div>
      <h5>Given names/Prénoms</h5>
      <div className="pass-first-name">{passport.firstName}</div>
      <h5>Nationality/Nationalité</h5>
      <div className="pass-nationality">{passport.nationality}</div>
      <h5>Date of birth/Date de naissance</h5>
      <div className="pass-dob">{passport.dob}</div>
      
      <div className="pass-gender">
        <h5>Sex/Sexe</h5>
      {passport.gender}</div>

      <div className="pass-birth-place">
      <h5>Place of birth/Lieu de naissance</h5>
      {passport.placeOfBirth}</div>
      <h5>Date of issue/Date d'émission</h5>
      <div className="pass-issue">{passport.dateOfIssue}</div>
      <h5>Date d'expiration</h5>
      <div className="pass-expiry">{passport.dateOfExpiry}</div>
    </div>
  )

};
