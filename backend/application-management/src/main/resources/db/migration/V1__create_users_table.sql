CREATE TABLE users(
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        VARCHAR(100)                NOT NULL,
    surname     VARCHAR(100)                NOT NULL,
    email       VARCHAR(255)                NOT NULL,
    password    VARCHAR(255)                NOT NULL,
    role        VARCHAR(20)                 NOT NULL,
    is_active   BOOLEAN                     NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMPTZ                 NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMPTZ                 NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT uq_users_email
        UNIQUE (email),

    CONSTRAINT chk_users_role
        CHECK (role IN ('ADMIN', 'PERSONNEL'))
);