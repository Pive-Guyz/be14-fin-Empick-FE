import api from '../apis/apiClient'
import { ApplicationAPI, ApplicationResponseAPI } from '@/apis/routes/application';
import ApiResponseDTO from '@/dto/common/apiResponseDTO';
import ApplicationResponseDTO from '@/dto/employment/application/applicationResponeDTO';
import ApplicationItemResponseDTO from '@/dto/employment/application/applicationItemResponseDTO';
import { withErrorHandling, throwCustomApiError } from '@/utils/errorHandler';
import { fetchApplicationItemCategories, fetchApplicationItemsByRecruitment } from './applicationItemService';

export const getAllApplicationsService = async (options = {}) => {
  return withErrorHandling(async () => {
    const response = await api.get(ApplicationAPI.GET_ALL_APPLICATIONS);
    const apiResponse = ApiResponseDTO.fromJSON(response.data);

    if (!apiResponse.success) {
      throwCustomApiError(apiResponse.code, apiResponse.message);
    }

    return apiResponse.data.map(item => ApplicationResponseDTO.fromJSON(item));
  }, options);
};

export const getApplicationByIdService = async (id, options = {}) => {
  return withErrorHandling(async () => {
    console.log('🔍 API 호출 - applicationId:', id);
    const response = await api.get(ApplicationAPI.GET_APPLICATION_BY_ID(id));
    const apiResponse = ApiResponseDTO.fromJSON(response.data);
    
    if (!apiResponse.success) {
      throwCustomApiError(apiResponse.code, apiResponse.message);
    }

    const applicationDto = ApplicationResponseDTO.fromJSON(apiResponse.data);
    if (!applicationDto) {
      console.warn('⚠️ 지원서 데이터 변환 실패. API 응답:', apiResponse);
      throw new Error(`지원서 데이터를 변환할 수 없습니다. (ID: ${id})`);
    }
    return applicationDto;
  }, options);
};

// applicantId로 application 조회하는 함수 추가
export const getApplicationByApplicantIdService = async (applicantId, options = {}) => {
  return withErrorHandling(async () => {
    console.log('🔍 API 호출 - applicantId:', applicantId);
    
    try {
      // 먼저 applicantId 전용 엔드포인트 시도
      const response = await api.get(ApplicationAPI.GET_APPLICATION_BY_APPLICANT_ID(applicantId));
      const apiResponse = ApiResponseDTO.fromJSON(response.data);
      
      if (!apiResponse.success) {
        throwCustomApiError(apiResponse.code, apiResponse.message);
      }

      const applicationDto = ApplicationResponseDTO.fromJSON(apiResponse.data);
      if (!applicationDto) {
        throw new Error('지원서 데이터를 변환할 수 없습니다.');
      }
      return applicationDto;
    } catch (error) {
      console.warn('⚠️ applicantId 전용 엔드포인트 실패, 기본 엔드포인트 시도:', error.message);
      
      // 실패하면 기본 엔드포인트 사용 (applicantId를 applicationId로 사용)
      const response = await api.get(ApplicationAPI.GET_APPLICATION_BY_ID(applicantId));
      const apiResponse = ApiResponseDTO.fromJSON(response.data);
      
      if (!apiResponse.success) {
        throwCustomApiError(apiResponse.code, apiResponse.message);
      }

      const fallbackDto = ApplicationResponseDTO.fromJSON(apiResponse.data);
      if (!fallbackDto) {
        throw new Error('지원서 데이터를 변환할 수 없습니다.');
      }
      return fallbackDto;
    }
  }, options);
};

export const createApplicationService = async (dto, options = {}) => {
  return withErrorHandling(async () => {
    const response = await api.post(ApplicationAPI.CREATE_APPLICATION, dto);
    const apiResponse = ApiResponseDTO.fromJSON(response.data);

    if (!apiResponse.success) {
      throwCustomApiError(apiResponse.code, apiResponse.message);
    }

    return ApplicationResponseDTO.fromJSON(apiResponse.data); // ✅ 여기
  }, options);
};

