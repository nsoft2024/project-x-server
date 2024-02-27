'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');


// Get all employees
const getEmployees = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events/other');

        const employeeList = await pool.request()
            .query(sqlQueries.getEmployeeList);

        return employeeList.recordset;
    } catch (error) {
        console.log(error.message);
    }
};


// Add an employee details
const addEmployee = async (employeeData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events/other');

        const addEmployee = await pool.request()
            .input('first_name', sql.NVarChar(100), employeeData.first_name)
            .input('last_name', sql.NVarChar(100), employeeData.last_name)
            .input('email', sql.NVarChar(100), employeeData.email)
            .input('mobile_no', sql.NVarChar(100), employeeData.mobile_no)
            .input('active', sql.Bit, employeeData.active)
            .query(sqlQueries.createEmployee);

        return addEmployee.recordset;
    } catch (error) {
        return error.message;
    }
};


// Update an employee details using ID
const updateEmployee = async (EmployeeId, data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events/other');

        const updateEmployee = await pool.request()
            .input('EmployeeId', sql.Int, EmployeeId)
            .input('first_name', sql.NVarChar(100), data.first_name)
            .input('last_name', sql.NVarChar(100), data.last_name)
            .input('email', sql.NVarChar(100), data.email)
            .input('mobile_no', sql.NVarChar(100), data.mobile_no)
            .input('active', sql.Bit, data.active)
            .query(sqlQueries.updateEmployee);

        return updateEmployee.recordset;
    } catch (error) {
        return error.message;
    }
};


// Delete an employee using ID
const deleteEmployee = async (EmployeeId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events/other');

        const deleteEmployee = await pool.request()
            .input('EmployeeId', sql.Int, EmployeeId)
            .query(sqlQueries.deleteEmployee);

        return deleteEmployee.recordset;
    } catch (error) {
        return error.message;
    }
};


// Login for employee using employee_code and EmployeeId
const loginEmployee = async (employee_code) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events/login');

        const loginEmployee = await pool.request()
            .input('employee_code', sql.NVarChar, employee_code)
            .query(sqlQueries.loginEmployee);

        return loginEmployee.recordset;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
};


// Get an employee profile details using ID
const getProfile = async (EmployeeId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events/login');

        const employee = await pool.request()
            .input('EmployeeId', sql.Int, EmployeeId)
            .query(sqlQueries.getEmployeeByID);

        return employee.recordset;
    } catch (error) {
        return error.message;
    }
};


// Get an employee latest attendance details using ID
const getLatestAttendance = async (EmployeeId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events/attendance');

        const latestAttendance = await pool.request()
            .input('EmployeeId', sql.Int, EmployeeId)
            .query(sqlQueries.getLatestAttendance);

        return latestAttendance.recordset;
    } catch (error) {
        return error.message;
    }
};


// Get an employee latest attendance details using ID
const getAttendance = async (EmployeeId, selectedYear, selectedMonth) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events/attendance');

        const attendance = await pool.request()
            .input('EmployeeId', sql.Int, EmployeeId)
            .input('selectedYear', sql.Int, selectedYear)
            .input('selectedMonth', sql.Int, selectedMonth)
            .query(sqlQueries.getAttendance);

        return attendance.recordset;
    } catch (error) {
        return error.message;
    }
};


// Get an employee present attendance percentage
const getPresentPercentage = async (EmployeeId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events/attendance');

        const presentAttendance = await pool.request()
            .input('EmployeeId', sql.Int, EmployeeId)
            .query(sqlQueries.getPresentPercentage);

        return presentAttendance.recordset;
    } catch (error) {
        return error.message;
    }
};


// Get an employee absent attendance percentage
const getAbsentPercentage = async (EmployeeId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events/attendance');

        const absentAttendance = await pool.request()
            .input('EmployeeId', sql.Int, EmployeeId)
            .query(sqlQueries.getAbsentPercentage);

        return absentAttendance.recordset;
    } catch (error) {
        return error.message;
    }
};


