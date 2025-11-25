package practice.todo_server.domain.todo.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import practice.todo_server.domain.todo.dto.CreateTodoRequest;
import practice.todo_server.domain.todo.dto.TodoDto;
import practice.todo_server.domain.todo.dto.TodoToggleRequest;
import practice.todo_server.domain.todo.dto.TodoUpdateRequest;
import practice.todo_server.domain.todo.service.TodoService;
import practice.todo_server.global.dto.ApiResponse;
import practice.todo_server.global.security.CustomUserDetails;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class TodoController {

    private final TodoService todoService;

    // ✅ [GET] 할 일 목록 조회
    @GetMapping("/todos")
    public ResponseEntity<ApiResponse<List<TodoDto>>> getTodos(
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        Long userId = userDetails.getUserId();
        return ResponseEntity.ok(
                ApiResponse.success(todoService.getTodosByUserId(userId))
        );
    }

    // ✅ [POST] 새 할 일 생성
    @PostMapping("/todos")
    public ResponseEntity<ApiResponse<TodoDto>> addTodo(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestBody CreateTodoRequest request
    ) {
        Long userId = userDetails.getUserId();
        return ResponseEntity.ok(
                ApiResponse.success(todoService.addTodo(userId, request.getText()))
        );
    }

    // ✅ [PATCH] 완료 상태 변경
    @PatchMapping("/todos/{id}")
    public ResponseEntity<ApiResponse<TodoDto>> toggleDone(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long id,
            @RequestBody TodoToggleRequest request
    ) {
        Long userId = userDetails.getUserId();
        TodoDto updated = todoService.toggleDone(userId, id, request.isDone());
        return ResponseEntity.ok(
                ApiResponse.success("상태가 변경되었습니다.", updated)
        );
    }

    // ✅ [DELETE] 할 일 삭제
    @DeleteMapping("/todos/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteTodo(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long id
    ) {
        Long userId = userDetails.getUserId();
        todoService.deleteTodo(userId, id);
        return ResponseEntity.ok(
                ApiResponse.success("할 일이 삭제되었습니다.", null)
        );
    }

    // ✅ [PUT] 할 일 내용 수정
    @PutMapping("/todos/{id}")
    public ResponseEntity<ApiResponse<TodoDto>> updateTodoText(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long id,
            @RequestBody TodoUpdateRequest request
    ) {
        Long userId = userDetails.getUserId();
        TodoDto updated = todoService.updateTodoText(userId, id, request.getText());
        return ResponseEntity.ok(
                ApiResponse.success("할 일 내용이 수정되었습니다.", updated)
        );
    }
}
