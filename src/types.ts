export interface LaunchData {
  id: number;
  missionName: string;
  launchDate: Date;
  missionPatch: string | null;
  coreSerials: string[];
  payloads: {
    id: string;
    type: string;
  }[];
  successful: boolean;
  failureReason: null | string;
}
