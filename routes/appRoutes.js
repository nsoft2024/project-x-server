'use strict';

const express = require('express');
const appController = require('../controllers/appController');
const verification = require('../middleware/verification');

const router = express.Router();

const {
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
} = appController;

const { verifyToken } = verification

router.get('/employee', getAllEmployees);
router.post('/employee', addEmployee);
router.put('/employee/:id', updateEmployee);
router.delete('/employee/:id', deleteEmployee);

router.post('/employee/:id', verifyToken, getEmployeeProfile);
router.post('/employee/campus/:id', verifyToken, getCampusName);
router.post('/employee/attendance/:id', verifyToken, getEmployeeAttendance);
router.post('/employee/latestattendance/:id', verifyToken, getEmployeeLatestAttendance);
router.post('/employee/presentpercentage/:id', verifyToken, getEmployeePresentPercentage);
router.post('/employee/absentpercentage/:id', verifyToken, getEmployeeAbsentPercentage);
router.post('/employee/latepercentage/:id', verifyToken, getEmployeeLatePercentage);
router.post('/employee/earlyoutpercentage/:id', verifyToken, getEmployeeEarlyOutPercentage);
router.post('/employee/leavespercentage/:id', verifyToken, getEmployeeLeavesPercentage);
router.post('/employee/leavessummary/:id', verifyToken, getEmployeeLeavesSummary);
router.post('/employee/access/:id', verifyToken, getEmployeeAccessGroup);
router.post('/employee/leavesbalance/:id', verifyToken, getEmployeeLeavesBalance);
router.post('/employee/leaveslist/:id', verifyToken, getEmployeeLeavesList);
router.post('/employee/teamcount/:id', verifyToken, getTeamCount);
router.post('/employee/teamattendancepercentage/:id', verifyToken, getTeamAttendancePercentage);
router.post('/employee/teamleavespercentage/:id', verifyToken, getTeamLeavesPercentage);
router.post('/employee/teamdetails/:id', verifyToken, getTeamDetails);
router.post('/employee/teamnames/:id', verifyToken, getTeamNames);
router.post('/employee/teamfutureattendance/:id', verifyToken, getTeamFutureManualAttendance);
router.post('/employee/employeefutureattendance/:id', verifyToken, getEmployeeFutureManualAttendance);
router.post('/employee/leaveapplications/:id', verifyToken, getLeaveApplications);
router.post('/employee/employeesname/:id', verifyToken, getEmployeesName);
router.post('/employee/futureattendance/:id', verifyToken, getFutureManualAttendance);
router.post('/employee/leavetypes/:id', verifyToken, getLeaveTypes);
router.post('/employee/deleteleavetype/:id', verifyToken, deleteLeaveType);
router.post('/employee/leavereasons/:id', verifyToken, getLeaveReasons);
router.post('/employee/deleteleavereason/:id', verifyToken, deleteLeaveReason);
router.post('/employee/organizationstats/:id', verifyToken, getOrganizationStatistics);
router.post('/employee/attendancesummary/:id', verifyToken, getAttendanceSummary);
router.post('/employee/organizationattendance/:id', verifyToken, getOrganizationAttendance);

router.post('/employee/leaverequest/:id', verifyToken, insertEmployeeLeaveRequest);
router.post('/employee/uploadprofilepicture/:id', verifyToken, uploadEmployeeProfilePicture);
router.post('/employee/insertfutureattendance/:id', verifyToken, insertEmployeeFutureManualAttendance);
router.post('/employee/leavestatus/:id', verifyToken, updateEmployeeLeaveStatus);
router.post('/employee/insertleavetype/:id', verifyToken, insertLeaveType);
router.post('/employee/insertleavereason/:id', verifyToken, insertLeaveReason);

module.exports = {
    routes: router
}