export const updateApplicationStatusService = async (id, statusCode, options = {}) => {
  return withErrorHandling(async () => {
    console.log('🔄 지원서 상태 변경:', { applicationId: id, statusCode });
    
    const updateData = {
      status: statusCode
    };
    
    const response = await api.patch(ApplicationAPI.UPDATE_APPLICATION_STATUS(id), updateData);
    const apiResponse = ApiResponseDTO.fromJSON(response.data);

    if (!apiResponse.success) {
      throwCustomApiError(apiResponse.code, apiResponse.message);
    }

    console.log('✅ 지원서 상태 변경 성공:', apiResponse.data);
    
    // 클라이언트에서 상태 설명 추가 (백엔드 수정 전 임시 해결책)
    const result = ApplicationResponseDTO.fromJSON(apiResponse.data);
    if (result && typeof result.status === 'number') {
      const { getStatusByCode } = await import('@/constants/employment/applicationStatus');
      const statusInfo = getStatusByCode(result.status);
      result.statusDescription = statusInfo.label;
      console.log('✅ 클라이언트에서 상태 설명 추가:', statusInfo.label);
    }
    
    return result;
  }, options);
};

// application의 introduce_rating_result_id 업데이트 전용 서비스
export const updateApplicationIntroduceRatingResultService = async (applicationId, ratingResultId, options = {}) => {
  return withErrorHandling(async () => {
    console.log('🔄 application introduce_rating_result_id 업데이트:', {
      applicationId,
      ratingResultId
    });
    
    // 업데이트 데이터 준비 (snake_case와 camelCase 모두 포함)
    const updateData = {
      introduceRatingResultId: ratingResultId,
      introduce_rating_result_id: ratingResultId
    };
    
    // PATCH 요청으로 application 업데이트
    const response = await api.patch(ApplicationAPI.UPDATE_APPLICATION_STATUS(applicationId), updateData);
    const apiResponse = ApiResponseDTO.fromJSON(response.data);

    if (!apiResponse.success) {
      throwCustomApiError(apiResponse.code, apiResponse.message);
    }

    console.log('✅ application introduce_rating_result_id 업데이트 성공:', apiResponse.data);
    return ApplicationResponseDTO.fromJSON(apiResponse.data);
  }, options);
};

export const deleteApplicationService = async (id, options = {}) => {
  return withErrorHandling(async () => {
    const response = await api.delete(ApplicationAPI.DELETE_APPLICATION(id));
    const apiResponse = ApiResponseDTO.fromJSON(response.data);

    if (!apiResponse.success) {
      throwCustomApiError(apiResponse.code, apiResponse.message);
    }

    return ApplicationResponseDTO.fromJSON(apiResponse.data);
  }, options);
};

export const createApplicationResponseService = async (dto, options = {}) => {
  return withErrorHandling(async () => {
    console.log('📝 이력서 응답 생성 요청:', dto);
    
    const response = await api.post(ApplicationResponseAPI.CREATE_APPLICATION_RESPONSE, dto);
    const apiResponse = ApiResponseDTO.fromJSON(response.data);

    if (!apiResponse.success) {
      throwCustomApiError(apiResponse.code, apiResponse.message);
    }

    console.log('✅ 이력서 응답 생성 성공:', apiResponse.data);
    return ApplicationItemResponseDTO.fromJSON(apiResponse.data);
  }, options);
};

