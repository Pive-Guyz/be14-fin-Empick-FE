import { FileAPI } from '@/apis/routes/file';
import ApiResponseDTO from '@/dto/common/apiResponseDTO';
import { throwCustomApiError, withErrorHandling } from '@/utils/errorHandler';

/**
 * 파일 업로드 서비스
 * @param {File} file - 업로드할 파일 객체
 * @param {string} prefix - S3 저장 경로 prefix (예: 'profiles/')
 * @param {string} fileName - 저장될 파일명 (예: 'profile.png')
 * @returns {Promise<Object>} 업로드 결과 (url 등)
 */
export const uploadFileService = async (file, prefix = '', fileName = 'profile.png') => {
    return withErrorHandling(async () => {
        const formData = new FormData();
        formData.append('file', file);
        if (prefix) formData.append('prefix', prefix);
        if (fileName) formData.append('fileName', fileName);
        const response = await FileAPI.uploadFile(formData);
        const apiResponse = ApiResponseDTO.fromJSON(response.data);
        if (!apiResponse.success) throwCustomApiError(apiResponse.code, apiResponse.message, 400);
        return apiResponse.data;
    });
};

export const getFileUrl = async (fileId) => {
    return withErrorHandling(async () => {
        const response = await FileAPI.getFileUrl(fileId);
        const apiResponse = ApiResponseDTO.fromJSON(response.data);
        if (!apiResponse.success) throwCustomApiError(apiResponse.code, apiResponse.message, 400);
        return apiResponse.data;
    });
};

export const deleteFile = async (fileId) => {
    return withErrorHandling(async () => {
        const response = await FileAPI.deleteFile(fileId);
        const apiResponse = ApiResponseDTO.fromJSON(response.data);
        if (!apiResponse.success) throwCustomApiError(apiResponse.code, apiResponse.message, 400);
        return apiResponse.data;
    });
}; 