    package com.cybersoft.application_management.security.userdetails;

    import java.util.Collection;
    import java.util.List;
    import java.util.UUID;

    import org.springframework.security.core.GrantedAuthority;
    import org.springframework.security.core.authority.SimpleGrantedAuthority;
    import org.springframework.security.core.userdetails.UserDetails;

    import com.cybersoft.application_management.entity.User;

    import lombok.Getter;
    import lombok.RequiredArgsConstructor;

    @Getter
    @RequiredArgsConstructor
    public class CustomUserDetails implements UserDetails {

        private final UUID id;
        private final String email;
        private final String password;
        private final boolean enabled;
        private final Collection<? extends GrantedAuthority> authorities;

        public static CustomUserDetails fromUser(User user) {
            return new CustomUserDetails(
                    user.getId(),
                    user.getEmail(),
                    user.getPassword(),
                    user.isActive(),
                    List.of(
                            new SimpleGrantedAuthority(
                                    "ROLE_" + user.getRole().name()
                            )
                    )
            );
        }

        @Override
        public String getUsername() {
            return email;
        }

        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return enabled;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return enabled;
        }
    }
