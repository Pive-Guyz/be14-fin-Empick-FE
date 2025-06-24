/**
 * 근무시간 유효성 검증 유틸리티
 * 출퇴근 시간, 지각/조퇴, 연장근무 등의 유효성을 검증
 */

import { WORK_TIME_CONFIG, BUSINESS_RULES } from '@/config/attendance'

/**
 * 근무시간 유효성 검증
 * @param {string} startTime - 시작 시간 (HH:MM:SS)
 * @param {string} endTime - 종료 시간 (HH:MM:SS)
 * @returns {Object} 검증 결과
 */
export const validateWorkTime = (startTime, endTime) => {
    const errors = []
    const warnings = []

    if (!startTime || !endTime) {
        errors.push('시작 시간과 종료 시간이 모두 필요합니다.')
        return { isValid: false, errors, warnings }
    }

    // 시간 차이 계산
    const start = new Date(`2024-01-01T${startTime}`)
    const end = new Date(`2024-01-01T${endTime}`)

    if (end < start) {
        end.setDate(end.getDate() + 1) // 날짜가 바뀐 경우
    }

    const diffMinutes = (end - start) / (1000 * 60)

    // 최대/최소 근무시간 검증 (근로기준법 기준)
    const maxMinutes = BUSINESS_RULES.VALIDATION_RULES.MAX_WORK_HOURS_PER_DAY * 60
    const maxSpecialMinutes = BUSINESS_RULES.VALIDATION_RULES.MAX_WORK_HOURS_PER_DAY_SPECIAL * 60
    const minMinutes = BUSINESS_RULES.VALIDATION_RULES.MIN_WORK_HOURS_PER_DAY * 60

    if (diffMinutes > maxSpecialMinutes) {
        errors.push(`특별한 사정 시에도 하루 최대 근무시간(${BUSINESS_RULES.VALIDATION_RULES.MAX_WORK_HOURS_PER_DAY_SPECIAL}시간)을 초과할 수 없습니다.`)
    } else if (diffMinutes > maxMinutes) {
        warnings.push(`하루 최대 근무시간(${BUSINESS_RULES.VALIDATION_RULES.MAX_WORK_HOURS_PER_DAY}시간)을 초과했습니다. 특별한 사정이 있는지 확인해주세요.`)
    }

    if (diffMinutes < minMinutes) {
        warnings.push(`하루 최소 근무시간(${BUSINESS_RULES.VALIDATION_RULES.MIN_WORK_HOURS_PER_DAY}시간) 미만입니다.`)
    }

    // 연속 근무시간 검증
    const maxContinuousMinutes = BUSINESS_RULES.VALIDATION_RULES.MAX_CONTINUOUS_WORK_HOURS * 60
    if (diffMinutes > maxContinuousMinutes) {
        warnings.push(`연속 근무시간(${BUSINESS_RULES.VALIDATION_RULES.MAX_CONTINUOUS_WORK_HOURS}시간)을 초과했습니다. 휴게시간을 확인해주세요.`)
    }

    // 휴게시간 검증 (근로기준법 제54조)
    const breakRequiredAfterMinutes = BUSINESS_RULES.VALIDATION_RULES.REQUIRE_BREAK_AFTER_HOURS * 60
    if (diffMinutes >= breakRequiredAfterMinutes) {
        const requiredBreakMinutes = diffMinutes >= 480 ?
            BUSINESS_RULES.VALIDATION_RULES.MIN_BREAK_DURATION_8HOURS :
            BUSINESS_RULES.VALIDATION_RULES.MIN_BREAK_DURATION_4HOURS

        warnings.push(`${BUSINESS_RULES.VALIDATION_RULES.REQUIRE_BREAK_AFTER_HOURS}시간 이상 근무 시 최소 ${requiredBreakMinutes}분의 휴게시간이 필요합니다.`)
    }

    return {
        isValid: errors.length === 0,
        errors,
        warnings,
        workMinutes: diffMinutes
    }
}

/**
 * 지각 여부 판단
 * @param {string} checkInTime - 출근 시간 (HH:MM:SS)
 * @param {string} standardStartTime - 표준 출근 시간 (기본: 09:00:00)
 * @returns {Object} 지각 정보
 */
