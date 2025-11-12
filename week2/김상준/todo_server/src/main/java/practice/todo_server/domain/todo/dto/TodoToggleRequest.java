package practice.todo_server.domain.todo.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class TodoToggleRequest {
    private boolean done;
}
