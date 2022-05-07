import React from "react";
import { Button, Dialog, DialogContent } from "@mui/material";
import moment from "moment";

export const DisplayPassport = ({
  passport,
  open,
  handleOpen,
  handleClose,
}) => {
  const formatPassDate = (date) => moment(date).format("DD MMM YY");
  const formatFooterDate = (date) => moment(date).format("DDMMYY");
  const formatExpiryDate = (date) => moment(date, "YYYYMMDD").fromNow();

  return (
    <div>
      <Button onClick={handleOpen}>
        View your passport for {passport.country} (expires{" "}
        {formatExpiryDate(passport.dateOfExpiry)} )
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <div className="pass-card">
            <div className="pass-country">{passport.country}</div>
            <div className="pass-pic">
              <div className="pass-passport">Passport<br />Passeport</div>
              <img alt="Passport" src="http://localhost:3000/pass-pic.gif" />
            </div>
            <div className="pass-contents">
              <div className="pass-type"><h5>Type/Type</h5>&nbsp;P</div>
              <div className="pass-num">
                <h5>Passport No./Passeport No.</h5>
                {passport.passportNumber}
              </div>
              <div className="pass-last-name">
                <h5>Surname/Nom (1)</h5>
                &nbsp;{passport.lastName}
              </div>
              <div className="pass-first-name">
                <h5>Given names/Prénoms (2)</h5>
                &nbsp;{passport.firstName}
              </div>
              <div className="pass-nationality">
                <h5>Nationality/Nationalité (3)</h5>
                &nbsp;{passport.nationality}
              </div>
              <div className="pass-dob">
                <h5>Date of birth/Date de naissance (4)</h5>
                &nbsp;{formatPassDate(passport.dob)}
              </div>
              <div className="pass-gender">
                <h5>Sex/Sexe (5)</h5>
                &nbsp;{passport.gender}
              </div>
              <div className="pass-birth-place">
                <h5>Place of birth/Lieu de naissance (6)</h5>
                &nbsp;{passport.placeOfBirth}
              </div>
              <div className="pass-issue">
                <h5>Date of issue/Date d'émission (7)</h5>
                &nbsp;{formatPassDate(passport.dateOfIssue)}
              </div>
              <div className="pass-expiry">
                <h5>Date d'expiration (8)</h5>
                &nbsp;{formatPassDate(passport.dateOfExpiry)}
              </div>
              <div className="pass-signature">
                {passport.firstName} &nbsp;{passport.lastName}
              </div>
            </div>
          </div>
          <div className="pass-footer">{`P<${passport.lastName}<<${
            passport.firstName
          }<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
          ${passport.passportNumber}${formatFooterDate(passport.dob)}${
            passport.gender
          }${formatFooterDate(
            passport.dateOfExpiry
          )}<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`}</div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
