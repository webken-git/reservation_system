import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import authState from "../../recoil/auth/atom";
import { AuthUrls } from "../../utils/authUrls";
import Loading from "../loading/Loading";
import "./account.scss";

export const AppSettings = () => {
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(false);
  const auth = useRecoilValue(authState);

  const appSettingsUrl = AuthUrls.APP_SETTINGS;
  const getAppSettings = () => {
    setLoading(true);
    axios
      .get(`${appSettingsUrl}?user=${auth.userId}`)
      .then((res) => {
        setSettings(res.data[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const onClick = () => {
    axios
      .patch(`${appSettingsUrl}${settings.id}/`, {
        user_id: auth.userId,
        is_receive_reminder_email: !settings.is_receive_reminder_email,
      })
      .then((res) => {
        setSettings(res.data);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  useEffect(() => {
    getAppSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <tr className="mail-address">
        <td className="mail-pass-title">リマインドメールの受信：</td>
        <td className="toggle-switch">
          <input
            id="toggle"
            className="toggle-input"
            type="checkbox"
            checked={
              settings.is_receive_reminder_email === undefined
                ? false
                : settings.is_receive_reminder_email
            }
            onChange={onClick}
          />
          <label htmlFor="toggle" className="toggle-label" />
        </td>
      </tr>
      {loading && (
        <tr>
          <td>
            <Loading />
          </td>
        </tr>
      )}
    </>
  );
};

export default AppSettings;
