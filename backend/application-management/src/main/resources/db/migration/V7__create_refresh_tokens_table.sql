CREATE TABLE refresh_tokens
(
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    token_hash      VARCHAR(255)                NOT NULL,
    user_id         UUID                        NOT NULL,
    expires_at      TIMESTAMPTZ                 NOT NULL,
    revoked         BOOLEAN                     NOT NULL DEFAULT FALSE,
    created_at      TIMESTAMPTZ                 NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_refresh_tokens_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT uq_refresh_tokens_token_hash
        UNIQUE (token_hash)
);

CREATE INDEX idx_refresh_tokens_user_id
    ON refresh_tokens(user_id);

CREATE INDEX idx_refresh_tokens_expires_at
    ON refresh_tokens(expires_at);