export const isLateArrival = (checkInTime, standardStartTime = WORK_TIME_CONFIG.WORK_START_TIME) => {
    if (!checkInTime) return { isLate: false, lateMinutes: 0 }

    const checkIn = new Date(`2024-01-01T${checkInTime}`)
    const standard = new Date(`2024-01-01T${standardStartTime}`)

    const diffMinutes = Math.max(0, (checkIn - standard) / (1000 * 60))
    const threshold = BUSINESS_RULES.TARDINESS_RULES.LATE_THRESHOLD_MINUTES
    const gracePeriod = BUSINESS_RULES.TARDINESS_RULES.GRACE_PERIOD_MINUTES

    const seriousThreshold = BUSINESS_RULES.TARDINESS_RULES.SERIOUS_LATE_THRESHOLD_MINUTES

    return {
        isLate: diffMinutes > threshold,
        lateMinutes: Math.max(0, diffMinutes),
        isInGracePeriod: gracePeriod > 0 && diffMinutes > 0 && diffMinutes <= gracePeriod,
        severity: diffMinutes >= seriousThreshold ? 'severe' : diffMinutes > threshold ? 'minor' : 'none',
        isSeriousLate: diffMinutes >= seriousThreshold,
        legalViolation: diffMinutes > 0 // 한국 법적으로는 1분이라도 늦으면 지각
    }
}

/**
 * 조퇴 여부 판단
 * @param {string} checkOutTime - 퇴근 시간 (HH:MM:SS)
 * @param {string} standardEndTime - 표준 퇴근 시간 (기본: 18:00:00)
 * @returns {Object} 조퇴 정보
 */
export const isEarlyLeave = (checkOutTime, standardEndTime = WORK_TIME_CONFIG.WORK_END_TIME) => {
    if (!checkOutTime) return { isEarly: false, earlyMinutes: 0 }

    const checkOut = new Date(`2024-01-01T${checkOutTime}`)
    const standard = new Date(`2024-01-01T${standardEndTime}`)

    const diffMinutes = Math.max(0, (standard - checkOut) / (1000 * 60))
    const threshold = BUSINESS_RULES.TARDINESS_RULES.EARLY_LEAVE_THRESHOLD_MINUTES

    return {
        isEarly: diffMinutes > threshold,
        earlyMinutes: Math.max(0, diffMinutes),
        severity: diffMinutes > (threshold * 2) ? 'severe' : 'minor'
    }
}

/**
 * 연장근무 여부 판단
 * @param {string} startTime - 시작 시간 (HH:MM:SS)
 * @param {string} endTime - 종료 시간 (HH:MM:SS)
 * @returns {Object} 연장근무 정보
 */
export const isOvertime = (startTime, endTime) => {
    const validation = validateWorkTime(startTime, endTime)
    if (!validation.isValid) return { isOvertime: false, overtimeMinutes: 0 }

    const overtimeMinutes = Math.max(0, validation.workMinutes - WORK_TIME_CONFIG.OVERTIME_THRESHOLD)
    const maxOvertimeMinutes = WORK_TIME_CONFIG.MAX_OVERTIME_DAILY * 60
    const maxSpecialOvertimeMinutes = (WORK_TIME_CONFIG.MAX_OVERTIME_DAILY + WORK_TIME_CONFIG.MAX_SPECIAL_OVERTIME_DAILY) * 60

    // 한국 법적으로는 모든 연장근무에 사전 승인 필요
    const needsApproval = BUSINESS_RULES.APPROVAL_RULES.REQUIRE_APPROVAL_FOR_OVERTIME && overtimeMinutes > 0

    let severity = 'none'
    let legalViolation = false

    if (overtimeMinutes > maxSpecialOvertimeMinutes) {
        severity = 'critical'
        legalViolation = true
    } else if (overtimeMinutes > maxOvertimeMinutes) {
        severity = 'high'
    } else if (overtimeMinutes > 240) { // 4시간 초과
        severity = 'medium'
    } else if (overtimeMinutes > 0) {
        severity = 'low'
    }

    return {
        isOvertime: overtimeMinutes > 0,
        overtimeMinutes,
        needsApproval,
        severity,
        legalViolation,
        exceedsNormalLimit: overtimeMinutes > maxOvertimeMinutes,
        exceedsSpecialLimit: overtimeMinutes > maxSpecialOvertimeMinutes,
        compensationRate: WORK_TIME_CONFIG.OVERTIME_RATE
    }
}

