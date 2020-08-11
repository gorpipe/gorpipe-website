import Layout from "../components/Layout";
import DocHead from "../components/DocHead";

import common from "styles/common.module.scss";

const Desktop = () => {
  const [platformUrl, setPlatformUrl] = React.useState("");

  const winDLUrl =
    "https://wuxinextcode-sm-public.s3.us-east-1.amazonaws.com/install/SequenceMiner-11.0.0.msi";
  const macDLUrl =
    "https://wuxinextcode-sm-public.s3.us-east-1.amazonaws.com/install/SequenceMiner-11.0.0.pkg";
  const debDLUrl =
    "https://wuxinextcode-sm-public.s3.us-east-1.amazonaws.com/install/sequenceminer_11.0.0-1_amd64.deb";
  const rpmDLUrl =
    "https://wuxinextcode-sm-public.s3.us-east-1.amazonaws.com/install/sequenceminer-11.0.0-1.x86_64.rpm";

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
      <DocHead title="GORpipe desktop client - GORpipe" />
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
            <p>Sequence Miner is available for macOS 64 bit.</p>
            <a
              className={common.card__list__link}
              href={macDLUrl}
              title="Download Sequence Miner for Mac"
            >
              Download for macOS
            </a>
          </li>
          <li>
            <h2>Linux</h2>
            <p>
              Sequence Miner is available for Ubuntu as a <code>.deb</code>{" "}
              package file and RedHat as <code>.rpm</code>. Once downloaded,
              install with:{" "}
              <code>sudo dpkg -i sequenceminer_11.0.0-1_amd64.deb</code> or{" "}
              <code>sudo rpm -ivh sequenceminer-11.0.0-1.x86_64.rpm</code>
            </p>
            <a
              className={common.card__list__link}
              href={debDLUrl}
              title="Download Sequence Miner for Ubuntu"
            >
              Download <code>.deb</code> for Ubuntu
            </a>
            <a
              className={common.card__list__link}
              href={rpmDLUrl}
              title="Download Sequence Miner for RedHat &amp; Centos"
            >
              Download <code>.rpm</code> for RedHat &amp; Centos
            </a>
          </li>
        </ul>
      </section>
    </Layout>
  );
};

export default Desktop;
