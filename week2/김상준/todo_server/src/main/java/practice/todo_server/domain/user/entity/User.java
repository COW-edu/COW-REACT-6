package practice.todo_server.domain.user.entity;

import jakarta.persistence.*;
import lombok.*;
import practice.todo_server.domain.todo.entity.Todo;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;      // JWT의 subject 값

    @Column(nullable = false, unique = true)
    private String email;  // 로그인 ID

    @Column(nullable = false)
    private String password; // BCrypt 해시된 비밀번호

    @Column(nullable = false, unique = true)
    private String nickname; // 화면 표시용(중복 금지)

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private final List<Todo> todos = new ArrayList<>();

    @Builder
    public User(String email, String password, String nickname) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
    }

    public void addTodo(Todo todo) {
        todos.add(todo);
        todo.assignUser(this);
    }
}