/**
 * 야간근무 여부 판단
 * @param {string} startTime - 시작 시간 (HH:MM:SS)
 * @param {string} endTime - 종료 시간 (HH:MM:SS)
 * @returns {Object} 야간근무 정보
 */
export const isNightWork = (startTime, endTime) => {
    if (!startTime || !endTime) return { isNightWork: false, nightMinutes: 0 }

    const start = new Date(`2024-01-01T${startTime}`)
    const end = new Date(`2024-01-01T${endTime}`)

    if (end < start) {
        end.setDate(end.getDate() + 1)
    }

    const nightStart = new Date(`2024-01-01T${WORK_TIME_CONFIG.NIGHT_WORK_START}`)
    const nightEnd = new Date(`2024-01-02T${WORK_TIME_CONFIG.NIGHT_WORK_END}`)

    const overlapStart = new Date(Math.max(start.getTime(), nightStart.getTime()))
    const overlapEnd = new Date(Math.min(end.getTime(), nightEnd.getTime()))

    const nightMinutes = overlapStart < overlapEnd ?
        Math.floor((overlapEnd - overlapStart) / (1000 * 60)) : 0

    const needsApproval = BUSINESS_RULES.APPROVAL_RULES.REQUIRE_APPROVAL_FOR_NIGHT_WORK && nightMinutes > 0

    const maxNightWorkMinutes = BUSINESS_RULES.SPECIAL_WORK_RULES.NIGHT_WORK_MAX_HOURS * 60
    const legalViolation = nightMinutes > maxNightWorkMinutes

    return {
        isNightWork: nightMinutes > 0,
        nightMinutes,
        needsApproval,
        legalViolation,
        exceedsLimit: nightMinutes > maxNightWorkMinutes,
        compensationRate: WORK_TIME_CONFIG.NIGHT_WORK_RATE,
        nightWorkPeriod: {
            start: overlapStart < overlapEnd ? overlapStart.toTimeString().substring(0, 8) : null,
            end: overlapStart < overlapEnd ? overlapEnd.toTimeString().substring(0, 8) : null
        },
        severity: nightMinutes > maxNightWorkMinutes ? 'critical' : nightMinutes > 240 ? 'high' : 'normal'
    }
}

/**
 * 종합 근무시간 분석
 * @param {string} startTime - 시작 시간 (HH:MM:SS)
 * @param {string} endTime - 종료 시간 (HH:MM:SS)
 * @param {string} date - 날짜 (YYYY-MM-DD, 주말 판단용)
 * @returns {Object} 종합 분석 결과
 */
export const analyzeWorkTime = (startTime, endTime, date = null) => {
    const validation = validateWorkTime(startTime, endTime)
    const lateInfo = isLateArrival(startTime)
    const earlyInfo = isEarlyLeave(endTime)
    const overtimeInfo = isOvertime(startTime, endTime)
    const nightInfo = isNightWork(startTime, endTime)

    // 주말 근무 여부 (날짜가 제공된 경우)
    let isWeekendWork = false
    if (date) {
        const workDate = new Date(date)
        isWeekendWork = WORK_TIME_CONFIG.WEEKEND_DAYS.includes(workDate.getDay())
    }

    // 승인 필요 여부 종합 판단
    const needsApproval = overtimeInfo.needsApproval ||
        nightInfo.needsApproval ||
        (isWeekendWork && BUSINESS_RULES.APPROVAL_RULES.REQUIRE_APPROVAL_FOR_WEEKEND_WORK)

    return {
        validation,
        late: lateInfo,
        early: earlyInfo,
        overtime: overtimeInfo,
        night: nightInfo,
        isWeekendWork,
        needsApproval,
        summary: {
            totalMinutes: validation.workMinutes || 0,
            regularMinutes: Math.min(validation.workMinutes || 0, WORK_TIME_CONFIG.OVERTIME_THRESHOLD),
            overtimeMinutes: overtimeInfo.overtimeMinutes,
            nightMinutes: nightInfo.nightMinutes,
            issues: [
                ...(lateInfo.isLate ? [`지각 ${lateInfo.lateMinutes}분`] : []),
                ...(earlyInfo.isEarly ? [`조퇴 ${earlyInfo.earlyMinutes}분`] : []),
                ...(overtimeInfo.isOvertime ? [`연장근무 ${overtimeInfo.overtimeMinutes}분`] : []),
                ...(nightInfo.isNightWork ? [`야간근무 ${nightInfo.nightMinutes}분`] : []),
                ...(isWeekendWork ? ['주말근무'] : [])
            ]
        }
    }
}

