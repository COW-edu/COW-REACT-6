package practice.todo_server.global.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * ✅ API 응답 표준 포맷
 * 항상 { "success": true, "message": "...", "data": ... } 형태로 반환됨
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor(staticName = "of")
public class ApiResponse<T> {

    private boolean success;
    private String message;
    private T data;

    // ✅ 성공 응답 (데이터 포함)
    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(true, "OK", data);
    }

    // ✅ 성공 응답 (커스텀 메시지)
    public static <T> ApiResponse<T> success(String message, T data) {
        return new ApiResponse<>(true, message, data);
    }

    // ✅ 실패 응답
    public static <T> ApiResponse<T> fail(String message) {
        return new ApiResponse<>(false, message, null);
    }
}
