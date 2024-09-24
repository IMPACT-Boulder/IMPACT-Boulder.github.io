/**
 * Interface for representing a data item.
 * 
 * This interface is used to represent individual data points from the IMPACT lab,
 * providing details about the dust particle properties such as mass, velocity, charge, etc.
 * 
 * @interface
 */
export interface DataItem {
  [key: string]: any;
  
  /** Mass of the dust particle in kilograms. */
  Mass: number;

  /** Velocity of the dust particle in kilometers per second. */
  Velocity: number;

  /** Charge of the dust particle in coulombs. */
  Charge: number;

  /** Unique trace number of the particle's experiment. */
  TraceNumber: number;

  /** Radius of the dust particle in meters. */
  Radius: number;

  /** Quality estimation of the measurement. */
  EstimateQuality: number;

  /** Timestamp of the particle hit in UNIX time format (milliseconds). */
  Time: number;

  /** Unique identifier for the dust particle's name. */
  DustName: string;

  /** Additional metadata or tag related to the particle. */
  Tag: string;
}
