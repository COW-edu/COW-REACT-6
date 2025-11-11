package practice.todo_server.domain.todo.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import practice.todo_server.domain.todo.dto.CreateTodoRequest;
import practice.todo_server.domain.todo.dto.TodoDto;
import practice.todo_server.domain.todo.service.TodoService;
import practice.todo_server.global.dto.ApiResponse;
import practice.todo_server.global.util.ApiResponseFactory;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class TodoController {

    private final TodoService todoService;

    // ✅ 목록 조회
    @GetMapping("/users/{nickname}/todos")
    public ResponseEntity<ApiResponse<List<TodoDto>>> getTodos(@PathVariable String nickname) {
        return ApiResponseFactory.ok(todoService.getTodosByUserNickname(nickname));
    }

    // ✅ 새 할 일 추가
    @PostMapping("/users/{nickname}/todos")
    public ResponseEntity<ApiResponse<TodoDto>> addTodo(
            @PathVariable String nickname,
            @RequestBody CreateTodoRequest request
    ) {
        return ApiResponseFactory.ok("할 일이 추가되었습니다.",
                todoService.addTodo(nickname, request.getText()));
    }

    // ✅ 완료 상태 변경
    @PatchMapping("/todos/{id}")
    public ResponseEntity<ApiResponse<Void>> toggleDone(
            @PathVariable Long id,
            @RequestBody Map<String, Boolean> body
    ) {
        boolean done = body.get("done");
        todoService.toggleDone(id, done);
        return ApiResponseFactory.ok("상태가 변경되었습니다.", null);
    }

    // ✅ 할 일 삭제
    @DeleteMapping("/todos/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteTodo(@PathVariable Long id) {
        todoService.deleteTodo(id);
        return ApiResponseFactory.ok("할 일이 삭제되었습니다.", null);
    }
}
