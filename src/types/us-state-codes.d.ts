declare module "us-state-codes" {
  export function getStates(): string[];
  export function getStateCodeByStateName(stateName: string): string | null;
  export function getStateNameByStateCode(stateCode: string): string | null;
}
