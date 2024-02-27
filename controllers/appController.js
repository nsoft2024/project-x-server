'use strict';

const data = require('../data/events');

const getAllEmployees = async (req, res, next) => {
    try {
        const employeeList = await data.getEmployees();
        res.send(employeeList);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const addEmployee = async (req, res, next) => {
    try {
        const data = req.body;
        const insertedEmployee = await data.addEmployee(data);
        res.send(insertedEmployee);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const updateEmployee = async (req, res, next) => {
    try {
        const EmployeeId = req.params.id;
        const data = req.body;
        const updatedEmployee = await data.updateEmployee(EmployeeId, data);
        res.send(updatedEmployee);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const deleteEmployee = async (req, res, next) => {
    try {
        const EmployeeId = req.params.id;
        const deletedEmployee = await data.deleteEmployee(EmployeeId);
        res.send(deletedEmployee);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getEmployeeProfile = async (req, res, next) => {
    try {
        const EmployeeId = parseInt(req.params.id);
        const employee = await data.getProfile(EmployeeId);
        res.send(employee);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getEmployeeLatestAttendance = async (req, res, next) => {
    try {
        const EmployeeId = parseInt(req.params.id);
        const employeeLatestAttendance = await data.getLatestAttendance(EmployeeId);
        res.send(employeeLatestAttendance);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getEmployeeAttendance = async (req, res, next) => {
    try {
        const EmployeeId = parseInt(req.params.id);
        const selectedYear = parseInt(req.body.selectedYear);
        const selectedMonth = parseInt(req.body.selectedMonth);
        const employeeAttendance = await data.getAttendance(EmployeeId, selectedYear, selectedMonth);
        res.send(employeeAttendance);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getEmployeePresentPercentage = async (req, res, next) => {
    try {
        const EmployeeId = parseInt(req.params.id);
        const employeePresentAttendance = await data.getPresentPercentage(EmployeeId);
        res.send(employeePresentAttendance);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getEmployeeAbsentPercentage = async (req, res, next) => {
    try {
        const EmployeeId = parseInt(req.params.id);
        const employeeAbsentAttendance = await data.getAbsentPercentage(EmployeeId);
        res.send(employeeAbsentAttendance);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getEmployeeLatePercentage = async (req, res, next) => {
    try {
        const EmployeeId = parseInt(req.params.id);
        const employeeLateAttendance = await data.getLatePercentage(EmployeeId);
        res.send(employeeLateAttendance);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getEmployeeEarlyOutPercentage = async (req, res, next) => {
    try {
        const EmployeeId = parseInt(req.params.id);
        const employeeEarlyOutAttendance = await data.getEarlyOutPercentage(EmployeeId);
        res.send(employeeEarlyOutAttendance);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getEmployeeLeavesPercentage = async (req, res, next) => {
    try {
        const EmployeeId = parseInt(req.params.id);
        const employeeLeavesPercent = await data.getLeavesPercentage(EmployeeId);
        res.send(employeeLeavesPercent);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getEmployeeLeavesSummary = async (req, res, next) => {
    try {
        const EmployeeId = parseInt(req.params.id);
        const employeeLeaves = await data.getLeavesSummary(EmployeeId);
        res.send(employeeLeaves);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getEmployeeAccessGroup = async (req, res, next) => {
    try {
        const AccessGroupId = parseInt(req.params.id);
        const employeeAccessGroup = await data.getAccessGroup(AccessGroupId);
        res.send(employeeAccessGroup);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getEmployeeLeavesBalance = async (req, res, next) => {
    try {
        const EmployeeId = parseInt(req.params.id);
        const YearId = parseInt(req.body.year);
        const employeeLeavesBalance = await data.getLeavesBalance(EmployeeId, YearId);
        res.send(employeeLeavesBalance);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getEmployeeLeavesList = async (req, res, next) => {
    try {
        const EmployeeId = parseInt(req.params.id);
        const Year = parseInt(req.body.year);
        const employeeLeavesList = await data.getLeavesList(EmployeeId, Year);
        res.send(employeeLeavesList);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const insertEmployeeLeaveRequest = async (req, res, next) => {
    try {
        const EmployeeId = parseInt(req.params.id);
        const LeaveTypeId = parseInt(req.body.leaveTypeId);
        const FromDate = new Date(req.body.fromDate);
        const ToDate = new Date(req.body.toDate);
        const LeaveReasonId = parseInt(req.body.leaveReasonId);
        const ReasonDetail = req.body.reasonDetail;
        const Attachment = req.body.attachment;
        const employeeLeaveRequest = await data.insertLeaveRequest(EmployeeId, LeaveTypeId, FromDate, ToDate, LeaveReasonId, ReasonDetail, Attachment);
        res.send(employeeLeaveRequest);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const uploadEmployeeProfilePicture = async (req, res, next) => {
    try {
        const EmployeeId = parseInt(req.params.id);
        const Image = req.body.image;
        const employeeProfilePicture = await data.uploadProfilePicture(EmployeeId, Image);
        res.send(employeeProfilePicture);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getTeamCount = async (req, res, next) => {
    try {
        const EmployeeId = parseInt(req.params.id);
        const teamCount = await data.getTeamMembersCount(EmployeeId);
        res.send(teamCount);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getTeamAttendancePercentage = async (req, res, next) => {
    try {
        const EmployeeId = parseInt(req.params.id);
        const attendancePercentage = await data.getAttendancePercentage(EmployeeId);
        res.send(attendancePercentage);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getTeamLeavesPercentage = async (req, res, next) => {
    try {
        const EmployeeId = parseInt(req.params.id);
        const leavesPercentage = await data.getTeamLeavesPercentage(EmployeeId);
        res.send(leavesPercentage);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getTeamDetails = async (req, res, next) => {
    try {
        const EmployeeId = parseInt(req.params.id);
        const details = await data.getTeamDetails(EmployeeId);
        res.send(details);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getTeamNames = async (req, res, next) => {
    try {
        const EmployeeId = parseInt(req.params.id);
        const names = await data.getTeamMembersNames(EmployeeId);
        res.send(names);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const insertEmployeeFutureManualAttendance = async (req, res, next) => {
    try {
        const FromDate = new Date(req.body.fromDate);
        const ToDate = new Date(req.body.toDate);
        const EmployeeCode = req.body.employeeCode;
        const Remarks = req.body.remarks;
        const employeeFutureManualAttendance = await data.insertFutureManualAttendance(FromDate, ToDate, EmployeeCode, Remarks);
        res.send(employeeFutureManualAttendance);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getTeamFutureManualAttendance = async (req, res, next) => {
    try {
        const EmployeeCode = req.body.employeeCode;
        const attendance = await data.getTeamMembersFutureManualAttendance(EmployeeCode);
        res.send(attendance);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getEmployeeFutureManualAttendance = async (req, res, next) => {
    try {
        const EmployeeCode = req.body.employeeCode;
        const attendance = await data.getEmployeeFutureManualAttendance(EmployeeCode);
        res.send(attendance);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getLeaveApplications = async (req, res, next) => {
    try {
        const EmployeeId = parseInt(req.params.id);
        const applications = await data.getLeaveApplications(EmployeeId);
        res.send(applications);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const updateEmployeeLeaveStatus = async (req, res, next) => {
    try {
        const LeaveId = parseInt(req.body.leaveId);
        const LeaveStatusId = parseInt(req.body.leaveStatusId);
        const employeeLeaveStatusRequest = await data.updateLeaveStatus(LeaveId, LeaveStatusId);
        res.send(employeeLeaveStatusRequest);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getEmployeesName = async (req, res, next) => {
    try {
        const names = await data.getEmployeesName();
        res.send(names);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getFutureManualAttendance = async (req, res, next) => {
    try {
        const attendance = await data.getFutureManualAttendance();
        res.send(attendance);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getLeaveTypes = async (req, res, next) => {
    try {
        const leaveTypes = await data.getLeaveTypes();
        res.send(leaveTypes);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const insertLeaveType = async (req, res, next) => {
    try {
        const LeaveType = req.body.leaveType;
        const DefaultCount = req.body.defaultCount;
        const MaxCount = req.body.maxCount;
        const leaveType = await data.insertLeaveType(LeaveType, DefaultCount, MaxCount);
        res.send(leaveType);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const deleteLeaveType = async (req, res, next) => {
    try {
        const LeaveTypeId = parseInt(req.body.leaveTypeId);
        const leaveType = await data.deleteLeaveType(LeaveTypeId);
        res.send(leaveType);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getLeaveReasons = async (req, res, next) => {
    try {
        const leaveReasons = await data.getLeaveReasons();
        res.send(leaveReasons);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const insertLeaveReason = async (req, res, next) => {
    try {
        const LeaveReason = req.body.leaveReason;
        const IsActive = req.body.isActive;
        const leaveReason = await data.insertLeaveReason(LeaveReason, IsActive);
        res.send(leaveReason);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const deleteLeaveReason = async (req, res, next) => {
    try {
        const LeaveReasonId = parseInt(req.body.leaveReasonId);
        const leaveReason = await data.deleteLeaveReason(LeaveReasonId);
        res.send(leaveReason);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getCampusName = async (req, res, next) => {
    try {
        const EmployeeId = parseInt(req.params.id);
        const campus = await data.getCampusName(EmployeeId);
        res.send(campus);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getOrganizationStatistics = async (req, res, next) => {
    try {
        const stats = await data.getOrganizationStatistics();
        res.send(stats);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getAttendanceSummary = async (req, res, next) => {
    try {
        const FromDate = new Date(req.body.fromDate);
        const ToDate = new Date(req.body.toDate);
        const summary = await data.getAttendanceSummary(FromDate, ToDate);
        res.send(summary);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getOrganizationAttendance = async (req, res, next) => {
    try {
        const FromDate = new Date(req.body.fromDate);
        const ToDate = new Date(req.body.toDate);
        const attendance = await data.getOrganizationAttendance(FromDate, ToDate);
        res.send(attendance);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = {
    getAllEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeeProfile,
    getEmployeeLatestAttendance,
    getEmployeeAttendance,
    getEmployeePresentPercentage,
    getEmployeeAbsentPercentage,
    getEmployeeLatePercentage,
    getEmployeeEarlyOutPercentage,
    getEmployeeLeavesPercentage,
    getEmployeeLeavesSummary,
    getEmployeeAccessGroup,
    getEmployeeLeavesBalance,
    getEmployeeLeavesList,
    insertEmployeeLeaveRequest,
    uploadEmployeeProfilePicture,
    getTeamCount,
    getTeamAttendancePercentage,
    getTeamLeavesPercentage,
    getTeamDetails,
    getTeamNames,
    insertEmployeeFutureManualAttendance,
    getTeamFutureManualAttendance,
    getEmployeeFutureManualAttendance,
    getLeaveApplications,
    updateEmployeeLeaveStatus,
    getEmployeesName,
    getFutureManualAttendance,
    getLeaveTypes,
    insertLeaveType,
    deleteLeaveType,
    getLeaveReasons,
    insertLeaveReason,
    deleteLeaveReason,
    getCampusName,
    getOrganizationStatistics,
    getAttendanceSummary,
    getOrganizationAttendance
}