// Get an employee late attendance percentage
const getLatePercentage = async (EmployeeId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events/attendance');

        const lateAttendance = await pool.request()
            .input('EmployeeId', sql.Int, EmployeeId)
            .query(sqlQueries.getLatePercentage);

        return lateAttendance.recordset;
    } catch (error) {
        return error.message;
    }
};


// Get an employee early out attendance percentage
const getEarlyOutPercentage = async (EmployeeId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events/attendance');

        const earlyoutAttendance = await pool.request()
            .input('EmployeeId', sql.Int, EmployeeId)
            .query(sqlQueries.getEarlyOutPercentage);

        return earlyoutAttendance.recordset;
    } catch (error) {
        return error.message;
    }
};


// Get an employee leaves percentage
const getLeavesPercentage = async (EmployeeId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events/attendance');

        const leaves = await pool.request()
            .input('EmployeeId', sql.Int, EmployeeId)
            .query(sqlQueries.getLeavesPercentage);

        return leaves.recordset;
    } catch (error) {
        return error.message;
    }
};


// Get an employee leave details using ID
const getLeavesSummary = async (EmployeeId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events/leaves');

        const leaves = await pool.request()
            .input('EmployeeId', sql.Int, EmployeeId)
            .query(sqlQueries.getLeavesSummary);

        return leaves.recordset;
    } catch (error) {
        return error.message;
    }
};


// Get an employee access group using ID
const getAccessGroup = async (AccessGroupId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events/details');

        const access = await pool.request()
            .input('AccessGroupId', sql.Int, AccessGroupId)
            .query(sqlQueries.getAccessGroup);

        return access.recordset;
    } catch (error) {
        return error.message;
    }
};


// Get an employee leave balance using ID and year
const getLeavesBalance = async (EmployeeId, YearId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events/leaves');

        const balance = await pool.request()
            .input('EmployeeId', sql.Int, EmployeeId)
            .input('YearId', sql.Int, YearId)
            .query(sqlQueries.getLeavesBalance);

        return balance.recordset;
    } catch (error) {
        return error.message;
    }
};


// Get an employee leaves list using ID and year
const getLeavesList = async (EmployeeId, Year) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events/leaves');

        const list = await pool.request()
            .input('EmployeeId', sql.Int, EmployeeId)
            .input('Year', sql.Int, Year)
            .query(sqlQueries.getLeavesListByDate);

        return list.recordset;
    } catch (error) {
        return error.message;
    }
};


// Insert an employee leave request
const insertLeaveRequest = async (EmployeeId, LeaveTypeId, FromDate, ToDate, LeaveReasonId, ReasonDetail, Attachment) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events/leaves');

        await pool.request()
            .input('EmployeeId', sql.Int, EmployeeId)
            .input('LeaveTypeId', sql.Int, LeaveTypeId)
            .input('FromDate', sql.DateTime, FromDate)
            .input('ToDate', sql.DateTime, ToDate)
            .input('LeaveReasonId', sql.Int, LeaveReasonId)
            .input('ReasonDetail', sql.NVarChar, ReasonDetail)
            .input('Attachment', sql.NVarChar, Attachment)
            .query(sqlQueries.insertLeaveApplication);

        return 'Leave request successfully added';
    } catch (error) {
        return error.message;
    }
};


// Upload an employee profile picture using ID
const uploadProfilePicture = async (EmployeeId, Image) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events/profile');

        await pool.request()
            .input('EmployeeId', sql.Int, EmployeeId)
            .input('Image', sql.NVarChar, Image)
            .query(sqlQueries.uploadProfilePicture);

        return 'Profile picture successfully uploaded';
    } catch (error) {
        return error.message;
    }
};


// Get team members count using supervisor ID
const getTeamMembersCount = async (EmployeeId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events/team');

        const count = await pool.request()
            .input('EmployeeId', sql.Int, EmployeeId)
            .query(sqlQueries.getTeamMembersCount);

        return count.recordset;
    } catch (error) {
        return error.message;
    }
};


