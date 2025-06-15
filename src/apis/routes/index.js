import { AuthAPI } from './auth';
import { JobtestAPI } from './jobtest';
import { InterviewAPI } from './interview';
import { MemberAPI } from './member';
import { FileAPI } from './file';
import { MailAPI } from './mail';
import { RecruitmentAPI } from './recruitment';
import { ApplicantAPI } from './applicant';
import { DeptAPI } from './orgstructure';
import { JobAPI } from './job';
import { RankAPI } from './rank';
import { PositionAPI } from './position';

export const API = {
    AUTH: AuthAPI,
    JOBTEST: JobtestAPI,
    INTERVIEW: InterviewAPI,
    MEMBER: MemberAPI,
    FILE: FileAPI,
    MAIL: MailAPI,
    RECRUITMENT: RecruitmentAPI,
    APPLICANT: ApplicantAPI,
    DEPT: DeptAPI,
    JOB: JobAPI,
    RANK: RankAPI,
    POSITION: PositionAPI
};