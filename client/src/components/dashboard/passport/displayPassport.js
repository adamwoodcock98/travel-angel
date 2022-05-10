import React, { useState } from "react";
import { Button, Dialog, DialogContent } from "@mui/material";
import moment from "moment";
import CrudMenu from "./crud/crud"

export const DisplayPassport = ({ passport, userId }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formatPassDate = (date) => moment(date).format("DD MMM YY");
  const formatFooterDate = (date) => moment(date).format("DDMMYY");
  const formatExpiryDate = (date) => moment(date, "YYYYMMDD").fromNow();
  const expired = () => moment().diff(passport.dateOfExpiry) > 0;

  return (
    <div>
      {!expired() && (
        <Button onClick={handleOpen} id="pass-btn">
          View your passport for&nbsp;<i>{passport.country}</i>
          &nbsp;(expires&nbsp;<i>{formatExpiryDate(passport.dateOfExpiry)}</i> )
        </Button>
      )}
      {expired() && (
        <Button onClick={handleOpen} id="pass-expired-btn">
          View your passport for&nbsp;<i>{passport.country}</i>
          &nbsp;(expired&nbsp;<i>{formatExpiryDate(passport.dateOfExpiry)}</i> )
        </Button>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <div className="pass-card">
            <CrudMenu passportData={passport} userId={userId} />
            <div className="pass-country">{passport.country}</div>
            <div className="pass-pic">
              <div className="pass-passport">
                Passport
                <br />
                Passeport
              </div>
              <img className="pass-img" alt="Passport" src="http://localhost:3000/pass-pic.gif" />
            </div>
            <div className="pass-contents">
              <div className="pass-type">
                <h5>Type/Type</h5>&nbsp;P
              </div>
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
          <div className="pass-footer">
            <p className="pass-p">
              {`P < ${passport.lastName} < < ${
                passport.firstName
              } < < < < < < < < < < < < < < < < < < < < < < < < < < < < < ${
                passport.passportNumber
              } ${formatFooterDate(passport.dob)} ${
                passport.gender
              } ${formatFooterDate(passport.dateOfExpiry)}`}{" "}
              <span>{` < < < < < < < < < < < < < < < < < < < < < < < < < <`}</span>
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
