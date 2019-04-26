/**
 * Interface for validating ClassOffering patches - all optional since not all fields necessarily are updated at once
 * ID is readonly to prevent modifications
 */
export interface ClassOfferingInterface {
    readonly id?: number;
    courseCode?: string;
    courseName?: string;
    enrollCap?: number;
}
