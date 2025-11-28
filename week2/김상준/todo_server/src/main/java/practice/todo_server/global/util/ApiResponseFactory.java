package practice.todo_server.global.util;

import org.springframework.http.ResponseEntity;
import practice.todo_server.global.dto.ApiResponse;

public class ApiResponseFactory {

    public static <T> ResponseEntity<ApiResponse<T>> ok(T data) {
        return ResponseEntity.ok(ApiResponse.success(data));
    }

    public static <T> ResponseEntity<ApiResponse<T>> ok(String message, T data) {
        return ResponseEntity.ok(ApiResponse.success(message, data));
    }

    public static <T> ResponseEntity<ApiResponse<T>> fail(String message) {
        return ResponseEntity.badRequest().body(ApiResponse.fail(message));
    }
}
