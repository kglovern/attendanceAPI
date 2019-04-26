/**
 * Interface for validating student patches - all optional since not all fields necessarily are updated at once
 * ID is readonly to prevent modifications
 */
export interface StudentInterface {
  readonly id?: number;
  firstName?: string;
  lastName?: string;
  userId?: string;
  studentNumber?: number;
  studentUPC?: string;
}
