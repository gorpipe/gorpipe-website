import Layout from "../components/Layout";

import common from "styles/common.scss";

const Desktop = () => {
  const [platformUrl, setPlatformUrl] = React.useState("");

  const winDLUrl = "/win";
  const macDLUrl = "/mac";
  const linuxDLUrl = "/linux";

  React.useEffect(() => {
    const platform = window.navigator.platform || "";
    const isMac = platform.toLowerCase().indexOf("mac") === 0;
    const isWin = platform.toLowerCase().indexOf("win") === 0;

    if (isWin) {
      setPlatformUrl(winDLUrl);
    }
    if (isMac) {
      setPlatformUrl(macDLUrl);
    }
  }, []);

  return (
    <Layout>
      <div className={common.card}>
        <img
          src="/SM_screenshot.jpg"
          alt="Sequence Miner screenshot"
          className={common.card__image}
        />
        <section className={common.card__text}>
          <h1>GORpipe desktop client</h1>
          <p className={common.card__text__details}>
            GORpipe desktop client, Sequence Miner, is a GUI application that
            can be used to run GOR queries.
          </p>
          {platformUrl ? (
            <a
              href={platformUrl}
              title="Download Sequence Miner"
              className={common.card__callout_link}
            >
              Download
            </a>
          ) : null}
        </section>
      </div>

      <section>
        <ul className={common.card__list}>
          <li>
            <h2>Windows</h2>
            <p>Sequence Miner is available for Windows 64 bit.</p>
            <a
              className={common.card__list__link}
              href={winDLUrl}
              title="Download Sequence Miner for Windows"
            >
              Download for Windows
            </a>
          </li>
          <li>
            <h2>macOS</h2>
            <p>
              Sequence Miner is available for macOS 64 bit as a{" "}
              <code>.dmg</code>.
            </p>
            <a
              className={common.card__list__link}
              href={macDLUrl}
              title="Download Sequence Miner for Windows"
            >
              Download for macOS
            </a>
          </li>
          <li>
            <h2>Linux</h2>
            <p>
              Sequence Miner is available for Ubuntu as a <code>.deb</code>{" "}
              package file. Install with:{" "}
              <code>sudo dpkg -i SequenceMiner-1.0.deb</code>
            </p>
            <a
              className={common.card__list__link}
              href={linuxDLUrl}
              title="Download Sequence Miner for Windows"
            >
              Download for Ubuntu
            </a>
          </li>
        </ul>
      </section>
    </Layout>
  );
};

export default Desktop;
