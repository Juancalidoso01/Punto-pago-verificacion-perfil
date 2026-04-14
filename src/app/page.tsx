import { PpAppChrome } from "@/components/pp-app-chrome";
import { ProfileSecurityWidget } from "@/components/profile-security-widget";

export default function Home() {
  return (
    <PpAppChrome>
      <ProfileSecurityWidget />
    </PpAppChrome>
  );
}