// Get team members attendance percentage using supervisor ID
const getAttendancePercentage = async (EmployeeId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events/team');

        const percentage = await pool.request()
            .input('EmployeeId', sql.Int, EmployeeId)
            .query(sqlQueries.getTeamMembersAttendancePercentage);

        return percentage.recordset;
    } catch (error) {
        return error.message;
    }
};


// Get team members leaves percentage using supervisor ID
const getTeamLeavesPercentage = async (EmployeeId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events/team');

        const percentage = await pool.request()
            .input('EmployeeId', sql.Int, EmployeeId)
            .query(sqlQueries.getTeamMembersLeavesPercentage);

        return percentage.recordset;
    } catch (error) {
        return error.message;
    }
};


// Get team members details using supervisor ID
const getTeamDetails = async (EmployeeId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events/team');

        const details = await pool.request()
            .input('EmployeeId', sql.Int, EmployeeId)
            .query(sqlQueries.getTeamMembersDetails);

        return details.recordset;
    } catch (error) {
        return error.message;
    }
};


// Get team members names using supervisor ID
const getTeamMembersNames = async (EmployeeId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events/team');

        const names = await pool.request()
            .input('EmployeeId', sql.Int, EmployeeId)
            .query(sqlQueries.getTeamMembersName);

        return names.recordset;
    } catch (error) {
        return error.message;
    }
};


// Insert an employee future manual attendance
const insertFutureManualAttendance = async (FromDate, ToDate, EmployeeCode, Remarks) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events/attendance');

        await pool.request()
            .input('FromDate', sql.DateTime, FromDate)
            .input('ToDate', sql.DateTime, ToDate)
            .input('EmployeeCode', sql.NVarChar, EmployeeCode)
            .input('Remarks', sql.NVarChar, Remarks)
            .query(sqlQueries.insertFutureManualAttendance);

        return 'Future manual attendance successfully updated';
    } catch (error) {
        return error.message;
    }
};


// Get team members future manual attendances using supervisor ID
const getTeamMembersFutureManualAttendance = async (EmployeeCode) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events/team');

        const attendance = await pool.request()
            .input('EmployeeCode', sql.NVarChar, EmployeeCode)
            .query(sqlQueries.getTeamFutureManualAttendance);

        return attendance.recordset;
    } catch (error) {
        return error.message;
    }
};


// Get employee future manual attendance using employee ID
const getEmployeeFutureManualAttendance = async (EmployeeCode) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events/attendance');

        const attendance = await pool.request()
            .input('EmployeeCode', sql.NVarChar, EmployeeCode)
            .query(sqlQueries.getEmployeeFutureManualAttendance);

        return attendance.recordset;
    } catch (error) {
        return error.message;
    }
};


// Get leave applications using supervisor ID
const getLeaveApplications = async (EmployeeId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events/leaves');

        const applications = await pool.request()
            .input('EmployeeId', sql.Int, EmployeeId)
            .query(sqlQueries.getLeaveApplications);

        return applications.recordset;
    } catch (error) {
        return error.message;
    }
};


// Update an employee leave status
const updateLeaveStatus = async (LeaveId, LeaveStatusId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events/leaves');

        await pool.request()
            .input('LeaveId', sql.Int, LeaveId)
            .input('LeaveStatusId', sql.Int, LeaveStatusId)
            .query(sqlQueries.updateLeaveStatus);

        return 'Leave status successfully updated';
    } catch (error) {
        return error.message;
    }
};


// Get all employees name
const getEmployeesName = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events/organization');

        const names = await pool.request()
            .query(sqlQueries.getAllEmployeesName);

        return names.recordset;
    } catch (error) {
        return error.message;
    }
};


// Get future manual attendance
const getFutureManualAttendance = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events/organization');

        const attendance = await pool.request()
            .query(sqlQueries.getFutureManualAttendance);

        return attendance.recordset;
    } catch (error) {
        return error.message;
    }
};


