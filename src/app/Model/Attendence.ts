export class GetLocation{

    locationId: number | undefined;
    locationName: string | undefined;

}
export class EmployeeDetail{
    sno:any;
    employeeId!: number;
    employeeName!: string;
    employeeCode!: string;
    gender!: string;
    contactNo!: string;
    designationsName!: string;
    departmentFName!: string;
}

export class AttendenceRecord {  
sno:any;
    employeeId!: number;
        employeeName!: string;
        employeeCode!: number;
        gender!: string;
        contactNo!: number;
        designationsName!: string;
        departmentFName!: string;
        attendanceDate!: string;
        attendanceDateStr!: string;
        inTime!: string;
        outTime!: string;
        punchDirections!: string;
        status!: string;
        statusCode!: string;
        reportPunchRecords!: string;
        totalDurationInHHMM!: string;
}
export class Designation{
    designationId!: number;
    designationsName!: string;
}