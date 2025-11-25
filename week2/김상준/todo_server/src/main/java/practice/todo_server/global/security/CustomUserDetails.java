package practice.todo_server.global.security;

import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import practice.todo_server.domain.user.entity.User;

import java.util.Collection;
import java.util.Collections;

@Getter
public class CustomUserDetails implements UserDetails {

    private final Long userId;
    private final String email;

    public CustomUserDetails(User user) {
        this.userId = user.getId();
        this.email = user.getEmail();
    }

    // 🔥 이 부분이 중요
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // 지금은 역할(ROLE) 안 쓰니까 빈 리스트 반환
        return Collections.emptyList();
    }

    @Override
    public String getPassword() {
        // JWT 인증만 쓸 거면 굳이 사용할 일은 없음
        return null;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override public boolean isAccountNonExpired() { return true; }
    @Override public boolean isAccountNonLocked() { return true; }
    @Override public boolean isCredentialsNonExpired() { return true; }
    @Override public boolean isEnabled() { return true; }
}