// Get leave types
const getLeaveTypes = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events/organization');

        const types = await pool.request()
            .query(sqlQueries.getLeaveTypes);

        return types.recordset;
    } catch (error) {
        return error.message;
    }
};


// Insert a leave type
const insertLeaveType = async (LeaveType, DefaultCount, MaxCount) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events/organization');

        await pool.request()
            .input('LeaveType', sql.NVarChar, LeaveType)
            .input('DefaultCount', sql.Int, DefaultCount)
            .input('MaxCount', sql.Int, MaxCount)
            .query(sqlQueries.insertLeaveType);

        return 'Leave type successfully added';
    } catch (error) {
        return error.message;
    }
};


// Delete a leave type
const deleteLeaveType = async (LeaveTypeId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events/organization');

        await pool.request()
            .input('LeaveTypeId', sql.Int, LeaveTypeId)
            .query(sqlQueries.deleteLeaveType);

        return 'Leave type successfully deleted';
    } catch (error) {
        return error.message;
    }
};


// Get leave reasons
const getLeaveReasons = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events/organization');

        const reasons = await pool.request()
            .query(sqlQueries.getLeaveReasons);

        return reasons.recordset;
    } catch (error) {
        return error.message;
    }
};


// Insert a leave reason
const insertLeaveReason = async (LeaveReason, IsActive) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events/organization');

        await pool.request()
            .input('LeaveReason', sql.NVarChar, LeaveReason)
            .input('IsActive', sql.Bit, IsActive)
            .query(sqlQueries.insertLeaveReason);

        return 'Leave reason successfully added';
    } catch (error) {
        return error.message;
    }
};


// Delete a leave reason
const deleteLeaveReason = async (LeaveReasonId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events/organization');

        await pool.request()
            .input('LeaveReasonId', sql.Int, LeaveReasonId)
            .query(sqlQueries.deleteLeaveReason);

        return 'Leave reason successfully deleted';
    } catch (error) {
        return error.message;
    }
};


// Get an employee campus name using Employee ID
const getCampusName = async (EmployeeId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events/details');

        const campus = await pool.request()
            .input('EmployeeId', sql.Int, EmployeeId)
            .query(sqlQueries.getCampusName);

        return campus.recordset;
    } catch (error) {
        return error.message;
    }
};


// Get an employee campus name using Employee ID
const getOrganizationStatistics = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events/organization');

        const stats = await pool.request()
            .query(sqlQueries.getOrganizationStatistics);

        return stats.recordset;
    } catch (error) {
        return error.message;
    }
};


// Get attendance summary
const getAttendanceSummary = async (FromDate, ToDate) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events/organization');

        const summary = await pool.request()
            .input('FromDate', sql.DateTime, FromDate)
            .input('ToDate', sql.DateTime, ToDate)
            .query(sqlQueries.getAttendanceSummary);

        return summary.recordset;
    } catch (error) {
        return error.message;
    }
};


// Get organization attendance
const getOrganizationAttendance = async (FromDate, ToDate) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events/organization');

        const attendance = await pool.request()
            .input('FromDate', sql.DateTime, FromDate)
            .input('ToDate', sql.DateTime, ToDate)
            .query(sqlQueries.getOrganizationAttendance);

        return attendance.recordset;
    } catch (error) {
        return error.message;
    }
};


module.exports = {
    getEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    loginEmployee,
    getProfile,
    getLatestAttendance,
    getAttendance,
    getAbsentPercentage,
    getPresentPercentage,
    getLatePercentage,
    getEarlyOutPercentage,
    getLeavesPercentage,
    getLeavesSummary,
    getAccessGroup,
    getLeavesBalance,
    getLeavesList,
    insertLeaveRequest,
    uploadProfilePicture,
    getTeamMembersCount,
    getAttendancePercentage,
    getTeamLeavesPercentage,
    getTeamDetails,
    getTeamMembersNames,
    insertFutureManualAttendance,
    getTeamMembersFutureManualAttendance,
    getEmployeeFutureManualAttendance,
    getLeaveApplications,
    updateLeaveStatus,
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