/**
 * 주간 근무시간 유효성 검증 (근로기준법 제53조)
 * @param {Array} weeklyRecords - 주간 근무 기록 배열
 * @returns {Object} 주간 근무시간 검증 결과
 */
export const validateWeeklyWorkTime = (weeklyRecords) => {
    const errors = []
    const warnings = []

    let totalWeeklyMinutes = 0
    let totalOvertimeMinutes = 0
    let workDays = 0

    weeklyRecords.forEach(record => {
        if (record.startTime && record.endTime) {
            const dailyValidation = validateWorkTime(record.startTime, record.endTime)
            if (dailyValidation.isValid) {
                totalWeeklyMinutes += dailyValidation.workMinutes
                const dailyOvertimeMinutes = Math.max(0, dailyValidation.workMinutes - WORK_TIME_CONFIG.OVERTIME_THRESHOLD)
                totalOvertimeMinutes += dailyOvertimeMinutes
                workDays++
            }
        }
    })

    const maxWeeklyMinutes = BUSINESS_RULES.VALIDATION_RULES.MAX_WEEKLY_HOURS * 60
    const maxSpecialWeeklyMinutes = BUSINESS_RULES.VALIDATION_RULES.MAX_WEEKLY_HOURS_SPECIAL * 60
    const standardWeeklyMinutes = WORK_TIME_CONFIG.WEEKLY_STANDARD_MINUTES

    if (totalWeeklyMinutes > maxSpecialWeeklyMinutes) {
        errors.push(`특별한 사정 시에도 주 최대 근무시간(${BUSINESS_RULES.VALIDATION_RULES.MAX_WEEKLY_HOURS_SPECIAL}시간)을 초과할 수 없습니다.`)
    } else if (totalWeeklyMinutes > maxWeeklyMinutes) {
        warnings.push(`주 최대 근무시간(${BUSINESS_RULES.VALIDATION_RULES.MAX_WEEKLY_HOURS}시간)을 초과했습니다. 특별한 사정이 있는지 확인해주세요.`)
    }

    const maxWeeklyOvertimeMinutes = WORK_TIME_CONFIG.MAX_OVERTIME_WEEKLY * 60
    if (totalOvertimeMinutes > maxWeeklyOvertimeMinutes) {
        errors.push(`주 최대 연장근무시간(${WORK_TIME_CONFIG.MAX_OVERTIME_WEEKLY}시간)을 초과했습니다.`)
    }

    // 주휴일 보장 검증
    const restDays = 7 - workDays
    const requiredRestDays = BUSINESS_RULES.REST_RULES.WEEKLY_REST_DAYS
    if (restDays < requiredRestDays) {
        warnings.push(`주 ${requiredRestDays}일 휴일이 보장되어야 합니다. 현재 휴일: ${restDays}일`)
    }

    return {
        isValid: errors.length === 0,
        errors,
        warnings,
        totalWeeklyMinutes,
        totalOvertimeMinutes,
        workDays,
        restDays,
        exceedsNormalLimit: totalWeeklyMinutes > maxWeeklyMinutes,
        exceedsSpecialLimit: totalWeeklyMinutes > maxSpecialWeeklyMinutes,
        weeklyProgress: (totalWeeklyMinutes / standardWeeklyMinutes) * 100
    }
} 