// applicationId로 application response들을 조회하는 서비스
export const getApplicationResponsesByApplicationIdService = async (applicationId, options = {}) => {
  return withErrorHandling(async () => {
    console.log('🔍 이력서 응답 조회 - applicationId:', applicationId);
    const response = await api.get(ApplicationResponseAPI.GET_APPLICATION_RESPONSES_BY_APPLICATION_ID(applicationId));
    const apiResponse = ApiResponseDTO.fromJSON(response.data);

    if (!apiResponse.success) {
      throwCustomApiError(apiResponse.code, apiResponse.message);
    }

    console.log('✅ 이력서 응답 조회 성공:', apiResponse.data);
    
    // 배열 형태의 이력서 응답 데이터를 DTO로 변환
    if (Array.isArray(apiResponse.data)) {
      const responses = apiResponse.data
        .map(item => ApplicationItemResponseDTO.fromJSON(item))
        .filter(item => item !== null); // null 값 제거
      
      // 1. 먼저 application 정보를 조회해서 recruitmentId를 얻기
      let recruitmentId = null;
      try {
        const appResponse = await api.get(ApplicationAPI.GET_APPLICATION_BY_ID(applicationId));
        const appApiResponse = ApiResponseDTO.fromJSON(appResponse.data);
        if (appApiResponse.success && appApiResponse.data) {
          recruitmentId = appApiResponse.data.recruitmentId;
          console.log('✅ 채용공고 ID 조회 성공:', recruitmentId);
        }
      } catch (appError) {
        console.warn('⚠️ application 정보 조회 실패:', appError.message);
      }
      
      // 2. application_item_category 정보를 미리 조회 (캐시)
      let categoryCache = {};
      try {
        const categories = await fetchApplicationItemCategories();
        categoryCache = categories.reduce((acc, category) => {
          acc[category.id] = category;
          return acc;
        }, {});
        console.log('✅ 항목 카테고리 캐시 로드 완료:', Object.keys(categoryCache).length, '개');
      } catch (categoryError) {
        console.warn('⚠️ 항목 카테고리 조회 실패:', categoryError.message);
      }
      
      // 3. 채용공고별 지원서 항목들 조회 (캐시)
      let itemCache = {};
      if (recruitmentId) {
        try {
          const items = await fetchApplicationItemsByRecruitment(recruitmentId);
          itemCache = items.reduce((acc, item) => {
            acc[item.id] = item;
            return acc;
          }, {});
          console.log('✅ 지원서 항목 캐시 로드 완료:', Object.keys(itemCache).length, '개');
        } catch (itemError) {
          console.warn('⚠️ 지원서 항목 조회 실패:', itemError.message);
        }
      }
      
      // 4. 각 응답에 대해 항목 정보 추가
      const enrichedResponses = [];
      
      for (const response of responses) {
        if (response.applicationItemId) {
          // 기본값 설정
          response.categoryName = '항목 정보 조회 중...';
          
          try {
            // 방법 1: itemCache에서 직접 찾기
            const item = itemCache[response.applicationItemId];
            if (item && item.applicationItemCategoryId) {
              const category = categoryCache[item.applicationItemCategoryId];
              if (category) {
                response.categoryName = category.name;
                response.inputType = item.inputType || category.inputType;
                response.isRequired = item.isRequired;
                console.log('✅ 항목 정보 매칭 성공:', {
                  applicationItemId: response.applicationItemId,
                  categoryName: response.categoryName
                });
              } else {
                response.categoryName = `카테고리 ID: ${item.applicationItemCategoryId}`;
              }
            } else {
              // 방법 2: applicationItemId를 직접 categoryCache에서 찾아보기
              const directCategory = categoryCache[response.applicationItemId];
              if (directCategory) {
                response.categoryName = directCategory.name;
                response.inputType = directCategory.inputType;
                response.isRequired = true;
                console.log('✅ 직접 카테고리 매칭 성공:', response.categoryName);
              } else {
                // 방법 3: 일반적인 카테고리명 추정
                const categoryNames = {
                  1: '기본 인적사항',
                  2: '학력',
                  3: '경력',
                  4: '자격증',
                  5: '어학',
                  6: '수상 내역',
                  7: '기타',
                };
                
                response.categoryName = categoryNames[response.applicationItemId] || `항목 ${response.applicationItemId}`;
                response.inputType = 'TEXT';
                response.isRequired = true;
                console.log('🔄 추정 카테고리명 사용:', response.categoryName);
              }
            }
            
          } catch (itemError) {
            console.warn('⚠️ 항목 정보 조회 실패:', response.applicationItemId, itemError.message);
            response.categoryName = `항목 ${response.applicationItemId}`;
            response.inputType = 'TEXT';
            response.isRequired = true;
          }
        } else {
          response.categoryName = 'applicationItemId 없음';
          response.inputType = 'TEXT';
          response.isRequired = false;
        }
        
        enrichedResponses.push(response);
      }
      
      console.log('🎯 최종 enriched responses:', enrichedResponses);
      return enrichedResponses;
    }
    
    return [];
  }, options);
};