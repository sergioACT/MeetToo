import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'MeetTooV2',
  webDir: 'www',
  plugins:{
    FacebookLogin:{
      appId: "1422381325105012",
      permissions: ["email", "public_profile"]
    }
  }
};

export default config;
