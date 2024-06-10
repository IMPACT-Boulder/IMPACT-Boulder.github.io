 //types.tsx

// Define interface for data item
export interface DataItem {
  [key: string]: any;
  Mass: number;
  Velocity: number;
  Charge: number;
  TraceNumber: number;
  Radius: number;
  EstimateQuality: number;
  Time: number;
  DustName: string;
  Tag: string;
}