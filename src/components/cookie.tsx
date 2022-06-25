import CookieConsent, {getCookieConsentValue} from "react-cookie-consent";
import {useState} from "react";
import Checkbox from "@components/checkbox";

const [analyticsConsent, updateAnalyticsConsent] = useState("denied");
const Cookie = () => {
    const cookieConsent = getCookieConsentValue();
    const [checkedGa, setCheckedGa] = useState(false);
    const handleChangeGa = () => {
      setCheckedGa(!checkedGa);
    };
    return (
    <CookieConsent
      enableDeclineButton
      onDecline={() => {
        updateAnalyticsConsent("denied");
      }}
      onAccept={() => {
        if (checkedGa) {
          updateAnalyticsConsent("granted");
        }
      }}
      buttonText="Accept Selected"
      declineButtonText="Decline"
      ariaAcceptLabel="Accept cookies"
      ariaDeclineLabel="Decline cookies"
      expires={150}
    >
      We use cookies to enhance the user experience and analyze site traffic.
      For more information please read our{" "}
      <a href="/privacy-policy">privacy policy.</a>
      <div>You can decide which cookies are used by selecting the respective options below.
        Please note that your selection may impair in the functionality of the service.</div>
      <div>
        <label>
          <input
            type="checkbox"
            disabled
            checked
          />
          {" "}Technically necessary cookies: Enable you to navigate and use the basic functions and to store preferences.
        </label>
      </div>
      <div>
        <Checkbox
          label="    Analysis cookies: Enable us to determine how visitors interact with our service in order to improve the user experience."
          value={checkedGa}
          onChange={handleChangeGa}
        />
      </div>
    </CookieConsent>
  )
}
export default Cookie
