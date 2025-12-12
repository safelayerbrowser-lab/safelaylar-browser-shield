import ProtectionDashboard from "@/components/ProtectionDashboard";
import { Helmet } from "react-helmet";

const Protection = () => {
  return (
    <>
      <Helmet>
        <title>Real-time Protection | SafeLaylar Browser Shield</title>
        <meta name="description" content="AI-powered real-time browser protection. Scan URLs, detect threats, and stay safe online with SafeLaylar's advanced threat detection system." />
      </Helmet>
      <ProtectionDashboard />
    </>
  );
};

export default Protection;
